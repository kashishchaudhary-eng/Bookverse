'use client'
import { useState } from 'react'
import { BookOpen, Heart, Moon, Sun, Menu, X } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navbar({ favCount, onFavClick, onLogoClick }) {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav
      className="sticky top-0 z-50 border-b"
      style={{
        backgroundColor: 'color-mix(in srgb, var(--bg-primary) 90%, transparent)',
        borderColor: 'var(--border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">

        {/* Logo */}
        <button onClick={onLogoClick} className="flex items-center gap-2 flex-shrink-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)' }}
          >
            <BookOpen size={18} color="white" />
          </div>
          <span className="text-xl font-bold" style={{ fontFamily: 'Georgia, serif', color: 'var(--accent)' }}>
            Book<span style={{ color: 'var(--text-primary)' }}>Verse</span>
          </span>
        </button>

        {/* Tagline — only large screens */}
        <p className="hidden lg:block text-sm flex-1 text-center" style={{ color: 'var(--text-secondary)' }}>
          Discover your next great read ✨
        </p>

        {/* Desktop controls */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={onFavClick}
            className="relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all hover:scale-105"
            style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <Heart size={15} style={{ color: '#f43f5e' }} />
            Favorites
            {favCount > 0 && (
              <span
                className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full text-xs flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: '#f43f5e' }}
              >
                {favCount}
              </span>
            )}
          </button>

          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl transition-all hover:scale-110"
            style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>

        {/* Mobile: fav icon + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={onFavClick}
            className="relative p-2.5 rounded-xl"
            style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            <Heart size={17} style={{ color: '#f43f5e' }} />
            {favCount > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center text-white font-bold"
                style={{ backgroundColor: '#f43f5e' }}
              >
                {favCount}
              </span>
            )}
          </button>
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2.5 rounded-xl"
            style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}
          >
            {menuOpen ? <X size={17} /> : <Menu size={17} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div
          className="sm:hidden border-t px-4 py-3 flex flex-col gap-2"
          style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg-secondary)' }}
        >
          <p className="text-sm text-center py-1" style={{ color: 'var(--text-secondary)' }}>
            Discover your next great read ✨
          </p>
        </div>
      )}
    </nav>
  )
}