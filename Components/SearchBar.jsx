'use client'
import { useState } from 'react'
import { Search, X, Sparkles } from 'lucide-react'

const SUGGESTIONS = ['Harry Potter', 'Atomic Habits', 'The Alchemist', 'Dune', 'Sapiens', 'Ikigai']

export default function SearchBar({ onSearch, loading }) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) onSearch(query.trim())
    setFocused(false)
  }

  const handleSuggestion = (s) => {
    setQuery(s)
    onSearch(s)
    setFocused(false)
  }

  return (
    <div className="relative w-full max-w-2xl mx-auto px-1">
      <form onSubmit={handleSubmit}>
        <div className="relative flex items-center">
          <Search
            size={18}
            className="absolute left-4 pointer-events-none flex-shrink-0"
            style={{ color: 'var(--text-secondary)' }}
          />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setTimeout(() => setFocused(false), 150)}
            placeholder="Search books, authors..."
            className="w-full pl-11 pr-20 py-3.5 rounded-2xl text-sm sm:text-base outline-none border-2 transition-all"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              borderColor: focused ? '#f43f5e' : 'var(--border)',
              boxShadow: focused ? '0 0 0 3px rgba(244,63,94,0.1)' : 'none',
            }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-16 p-1"
              style={{ color: 'var(--text-secondary)' }}
            >
              <X size={14} />
            </button>
          )}
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 px-3 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)' }}
          >
            {loading ? '...' : 'Go'}
          </button>
        </div>
      </form>

      {/* Suggestions dropdown */}
      {focused && !query && (
        <div
          className="absolute top-full mt-2 w-full rounded-2xl border p-3 z-50"
          style={{
            backgroundColor: 'var(--bg-secondary)',
            borderColor: 'var(--border)',
            boxShadow: '0 8px 24px rgba(244,63,94,0.1)',
          }}
        >
          <p className="text-xs font-medium mb-2 flex items-center gap-1" style={{ color: 'var(--text-secondary)' }}>
            <Sparkles size={11} /> Popular searches
          </p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTIONS.map(s => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="px-3 py-1.5 rounded-full text-xs sm:text-sm transition-all hover:scale-105"
                style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}