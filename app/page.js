'use client'
import { useState, useCallback } from 'react'
import Navbar        from '../Components/Navbar'
import BookCard      from '../Components/BookCard'
import BookModal     from '../Components/BookModal'
import { useFetch }        from '../hooks/useFetch'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { buildSearchUrl, buildTrendingUrl, normalizeBook } from '../lib/api'
import { Search, TrendingUp, Heart, BookOpen, RefreshCw, ArrowRight } from 'lucide-react'

const CATEGORIES = ['All', 'Fiction', 'Self Help', 'Science', 'History', 'Biography', 'Fantasy', 'Mystery']

/* ─── inline SearchBar ─────────────────────────────────────── */
function SearchBar({ onSearch, loading }) {
  const [q, setQ] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (q.trim()) onSearch(q.trim())
  }

  return (
    <form onSubmit={submit} style={{ width: '100%', maxWidth: 680, margin: '0 auto' }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <Search
          size={18}
          style={{
            position: 'absolute', left: 18,
            color: 'var(--text-secondary)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Search by title, author, genre..."
          style={{
            width: '100%',
            padding: '16px 110px 16px 50px',
            borderRadius: 14,
            border: '1.5px solid var(--border)',
            backgroundColor: 'var(--bg-secondary)',
            color: 'var(--text-primary)',
            fontSize: 15,
            outline: 'none',
            transition: 'border-color 0.2s',
          }}
          onFocus={e => e.target.style.borderColor = '#f43f5e'}
          onBlur={e => e.target.style.borderColor = 'var(--border)'}
        />
        <button
          type="submit"
          disabled={!q.trim() || loading}
          style={{
            position: 'absolute', right: 8,
            padding: '10px 24px',
            borderRadius: 10,
            background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
            color: 'white',
            fontWeight: 700,
            fontSize: 14,
            border: 'none',
            cursor: q.trim() ? 'pointer' : 'not-allowed',
            opacity: q.trim() ? 1 : 0.6,
          }}
        >
          {loading ? '...' : 'Go'}
        </button>
      </div>
    </form>
  )
}

/* ─── main page ────────────────────────────────────────────── */
export default function Home() {
  const [searchUrl,      setSearchUrl]  = useState(buildTrendingUrl('fiction'))
  const [query,          setQuery]      = useState('')
  const [activeTab,      setActiveTab]  = useState('trending')
  const [activeCategory, setCategory]  = useState('Fiction')
  const [selectedBook,   setSelected]  = useState(null)
  const [favorites,      setFavorites] = useLocalStorage('bookverse-favorites', [])

  const { data, loading, error, refetch } = useFetch(searchUrl)
  const books        = data?.docs?.map(normalizeBook) ?? []
  const displayBooks = activeTab === 'favorites' ? favorites : books

  const handleSearch = useCallback((q) => {
    setQuery(q)
    setSearchUrl(buildSearchUrl(q))
    setActiveTab('search')
  }, [])

  const handleCategory = (cat) => {
    if (cat === 'All') {
      setCategory('All')
      setSearchUrl(buildTrendingUrl('fiction'))
      setActiveTab('trending')
    } else {
      setCategory(cat)
      setSearchUrl(buildTrendingUrl(cat.toLowerCase().replace(' ', '+')))
      setActiveTab('trending')
    }
  }

  const handleToggleFav = useCallback((book) => {
    setFavorites(prev =>
      prev.find(f => f.id === book.id)
        ? prev.filter(f => f.id !== book.id)
        : [...prev, book]
    )
  }, [setFavorites])

  const isFav = (book) => favorites.some(f => f.id === book.id)

  /* shared container style */
  const container = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: '0 24px',
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg-primary)' }}>

      <Navbar
        favCount={favorites.length}
        onFavClick={() => setActiveTab(p => p === 'favorites' ? 'trending' : 'favorites')}
        onLogoClick={() => { setActiveTab('trending'); setSearchUrl(buildTrendingUrl('fiction')) }}
      />

      {/* ── Hero ── */}
      <section style={{ ...container, textAlign: 'center', padding: '48px 24px 36px' }}>

        <p style={{
          fontSize: 13, fontWeight: 500,
          color: 'var(--text-secondary)',
          marginBottom: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
        }}>
          <TrendingUp size={13} color="#f43f5e" />
          Discover · Read · Remember
        </p>

        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 56px)',
          fontWeight: 800,
          fontFamily: 'Georgia, serif',
          color: 'var(--text-primary)',
          lineHeight: 1.15,
          marginBottom: 14,
          letterSpacing: '-0.5px',
        }}>
          Your Personal{' '}
          <span style={{
            background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            BookVerse
          </span>
        </h1>

        <p style={{
          fontSize: 16,
          color: 'var(--text-secondary)',
          marginBottom: 32,
          maxWidth: 460,
          margin: '0 auto 32px',
          lineHeight: 1.6,
        }}>
          Explore millions of books. Find your next obsession.
        </p>

        <SearchBar onSearch={handleSearch} loading={loading} />
      </section>

      {/* ── Category chips ── */}
      <div style={{
        ...container,
        display: 'flex',
        gap: 8,
        overflowX: 'auto',
        paddingBottom: 4,
        marginBottom: 32,
        scrollbarWidth: 'none',
      }}
        className="scrollbar-hide"
      >
        {CATEGORIES.map(cat => {
          const isActive = cat === activeCategory && activeTab !== 'favorites'
          return (
            <button
              key={cat}
              onClick={() => handleCategory(cat)}
              style={{
                flexShrink: 0,
                padding: '9px 20px',
                borderRadius: 24,
                fontSize: 13,
                fontWeight: 600,
                border: isActive ? 'none' : '1.5px solid var(--border)',
                background: isActive
                  ? 'linear-gradient(135deg, #f43f5e, #ec4899)'
                  : 'transparent',
                color: isActive ? '#fff' : 'var(--text-secondary)',
                cursor: 'pointer',
                transition: 'all 0.18s ease',
              }}
            >
              {cat}
            </button>
          )
        })}
      </div>

      {/* ── Main content ── */}
      <div style={container}>

        {/* Section header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 20,
        }}>
          <h2 style={{
            fontSize: 16, fontWeight: 700,
            color: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', gap: 7,
          }}>
            {activeTab === 'favorites' ? (
              <><Heart size={16} color="#f43f5e" fill="#f43f5e" /> My Favorites ({favorites.length})</>
            ) : activeTab === 'search' ? (
              <><BookOpen size={16} color="#f43f5e" /> Results for "{query}"</>
            ) : (
              <><TrendingUp size={16} color="#f43f5e" /> Trending in {activeCategory}</>
            )}
          </h2>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {activeTab !== 'favorites' && (
              <button
                onClick={refetch}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--text-secondary)', padding: 4,
                }}
              >
                <RefreshCw
                  size={15}
                  style={loading ? { animation: 'spin 0.8s linear infinite' } : {}}
                />
              </button>
            )}
            {activeTab !== 'favorites' && displayBooks.length > 0 && (
              <button style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 13, fontWeight: 500, color: '#f43f5e',
                background: 'none', border: 'none', cursor: 'pointer',
              }}>
                View all <ArrowRight size={13} />
              </button>
            )}
          </div>
        </div>

        {/* ── Skeleton ── */}
        {loading && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 20,
          }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="animate-pulse"
                style={{
                  borderRadius: 12,
                  overflow: 'hidden',
                  border: '1px solid var(--border)',
                  backgroundColor: 'var(--card-bg)',
                }}
              >
                <div style={{ height: 200, backgroundColor: 'var(--border)' }} />
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ height: 12, borderRadius: 6, backgroundColor: 'var(--border)', marginBottom: 8 }} />
                  <div style={{ height: 10, borderRadius: 6, backgroundColor: 'var(--border)', width: '60%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {error && !loading && (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <p style={{ fontSize: 48, marginBottom: 12 }}>😢</p>
            <p style={{ fontWeight: 600, marginBottom: 6, color: 'var(--text-primary)' }}>Something went wrong</p>
            <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 20 }}>{error}</p>
            <button
              onClick={refetch}
              style={{
                padding: '10px 24px', borderRadius: 10, border: 'none',
                background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
                color: '#fff', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Empty favorites ── */}
        {activeTab === 'favorites' && favorites.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <Heart size={56} color="#fecdd3" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontWeight: 600, fontSize: 18, color: 'var(--text-primary)', marginBottom: 6 }}>
              No favorites yet
            </p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)' }}>
              Tap ♡ on any book to save it here
            </p>
          </div>
        )}

        {/* ── Books grid ── */}
        {!loading && !error && displayBooks.length > 0 && (
          <div
            className="animate-fade-in"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 20,
            }}
          >
            {displayBooks.map(book => (
              <BookCard
                key={book.id}
                book={book}
                isFavorite={isFav(book)}
                onToggleFav={handleToggleFav}
                onClick={() => setSelected(book)}
              />
            ))}
          </div>
        )}

        {/* ── No results ── */}
        {!loading && !error && displayBooks.length === 0 && activeTab !== 'favorites' && (
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <BookOpen size={52} color="#fecdd3" style={{ margin: '0 auto 16px' }} />
            <p style={{ fontWeight: 600, color: 'var(--text-primary)' }}>No books found</p>
            <p style={{ fontSize: 14, color: 'var(--text-secondary)', marginTop: 6 }}>Try a different search</p>
          </div>
        )}

        {/* bottom spacing */}
        <div style={{ height: 60 }} />
      </div>

      {/* ── Modal ── */}
      {selectedBook && (
        <BookModal
          book={selectedBook}
          isFavorite={isFav(selectedBook)}
          onToggleFav={handleToggleFav}
          onClose={() => setSelected(null)}
        />
      )}

      {/* ── Footer ── */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        textAlign: 'center',
        padding: '20px 24px',
      }}>
        <p style={{
          fontSize: 13, color: 'var(--text-secondary)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5,
        }}>
          Made with <Heart size={12} fill="#f43f5e" color="#f43f5e" /> using Open Library API
        </p>
      </footer>

    </div>
  )
}