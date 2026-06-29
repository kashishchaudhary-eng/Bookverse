const BASE_URL = 'https://openlibrary.org'

export function buildSearchUrl(query, page = 1) {
  const params = new URLSearchParams({
    q: query,
    limit: 12,
    page,
    fields: 'key,title,author_name,cover_i,first_publish_year,number_of_pages_median,subject,ratings_average,ratings_count',
  })
  return `${BASE_URL}/search.json?${params}`
}

export function buildTrendingUrl(subject = 'fiction') {
  const params = new URLSearchParams({
    q: `subject:${subject}`,
    limit: 12,
    sort: 'rating',
    fields: 'key,title,author_name,cover_i,first_publish_year,number_of_pages_median,subject,ratings_average,ratings_count',
  })
  return `${BASE_URL}/search.json?${params}`
}

export function normalizeBook(item) {
  const coverId = item.cover_i
  return {
    id:           item.key || Math.random().toString(),
    title:        item.title || 'Unknown Title',
    authors:      item.author_name || ['Unknown Author'],
    description:  item.subject?.slice(0, 3).join(', ') || 'No description available.',
    thumbnail:    coverId
                    ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg`
                    : null,
    rating:       item.ratings_average ? parseFloat(item.ratings_average.toFixed(1)) : null,
    ratingCount:  item.ratings_count || 0,
    pageCount:    item.number_of_pages_median || null,
    categories:   item.subject?.slice(0, 3) || [],
    publishedDate: item.first_publish_year?.toString() || '',
    publisher:    '',
    previewLink:  `https://openlibrary.org${item.key}`,
    language:     'en',
  }
}