const fileInput = document.querySelector("#upload");

const originalImage = document.querySelector("#originalImage");
const compressedImage = document.querySelector("#compressedImage");

const resizingElement = document.querySelector("#resizingRange");
const qualityElement = document.querySelector("#qualityRange");

const uploadButton = document.querySelector("#uploadButton");

let compressedImageBlob;

let resizingFactor = 0.8;
let quality = 0.8;

// initializing the compressed image
compressImage(originalImage, resizingFactor, quality);

fileInput.addEventListener("change", async (e) => {
  const [file] = fileInput.files;
  // storing the original image
  originalImage.src = await fileToDataUri(file);

  // compressing the uplodaded image
  originalImage.addEventListener("load", () => {
    compressImage(originalImage, resizingFactor, quality);
  });

  return false;
});

resizingElement.oninput = (e) => {
  resizingFactor = parseInt(e.target.value) / 100;
  compressImage(originalImage, resizingFactor, quality);
};

qualityElement.oninput = (e) => {
  quality = parseInt(e.target.value) / 100;
  compressImage(originalImage, resizingFactor, quality);
};

uploadButton.onclick = () => {
  // uploading the compressed image to
  // Imgur (if present)
  if (compressedImageBlob) {
    const formdata = new FormData();
    formdata.append("image", compressedImageBlob);

    fetch("https://api.imgur.com/3/image/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Client-ID YOUR_CLIENT_ID"
      },
      body: formdata
    }).then((response) => {
      if (response?.status === 403) {
        alert("Unvalid Client-ID!");
      } else if (response?.status === 200) {
        // retrieving the URL of the image
        // just uploaded to Imgur
        response.json().then((jsonResponse) => {
          alert(`URL: ${jsonResponse.data?.link}`);
        });
        alert("Upload completed succesfully!");
      } else {
        console.error(response);
      }
    });
  } else {
    alert("Rezind and compressed image missing!");
  }
};

function compressImage(imgToCompress, resizingFactor, quality) {
  // showing the compressed image
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  const originalWidth = imgToCompress.width;
  const originalHeight = imgToCompress.height;

  console.log("Original Width: ", originalWidth);
  console.log("Original Height: ", originalHeight);

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
        compressedImageBlob = blob;
        compressedImage.src = URL.createObjectURL(compressedImageBlob);
        document.querySelector("#size").innerHTML = bytesToSize(blob.size);
      }
    },
    "image/jpeg",
    quality
  );
}

function fileToDataUri(field) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      resolve(reader.result);
    });
    reader.readAsDataURL(field);
  });
}

// source: https://stackoverflow.com/a/18650828
function bytesToSize(bytes) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) {
    return "0 Byte";
  }

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));

  return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
}
