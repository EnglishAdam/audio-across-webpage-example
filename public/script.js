function main() {
  /**
   * Get audio element
   */
  const audio = document.getElementById('audio')

  /**
   * Set localstorage defaults when undefined
   */
  if (localStorage.getItem('currentTime') == null) localStorage.setItem('currentTime', 0)
  if (localStorage.getItem('state') == null) localStorage.setItem('state', 'ended')
  if (localStorage.getItem('lastPlay') == null) localStorage.setItem('lastPlay', 0)

  /**
   * Play audio once the stream is available
   */
  audio.addEventListener('canplay', () => {
    // Calc autoplay window
    const autoPlayPadding = 60000 // Allowed time since last interaction with player to auotplay
    const msSinceLastPlay = Date.now() - localStorage.getItem('lastPlay') // Time taken in ms since last interaction with player

    // If previous state was play and client is within the autoplay window
    if (localStorage.getItem('state') === 'play' && (msSinceLastPlay < autoPlayPadding)) {
      // Set audio to previous recorded time and play
      if (audio.currentTime < localStorage.getItem('currentTime')) {
        audio.currentTime = localStorage.getItem('currentTime')
      }
      audio.play();
    }
  });

  /**
   * Update current play time and last play time
   */
  audio.addEventListener('timeupdate', (event) => {
    localStorage.setItem('currentTime', audio.currentTime)
    localStorage.setItem('lastPlay', Date.now())
  })

  /**
   * Update state
   */
  audio.addEventListener('play', (event) => localStorage.setItem('state', 'play'))
  audio.addEventListener('playing', (event) => localStorage.setItem('state', 'play'))
  audio.addEventListener('pause', (event) => localStorage.setItem('state', 'pause'))
  audio.addEventListener('ended', (event) => localStorage.setItem('state', 'ended'))
}

window.addEventListener('DOMContentLoaded', main, false)