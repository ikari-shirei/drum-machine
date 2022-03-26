const pads = document.getElementsByClassName('drum-pad')
const display = document.getElementById('display')

const keys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']

let currentAudio = null

function handleAnimation(drumPad) {
  drumPad.classList.add('drum-pad-active')

  const timeout = setTimeout(() => {
    clearTimeout(timeout)
    drumPad.classList.remove('drum-pad-active')
  }, 200)
}

function audioPlay(audio) {
  // Pause and reset all audio elements:
  currentAudio = audio

  if (currentAudio !== null) {
    currentAudio.pause()
    currentAudio.currentTime = 0

    audio.play()
  }

  // Show which cord is played
  display.textContent = audio.parentElement.getAttribute('data-name')
}

// Play on click
for (let i = 0; i < pads.length; i++) {
  pads[i].addEventListener('click', (e) => {
    const audio = e.target.firstElementChild

    handleAnimation(pads[i])
    audioPlay(audio)
  })
}

// Play on key press
document.addEventListener('keypress', (e) => {
  const targetKey = e.key.toUpperCase()

  if (keys.includes(targetKey)) {
    // Get data attribute
    for (let i = 0; i < pads.length; i++) {
      const targetData = pads[i].getAttribute('id')
      // Match data attribute with pressed key
      if (targetData === targetKey) {
        const audio = pads[i].firstElementChild

        handleAnimation(pads[i])
        audioPlay(audio)
        break
      }
    }
  }
})
