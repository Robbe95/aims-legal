export function getVideoEmbedUrl(url: string): string {
  if (url.includes('vimeo.com')) {
    const videoId = url.split('/').pop()?.split('?')[0]

    return `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&controls=0&loop=1&background=1`
  }

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    if (url.includes('shorts/')) {
      const parts = url.split('shorts/')
      const videoId = parts[1]?.split('?')[0]

      return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0`
    }

    let videoId = ''

    if (url.includes('youtu.be/')) {
      const parts = url.split('youtu.be/')

      videoId = parts[1]?.split('?')[0] || ''
    }
    else if (url.includes('v=')) {
      const parts = url.split('v=')

      videoId = parts[1]?.split('&')[0] || ''
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&loop=1&playlist=${videoId}&modestbranding=1&showinfo=0`
  }

  return url
}
