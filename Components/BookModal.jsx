'use client'
import { X, Heart, Star, BookOpen, ExternalLink, User, Calendar, Globe } from 'lucide-react'

export default function BookModal({ book, isFavorite, onToggleFav, onClose }) {
  if (!book) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
         style={{ backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }}
         onClick={e => e.target === e.currentTarget && onClose()}>
     <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-2xl sm:rounded-3xl animate-slide-up mx-2 sm:mx-0"
           style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border)' }}>

        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-4 border-b z-10"
             style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border)' }}>
          <h2 className="font-bold text-lg truncate pr-4" style={{ color: 'var(--text-primary)' }}>
            {book.title}
          </h2>
          <button onClick={onClose} className="p-2 rounded-full transition-all hover:scale-110"
                  style={{ backgroundColor: 'var(--border)', color: 'var(--text-primary)' }}>
            <X size={18} />
          </button>
        </div>

       <div className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6">
          {/* Cover */}
          <div className="flex-shrink-0 mx-auto sm:mx-0">
            <div className="w-36 h-52 rounded-2xl overflow-hidden"
                 style={{ background: 'linear-gradient(135deg, #fce7f3, #fecdd3)' }}>
              <img src={book.thumbnail} alt={book.title}
                   className="w-full h-full object-contain p-2"
                   onError={e => { e.target.src = `https://via.placeholder.com/150x220/fce7f3/f43f5e?text=Book` }} />
            </div>
            {/* Actions */}
            <div className="flex flex-col gap-2 mt-3">
              <button onClick={() => onToggleFav(book)}
                      className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-medium transition-all hover:scale-105"
                      style={{ background: isFavorite ? '#f43f5e' : 'var(--border)',
                               color: isFavorite ? 'white' : 'var(--text-primary)' }}>
                <Heart size={14} fill={isFavorite ? 'white' : 'none'} />
                {isFavorite ? 'Saved' : 'Save'}
              </button>
              <a href={book.previewLink} target="_blank" rel="noopener noreferrer"
                 className="flex items-center justify-center gap-2 py-2 px-4 rounded-xl text-sm font-medium text-white transition-all hover:scale-105"
                 style={{ background: 'linear-gradient(135deg, #f43f5e, #ec4899)' }}>
                <ExternalLink size={14} /> Preview
              </a>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1">
            <p className="font-semibold mb-1" style={{ color: 'var(--text-primary)' }}>
              {book.authors.join(', ')}
            </p>

            {/* Rating */}
            {book.rating && (
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[1,2,3,4,5].map(i => (
                    <Star key={i} size={14}
                          fill={i <= Math.round(book.rating) ? '#f59e0b' : 'none'}
                          color="#f59e0b" />
                  ))}
                </div>
                <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {book.rating.toFixed(1)} ({book.ratingCount.toLocaleString()} reviews)
                </span>
              </div>
            )}

            {/* Meta chips */}
            <div className="flex flex-wrap gap-2 mb-4">
              {book.pageCount && (
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <BookOpen size={10} /> {book.pageCount} pages
                </span>
              )}
              {book.publishedDate && (
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <Calendar size={10} /> {book.publishedDate.slice(0,4)}
                </span>
              )}
              {book.language && (
                <span className="flex items-center gap-1 text-xs px-2 py-1 rounded-full"
                      style={{ backgroundColor: 'var(--border)', color: 'var(--text-secondary)' }}>
                  <Globe size={10} /> {book.language.toUpperCase()}
                </span>
              )}
            </div>

            {/* Categories */}
            {book.categories.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-3">
                {book.categories.slice(0,3).map(cat => (
                  <span key={cat} className="text-xs px-2 py-1 rounded-full font-medium"
                        style={{ backgroundColor: 'rgba(244,63,94,0.1)', color: '#f43f5e' }}>
                    {cat}
                  </span>
                ))}
              </div>
            )}

            {/* Description */}
            <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
              {book.description.slice(0, 400)}{book.description.length > 400 ? '...' : ''}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}