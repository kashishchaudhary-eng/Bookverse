'use client'
import { useState, useCallback } from 'react'
import Navbar        from '../components/Navbar'
import SearchBar     from '../components/SearchBar'
import BookCard      from '../components/BookCard'
import BookModal     from '../components/BookModal'
import { useFetch }        from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { buildSearchUrl, buildTrendingUrl, normalizeBook } from '../lib/api'
import { BookOpen, TrendingUp, Heart, RefreshCw } from 'lucide-react'

const CATEGORIES = ['Fiction', 'Self Help', 'Science', 'History', 'Biography', 'Fantasy', 'Mystery']

export default function Home() {
  const [searchUrl,      setSearchUrl]  = useState(buildTrendingUrl('fiction'))
  const [query,          setQuery]      = useState('')
  const [activeTab,      setActiveTab]  = useState('trending')
  const [activeCategory, setCategory]  = useState('Fiction')
  const [selectedBook,   setSelected]  = useState(null)
  const [favorites,      setFavorites] = useLocalStorage('bookverse-favorites', [])

  const { data, loading, error, refetch } = useFetch(searchUrl)

  const books = data?.docs?.map(normalizeBook) ?? []

  const handleSearch = useCallback((q) => {
    setQuery(q)
    setSearchUrl(buildSearchUrl(q))
    setActiveTab('search')
  }, [])

  const handleCategory = (cat) => {
    setCategory(cat)
    setSearchUrl(buildTrendingUrl(cat.toLowerCase().replace(' ', '+')))
    setActiveTab('trending')
  }

  const handleToggleFav = useCallback((book) => {
    setFavorites(prev => {
      const exists = prev.find(f => f.id === book.id)
      return exists ? prev.filter(f => f.id !== book.id) : [...prev, book]
    })
  }, [setFavorites])

  const isFavorite = (book) => favorites.some(f => f.id === book.id)
  const displayBooks = activeTab === 'favorites' ? favorites : books

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-primary)' }}>

      <Navbar
        favCount={favorites.length}
        onFavClick={() => setActiveTab(prev => prev === 'favorites' ? 'trending' : 'favorites')}
        onLogoClick={() => {
          setActiveTab('trending')
          setSearchUrl(buildTrendingUrl('fiction'))
        }}
      />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-10">

        {/* ── Hero ── */}
        <section className="text-center mb-8 sm:mb-10 px-2">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium mb-4"
            style={{ backgroundColor: 'rgba(244,63,94,0.1)', color: '#f43f5e' }}
          >
            <TrendingUp size={13} /> Discover · Read · Remember
          </div>

          <h1
            className="font-bold mb-3 leading-tight"
            style={{
              fontSize: 'clamp(28px, 5vw, 52px)',
              fontFamily: 'Georgia, serif',
              color: 'var(--text-primary)',
            }}
          >
            Your Personal{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              BookVerse
            </span>
          </h1>

          <p
            className="mb-7 max-w-md mx-auto"
            style={{ fontSize: 'clamp(13px, 2vw, 16px)', color: 'var(--text-secondary)' }}
          >
            Explore millions of books. Find your next obsession.
          </p>

          <SearchBar onSearch={handleSearch} loading={loading} />
        </section>

        {/* ── Category pills ── */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide mb-6 -mx-4 px-4 sm:mx-0 sm:px-0">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              className="flex-shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all hover:scale-105"
              style={{
                background:
                  activeCategory === cat && activeTab !== 'favorites'
                    ? 'linear-gradient(135deg, #f43f5e, #ec4899)'
                    : 'var(--border)',
                color:
                  activeCategory === cat && activeTab !== 'favorites'
                    ? 'white'
                    : 'var(--text-primary)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ── Section header ── */}
        <div className="flex items-center justify-between mb-5">
          <h2
            className="font-bold flex items-center gap-2"
            style={{ fontSize: 16, color: 'var(--text-primary)' }}
          >
            {activeTab === 'favorites' ? (
              <><Heart size={17} style={{ color: '#f43f5e' }} /> My Favorites ({favorites.length})</>
            ) : activeTab === 'search' ? (
              <><BookOpen size={17} style={{ color: '#f43f5e' }} /> Results for "{query}"</>
            ) : (
              <><TrendingUp size={17} style={{ color: '#f43f5e' }} /> Trending in {activeCategory}</>
            )}
          </h2>

          {activeTab !== 'favorites' && (
            <button
              onClick={refetch}
              className="p-2 rounded-full transition-all hover:scale-110"
              style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}
            >
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            </button>
          )}
        </div>

        {/* ── Loading skeleton ── */}
        {loading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden animate-pulse"
                style={{ backgroundColor: 'var(--card-bg)', border: '1px solid var(--border)' }}
              >
                <div style={{ height: 200, backgroundColor: 'var(--border)' }} />
                <div className="p-4 space-y-2">
                  <div className="h-3 rounded-full" style={{ backgroundColor: 'var(--border)' }} />
                  <div className="h-2.5 rounded-full w-2/3" style={{ backgroundColor: 'var(--border)' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Error state ── */}
        {error && !loading && (
          <div className="text-center py-20">
            <p className="text-5xl mb-4">😢</p>
            <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              Something went wrong
            </p>
            <p className="text-sm mb-5" style={{ color: 'var(--text-secondary)' }}>{error}</p>
            <button
              onClick={refetch}
              className="px-5 py-2.5 rounded-xl text-sm text-white font-medium"
              style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)' }}
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Empty favorites ── */}
        {activeTab === 'favorites' && favorites.length === 0 && (
          <div className="text-center py-24">
            <Heart size={52} className="mx-auto mb-4" style={{ color: '#fecdd3' }} />
            <p className="font-semibold text-lg mb-1" style={{ color: 'var(--text-primary)' }}>
              No favorites yet
            </p>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Tap the ♡ on any book to save it here
            </p>
          </div>
        )}

        {/* ── Books grid ── */}
        {!loading && !error && displayBooks.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-5">
            {displayBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={isFavorite(book)}
                onToggleFav={handleToggleFav}
                onClick={() => setSelected(book)}
              />
            ))}
          </div>
        )}

        {/* ── No results ── */}
        {!loading && !error && displayBooks.length === 0 && activeTab !== 'favorites' && (
          <div className="text-center py-24">
            <BookOpen size={52} className="mx-auto mb-4" style={{ color: '#fecdd3' }} />
            <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>No books found</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
              Try a different search term
            </p>
          </div>
        )}

      </main>

      {/* ── Book detail modal ── */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isFavorite={isFavorite(selectedBook)}
          onToggleFav={handleToggleFav}
          onClose={() => setSelected(null)}
        />
      )}

      {/* ── Footer ── */}
      <footer
        className="text-center py-6 mt-10 border-t"
        style={{ borderColor: 'var(--border)' }}
      >
        <p
          className="flex items-center justify-center gap-1"
          style={{ fontSize: 13, color: 'var(--text-secondary)' }}
        >
          Made with <Heart size={12} fill="#f43f5e" color="#f43f5e" /> using Open Library API
        </p>
      </footer>

    </div>
  )
}