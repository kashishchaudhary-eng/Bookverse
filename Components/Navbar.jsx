'use client'
import { BookOpen, Heart, Sun, Moon, User } from 'lucide-react'
import { useTheme } from './ThemeProvider'

export default function Navbar({ favCount, onFavClick, onLogoClick }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header style={{
      borderBottom: '1px solid var(--border)',
      backgroundColor: 'var(--bg-secondary)',
      position: 'sticky', top: 0, zIndex: 50,
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        padding: '0 24px',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>

        {/* Logo */}
        <button onClick={onLogoClick} style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'none', border: 'none', cursor: 'pointer',
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'linear-gradient(135deg, #f43f5e, #ec4899)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <BookOpen size={18} color="white" />
          </div>
          <span style={{
            fontSize: 20, fontWeight: 700,
            fontFamily: 'Georgia, serif',
            color: 'var(--text-primary)',
            letterSpacing: '-0.3px',
          }}>
            Book<span style={{ color: '#f43f5e' }}>Verse</span>
          </span>
        </button>

        {/* Center nav links — hidden on mobile */}
        <nav style={{
          display: 'flex', gap: 32,
          position: 'absolute', left: '50%', transform: 'translateX(-50%)',
        }} className="hide-mobile">
          <a href="#" style={{
            fontSize: 14, fontWeight: 600, color: '#f43f5e',
            textDecoration: 'none',
          }}>Discover</a>
          <button onClick={onFavClick} style={{
            fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)',
            background: 'none', border: 'none', cursor: 'pointer',
          }}>Favorites</button>
          <a href="#" style={{
            fontSize: 14, fontWeight: 500, color: 'var(--text-secondary)',
            textDecoration: 'none',
          }}>Contact</a>
        </nav>

        {/* Right controls */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          {/* Theme toggle */}
          <button onClick={toggleTheme} style={{
            width: 36, height: 36, borderRadius: 8,
            border: '1px solid var(--border)',
            backgroundColor: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)',
          }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Favorites with badge */}
          <button onClick={onFavClick} style={{
            width: 36, height: 36, borderRadius: 8,
            border: '1px solid var(--border)',
            backgroundColor: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)',
            position: 'relative',
          }}>
            <Heart size={16} />
            {favCount > 0 && (
              <span style={{
                position: 'absolute', top: -6, right: -6,
                width: 18, height: 18, borderRadius: '50%',
                backgroundColor: '#f43f5e', color: 'white',
                fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{favCount}</span>
            )}
          </button>

          {/* User icon */}
          <button style={{
            width: 36, height: 36, borderRadius: 8,
            border: '1px solid var(--border)',
            backgroundColor: 'transparent',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', color: 'var(--text-secondary)',
          }}>
            <User size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}