'use client'
import { Heart, Star } from 'lucide-react'

export default function BookCard({ book, isFavorite, onToggleFav, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--card-bg)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-4px)'
        e.currentTarget.style.boxShadow = '0 12px 32px rgba(244,63,94,0.15)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      {/* Cover */}
      <div style={{
        position: 'relative',
        height: 200,
        background: 'linear-gradient(135deg, #fce7f3, #fecdd3)',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={
            book.thumbnail ||
            `https://via.placeholder.com/160x200/fce7f3/f43f5e?text=${encodeURIComponent(book.title.slice(0, 6))}`
          }
          alt={book.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={e => {
            e.target.src = `https://via.placeholder.com/160x200/fce7f3/f43f5e?text=${encodeURIComponent(book.title.slice(0, 6))}`
          }}
        />

        {/* Rating badge — bottom left */}
        {book.rating && (
          <div style={{
            position: 'absolute', bottom: 8, left: 8,
            display: 'flex', alignItems: 'center', gap: 3,
            backgroundColor: 'rgba(0,0,0,0.65)',
            borderRadius: 6, padding: '3px 7px',
          }}>
            <Star size={10} fill="#f59e0b" color="#f59e0b" />
            <span style={{ fontSize: 11, fontWeight: 600, color: '#fff' }}>
              {book.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Info row */}
      <div style={{
        padding: '12px 14px',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        flex: 1,
      }}>
        <h3 style={{
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--text-primary)',
          lineHeight: 1.35,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          margin: 0,
        }}>
          {book.title}
        </h3>

        {/* Author + Heart in one row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: 6,
        }}>
          <p style={{
            fontSize: 12,
            color: 'var(--text-secondary)',
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '75%',
          }}>
            {book.authors[0]}
          </p>

          <button
            onClick={e => { e.stopPropagation(); onToggleFav(book) }}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: 4, borderRadius: 6,
              display: 'flex', alignItems: 'center',
              flexShrink: 0,
            }}
          >
            <Heart
              size={15}
              fill={isFavorite ? '#f43f5e' : 'none'}
              color={isFavorite ? '#f43f5e' : 'var(--text-secondary)'}
            />
          </button>
        </div>
      </div>
    </div>
  )
}