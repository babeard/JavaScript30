const ctrl = {
    play: document.querySelector('button.player__button'),
    volume: document.querySelector('input[name="volume"]'),
    speed: document.querySelector('input[name="playbackRate"]'),
    back10: document.querySelector('button[data-skip="-10"]'),
    forward25: document.querySelector('button[data-skip="25"]'),
    progressBar: document.querySelector('div.progress__filled'),
    progress: document.querySelector('div.progress')
}

const player = document.querySelector('video.viewer')

player.addEventListener('timeupdate', updateProgressBar)

player.addEventListener('click', togglePlay)
ctrl.play.addEventListener('click', togglePlay)

ctrl.forward25.addEventListener('click', skip)
ctrl.back10.addEventListener('click', skip)

ctrl.volume.addEventListener('change', (e) => player.volume = e.target.value)
ctrl.speed.addEventListener('change', (e) => player.playbackRate = e.target.value)

ctrl.progress.addEventListener('click', seek)

let isPlaying = false

function togglePlay() {

    // Toggle video playing
    isPlaying ? player.pause() : player.play()    

    // Update the isPlaying variable
    isPlaying = !isPlaying

    // Update the icon
    ctrl.play.innerText = (isPlaying) ? '❚❚' : '►'

}

function skip(e) {

    // Get the data attribute for time to skip and convert to a number
    const seconds = Number(e.target.getAttribute('data-skip'))

    // Grab the new current time
    const to = player.currentTime + seconds

    // Check time bounds
    if ( to < 0 || to > player.duration ) return

    // Assign new time
    player.currentTime = to

}

function updateProgressBar() {

    // Compute the percentage completed
    const completed = Math.round(this.currentTime / this.duration * 10000) / 100

    // Update the progress bar style
    ctrl.progressBar.style.flexBasis = `${completed}%`

}

function seek(e) {

    // Calculate the time to seek to
    const seekTo = Math.round((e.layerX / this.offsetWidth) * player.duration)

    // Seek
    player.currentTime = seekTo

}