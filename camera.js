
// Configure a few settings and attach camera 250x187
// var image_uri = "";
Webcam.set({
    width: 300,
    height: 240,
    image_format: 'jpg',
    jpeg_quality: 100,
    constraints: {
        facingMode: 'environment'
    }
    });	 
Webcam.attach( '#my_camera' );
    
function take_snapshot() {
    // play sound effect
    //shutter.play();
    // take snapshot and get image data
    Webcam.snap( function(data_uri) {
    // display results in page
    // console.log("New Data URI: ", data_uri);
    image_uri = data_uri;
    document.getElementById('results').innerHTML = 
    '<img class="after_capture_frame" src="'+data_uri+'"/>';
    $("#captured_image_data").val(data_uri);

    // return data_uri;
    });	 
}

// function saveSnap(){
//     var base64data = $("#captured_image_data").val();
//     $.ajax({
//             type: "POST",
//             dataType: "json",
//             url: "capture_image_upload.php",
//             data: {image: base64data},
//             success: function(data) { 
//                 alert(data);
//             }
//         });
// }