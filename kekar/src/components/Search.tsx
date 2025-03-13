'use client'
import React, { useState, useEffect } from 'react'

interface SearchProps {
    onSearch: (query: string) => void
    placeholder?: string
    debounceMs?: number
}

function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export default function Search({ 
    onSearch, 
    placeholder = "Search", 
    debounceMs = 300 
}: SearchProps) {
    const [searchTerm, setSearchTerm] = useState("")

    // Memoize the onSearch callback
    const handleSearch = React.useCallback((term: string) => {
        onSearch(term)
    }, [onSearch])
    const debouncedSearchTerm = useDebounce(searchTerm, debounceMs)

    // Use memoized callback in effect
    useEffect(() => {
        if (debouncedSearchTerm) {
            onSearch(debouncedSearchTerm)
        } else {
            onSearch('')  // Clear search results when empty
        }
    }, [debouncedSearchTerm])  // Remove onSearch from dependencies

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        handleSearch(searchTerm)
    }

    return (
        <form onSubmit={handleSubmit} className="w-full">
            <label className="input input-bordered flex items-center gap-2">
                <input 
                    type="text" 
                    className="grow border-none" 
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70">
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd" />
                </svg>
            </label>
        </form>
    )
}
