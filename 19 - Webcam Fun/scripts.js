const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

navigator.mediaDevices.getUserMedia({ video: { width: canvas.offsetWidth, height: canvas.offsetHeight } })
    .then(stream => {

        // Source the stream
        video.srcObject = stream

        video.addEventListener('loadedmetadata', (e) => {

            // Play the video
            video.play()

            // Get the video width
            canvas.width = video.videoWidth
            canvas.height = video.videoHeight

            // Loop every 10 ms
            setInterval(() => {

                // Draw the image to the canvas
                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                // Retrieve pixel information
                const data = ctx.getImageData(0, 0, canvas.width, canvas.height)

                // Manipulate data and put back on cavas
                ctx.putImageData(rgbSplit(data), 0, 0)

            }, 10)

        })

    })
    .catch(console.error)


function takePhoto() {

    // Grab the canvas data
    const data = canvas.toDataURL()

    // Create the needed HTML elements
    const a = document.createElement('a')
    const img = document.createElement('img')

    // Set needed attributes
    a.setAttribute('download', 'download.png')
    a.setAttribute('href', data)
    img.setAttribute('src', data)

    // Append
    a.appendChild(img)
    strip.appendChild(a)

    // Play audio
    snap.currentTime = 0
    snap.play()
}

/* Cheated on below function */
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0]; // RED
        pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
        pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
}