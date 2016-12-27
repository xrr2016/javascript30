const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')
const takePhotoBtn = document.getElementById('takePhotoBtn')


function getVideo(){
   navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(localMediaStream => {
      video.src = window.URL.createObjectURL(localMediaStream)
      video.play()
    })
    .catch((err)=>{
      console.log(err)
    })
}

getVideo()

function paintToCanvas(){
    canvas.width = 640
    canvas.height = 480

    // requestAnimationFrame()
    return setInterval(()=>{
      ctx.drawImage(video, 0, 0 , canvas.width , canvas.height)
      ctx.globalAlpha = .9
      let pixels = ctx.getImageData(0,0,canvas.width,canvas.height)
      // pixels = redEffect(pixels)
      pixels = rgbSplit(pixels)
      ctx.putImageData(pixels,0,0)
    },16)
}

function redEffect(pixels){
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0]  = pixels.data[i + 0] + 100
    pixels.data[i + 1]  = pixels.data[i + 1] + 120
    pixels.data[i + 2]  = pixels.data[i + 2] * .9
  }
  return pixels
}
function rgbSplit(pixels) {
  for (let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150]  = pixels.data[i + 0]
    pixels.data[i + 500]  = pixels.data[i + 1]
    pixels.data[i - 550 ]  = pixels.data[i + 2]
  }
  return pixels
}

function takePhoto(){
  snap.currentTime = 0
  snap.play()
  const data = canvas.toDataURL('imgs/png')
  const link = document.createElement('a')
  link.href = data
  link.setAttribute('download','cool!')
  link.innerHTML = `<img src="${data}" alt="COOL MAN!"/>`
  strip.insertBefore(link,strip.firstChild)
}
takePhotoBtn.addEventListener('click',takePhoto)
video.addEventListener('canplay',paintToCanvas)
