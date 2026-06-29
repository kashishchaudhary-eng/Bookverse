'use client'
import { Heart, Star, BookOpen, Eye } from 'lucide-react'

export default function BookCard({ book, isFavorite, onToggleFav, onClick }) {
  return (
    <div onClick={onClick}
         className="book-card cursor-pointer rounded-2xl overflow-hidden border"
         style={{ backgroundColor: 'var(--card-bg)', borderColor: 'var(--border)' }}>

      {/* Cover */}
      <div className="relative h-52 overflow-hidden"
           style={{ background: 'linear-gradient(135deg, #fce7f3, #fecdd3)' }}>
        <img
          src={book.thumbnail}
          alt={book.title}
          className="w-full h-full object-contain p-2 transition-transform duration-300 hover:scale-105"
          onError={e => { e.target.src = `https://via.placeholder.com/200x280/fce7f3/f43f5e?text=${encodeURIComponent(book.title.slice(0,10))}` }}
        />
        {/* Fav button */}
        <button
          onClick={e => { e.stopPropagation(); onToggleFav(book) }}
          className="absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110"
          style={{ backgroundColor: 'rgba(255,255,255,0.85)' }}>
          <Heart size={16} fill={isFavorite ? '#f43f5e' : 'none'}
                 style={{ color: '#f43f5e' }} />
        </button>
        {/* Rating badge */}
        {book.rating && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm"
               style={{ backgroundColor: 'rgba(255,255,255,0.85)', color: '#92400e' }}>
            <Star size={11} fill="#f59e0b" color="#f59e0b" />
            {book.rating.toFixed(1)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm leading-tight mb-1 line-clamp-2"
            style={{ color: 'var(--text-primary)' }}>
          {book.title}
        </h3>
        <p className="text-xs mb-3 line-clamp-1" style={{ color: 'var(--text-secondary)' }}>
          {book.authors.join(', ')}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between">
          {book.pageCount && (
            <span className="flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
              <BookOpen size={11} /> {book.pageCount}p
            </span>
          )}
          <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                style={{ backgroundColor: 'var(--border)', color: 'var(--accent)' }}>
            <Eye size={10} /> View
          </span>
        </div>
      </div>
    </div>
  )
}