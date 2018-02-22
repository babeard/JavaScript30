
const timeLeft = document.querySelector('.display__time-left')
const timeEnd = document.querySelector('.display__end-time')
const btns = document.querySelectorAll('.timer__controls button')
const manual = document.querySelector('form#custom')
let intervalHandler

// If a button is clicked set the timer with the proper value
btns.forEach(btn => btn.addEventListener('click', e => setTimer(e.target.dataset.time)))

manual.addEventListener('submit', e => {

    // Prevent page reload on submit
    e.preventDefault()

    // Get the input value
    const input = e.target.querySelector('input')
    const value = input.value

    // Reset the form
    e.target.reset()

    // Start timer
    setTimer(value * 60)

    // Take the focus off the input
    input.blur()

})

function setTimer(seconds) {

    // Stop the interval if any
    clearInterval(intervalHandler)

    // Initialize now
    const now = Date.now()

    // Parse into a number
    seconds = Number(seconds)

    // Initialize future
    then = new Date(now + seconds * 1000)

    // Update time on a loop
    intervalHandler = setInterval(() => {

        // Calculate how many seconds we have left
        secondsLeft = Math.round((then.getTime() - Date.now()) / 1000)

        // If countdown complete, stop the loop
        if (secondsLeft < 1) clearInterval(intervalHandler)

        // Calculate the time remaining in minutes:seconds
        const sec = secondsLeft % 60
        const min = Math.floor(secondsLeft / 60)

        // Set the time left display with padding on seconds if need be
        timeLeft.innerText = `${min}:${ sec < 10 ? '0' + sec : sec }`

        // Set the page title to the time left
        document.title = timeLeft.innerText

    }, 100)

    const h = then.getHours()
    const m = then.getMinutes()

    // Get the ending time in hours:minutes
    timeEndValue = `${h > 12 ? h - 12 : h}:${m < 10 ? '0' + m : m}`

    // Set timer ends display
    timeEnd.innerText = `Be Back At ${timeEndValue}`

}
