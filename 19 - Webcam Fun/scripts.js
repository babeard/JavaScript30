const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

navigator.mediaDevices.getUserMedia({ video: { width: canvas.offsetWidth, height: canvas.offsetHeight } })
    .then(stream => {

        video.srcObject = stream

        video.addEventListener('loadedmetadata', (e) => {            

            video.play()

            setInterval(() => {

                canvas.width = video.videoWidth
                canvas.height = video.videoHeight

                ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

                const data = ctx.getImageData(0, 0, canvas.width, canvas.height)

                ctx.putImageData(rgbSplit(data), 0, 0)

            }, 10)

        })

    })
    .catch(console.error)


function takePhoto() {

    // Grab the canvas data
    const data = canvas.toDataURL()

    // Add to the photo strip and a downloadable link
    strip.innerHTML += `<a download='download.png' href='${data}'><img src='${data}' /></a>`

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