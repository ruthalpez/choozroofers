"use client";

import type React from "react";

import { useRef, useState } from "react";
import Link from "next/link";
import debounce from "lodash.debounce";
import { useRouter } from "next/navigation";
import { useFilteredContractors } from "@/hooks/useFilteredContractors";

interface EnhancedSearchListProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setSelectedCity: (value: string) => void;
  setSelectedState: (value: string) => void;
  showSuggestions: boolean;
  setShowSuggestions: (value: boolean) => void;
  handleSearchNavigate: (term: string) => void;
  inputClass?: string;
}

const EnhancedSearchList = ({
  searchTerm,
  setSearchTerm,
  setSelectedCity,
  setSelectedState,
  showSuggestions,
  setShowSuggestions,
  handleSearchNavigate,
  inputClass,
}: EnhancedSearchListProps) => {
  const router = useRouter();
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const {
    filteredSuggestions,
    getZipMatch,
    isLoading: loading,
    error,
  } = useFilteredContractors(searchTerm);

  const handleInputChange = debounce((value: string) => {
    setSearchTerm(value);
    setShowSuggestions(true);
    setHighlightedIndex(0);
  }, 50);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showSuggestions || filteredSuggestions.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev < filteredSuggestions.length - 1 ? prev + 1 : 0,
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : filteredSuggestions.length - 1,
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (
        highlightedIndex >= 0 &&
        highlightedIndex < filteredSuggestions.length
      ) {
        const selected = filteredSuggestions[highlightedIndex];
        setSearchTerm(selected.display);
        setSelectedCity(selected.city.toLowerCase());
        setSelectedState(selected.state.toLowerCase());
        setShowSuggestions(false);
        router.push(selected.url);
      } else {
        const zipResult = getZipMatch(searchTerm.trim());
        if (zipResult) {
          setSelectedCity(zipResult.city?.toLowerCase() || "");
          setSelectedState(zipResult.state.toLowerCase());
          setShowSuggestions(false);
          router.push(zipResult.url); // Navigate to the ZIP code match URL
          return; // Stop further processing once ZIP code is matched
        } else {
          handleSearchNavigate(searchTerm);
        }
      }
    }
  };

  if (error) {
    return (
      <div className="text-red-500 p-2">
        Error loading contractors:{" "}
        {error instanceof Error ? error.message : "Unknown error"}
      </div>
    );
  }

  return (
    <>
      <div className="flex text-base">
        <input
          type="text"
          id="location"
          value={searchTerm}
          autoComplete="off"
          placeholder="Saint Louis, MO"
          onChange={(e) => handleInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          className={inputClass}
        />
      </div>

      {showSuggestions && searchTerm && (
        <div
          ref={suggestionsRef}
          className="text-base absolute z-20 w-full bg-white rounded-md shadow-lg mt-1 max-h-60 overflow-auto">
          {loading ? (
            <div className="px-4 py-2 text-gray-500 animate-pulse">
              Loading...
            </div>
          ) : (
            filteredSuggestions.length > 0 &&
            filteredSuggestions.map((suggestion, index) => (
              <Link
                key={suggestion.key}
                href={suggestion.url}
                className={`block px-4 py-2 cursor-pointer text-black ${
                  highlightedIndex === index
                    ? "bg-gray-200"
                    : "hover:bg-gray-100"
                }`}
                onClick={() => {
                  setSearchTerm("");
                  setShowSuggestions(false);
                  setSelectedCity(suggestion.city.toLowerCase());
                  setSelectedState(suggestion.state.toLowerCase());
                }}>
                {suggestion.display}
              </Link>
            ))
          )}
        </div>
      )}
    </>
  );
};

export default EnhancedSearchList;
