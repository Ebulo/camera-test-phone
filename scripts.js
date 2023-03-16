image_uri = null
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service_worker.js").then(registration=>{
      console.log("SW Registered!");
    }).catch(error=>{
      console.log("SW Registration Failed");
    });
}else{
  console.log("Not supported");
}

// Online Check
// window.addEventListener("load", (event) => {
//   const statusDisplay = document.getElementById("error");
//   statusDisplay.style.display = navigator.onLine ? "none" : "block";
// });

const checkOnlineStatus = async () => {
  try {
    // const online = await fetch("static/img/error.jpg");
    const online = await fetch("https://upload.wikimedia.org/wikipedia/commons/e/e6/1kb.png");
    return online.status >= 200 && online.status < 300; // either true or false
  } catch (err) {
    return false; // definitely offline
  }
};

setInterval(async () => {
  const result = await checkOnlineStatus();
  const statusDisplay = document.getElementById("error");
  statusDisplay.style.display = result ? "none" : "block";
}, 30000); // probably too often, try 30000 for every 30 seconds

window.addEventListener("load", async (event) => {
  const statusDisplay = document.getElementById("error");
  statusDisplay.style.display = (await checkOnlineStatus()) ? "none" : "block";
});


function CustomAlert(msg, duration)
{
//  var el = document.createElement("div");
 var msg = document.getElementById("upload_done");
 msg.style.display = "block";
//  el.setAttribute("style","position: absolute; Padding: 10px; border-radius: 4px; overflow: hidden; top:50%; left: 50%; transform: translate(-50%, -50%); background-color:white;");
//  el.innerHTML = msg;
 setTimeout(function(){
//   el.parentNode.removeChild(el);
  msg.style.display = "none";
 },duration);
//  document.body.appendChild(el);
}

function blobToDataURL(blob, callback) {
  var a = new FileReader();
  a.onload = function(e) {callback(e.target.result);}
  a.readAsDataURL(blob);
}


//Get the Image Size
function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) {
    return "0 Byte";
  }
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}



// Image Compression
function compressImage(imgToCompress, resizingFactor, quality) {
  // showing the compressed image
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const originalWidth = imgToCompress.width;
  const originalHeight = imgToCompress.height;

  const canvasWidth = originalWidth * resizingFactor;
  const canvasHeight = originalHeight * resizingFactor;

  canvas.width = canvasWidth;
  canvas.height = canvasHeight;

  context.drawImage(
    imgToCompress,
    0,
    0,
    originalWidth * resizingFactor,
    originalHeight * resizingFactor
  );

  // reducing the quality of the image
  canvas.toBlob(
    (blob) => {
      if (blob) {
        // compressedImageBlob = blob;
        
        blobToDataURL(blob, function(dataurl){
          // console.log("Data URL: ", dataurl);
          // captured_photo.src = URL.createObjectURL(compressedImageBlob);
          // let captured_photo = document.querySelector("#test")
          // captured_photo.src = URL.createObjectURL(blob);
          image_uri = dataurl
        });
        console.log("Image Current Size: ", bytesToSize(blob.size));
        // document.querySelector("#size").innerHTML = bytesToSize(blob.size);
      }
    },
    "image/jpeg",
    quality
  );
}


function capture_image() {
  let image_data = document.getElementById("camera_image").files[0];

  const reader = new FileReader();
  // var image_uri;
  
  if (image_data) {
    reader.readAsDataURL(image_data);
  }

  reader.addEventListener(
    "load",
    () => {
      // convert image file to base64 string
      // preview.src = reader.result;
      // console.log("Reader.Result", reader.result);
      document.getElementById('results').innerHTML = '<img class="captured_photo" style="width: 100%" id="captured_photo" src="'+ reader.result +'"/>';
      let captured_photo = document.querySelector('#captured_photo')
      captured_photo.addEventListener('load', () => {
        compressImage(captured_photo, 1, 1);
      })
      image_uri = reader.result;
      // return image_uri;
    },
    false
  );

  // return image_uri


  // console.log("Camera_image: ", image_data.value);
  // document.getElementById('results').innerHTML = '<img class="after_capture_frame" src="'+ image_data.value +'"/>';
    // $("#captured_image_data").val(data_uri);
}


async function saveSnap(res, img_name) {
    // let msg = document.getElementById("msg");
    if (!(await checkOnlineStatus())) {
      const statusDisplay = document.getElementById("error");
      statusDisplay.style.display = "block";
      return
    }

    let send_btn = document.getElementById("send_btn");
    let upload_start = document.getElementById("upload_start");
    let error = document.getElementById("error");
    send_btn.disabled = true;
    upload_start.style.display = "block";
    // let url = "https://script.google.com/macros/s/AKfycbzf3f7B7Pqo7nX67aBXhOrmvOTmYh8Hng4c6r0to_MokP2ZdpIbi40gxlZY2mwm6i5Z/exec";
    let url = "https://script.google.com/macros/s/AKfycbxIPNCwLKHK7qeBe68hg3CPXwsbTnX70qaPEIhV-4omqfPhteRNf6f2KKtvINfyclqQ/exec";
    
    let spt = res.split("base64,")[1];
    // console.log("spt: ", spt);
    let date = new Date().toLocaleDateString();
    let obj = {
        base64:spt,
        type:"image/jpeg",
        name: img_name + ".jpg",
        date: date
    }
    try {
      // document.body.style.overscrollBehavior = "none";
      const upload = fetch(url,{
          method:"POST",
          body:JSON.stringify(obj)
      });
      upload.then(r=>r.text())
      .then(data => {
          console.log(upload.status);
          console.log(JSON.parse(data).status);
          // msg.style.display = "block";
          // alert("Added Successfully")
          CustomAlert("Added Successfully", 2800);
          image_uri = null;
          upload_start.style.display = "none";
          send_btn.disabled = false;
      })
    } catch(err) {
      console.log("Error: ", err);
      upload_start.style.display = "none"; 
      send_btn.disabled = false;
      error.style.display = "block";
    }

}