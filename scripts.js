if("serviceWorker" in navigator){
    navigator.serviceWorker.register("service_worker.js").then(registration=>{
      console.log("SW Registered!");
    }).catch(error=>{
      console.log("SW Registration Failed");
    });
}else{
  console.log("Not supported");
}


function CustomAlert(msg, duration)
{
 var el = document.createElement("div");
 el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}


function saveSnap(res, img_name) {
    // let msg = document.getElementById("msg");
    let url = "https://script.google.com/macros/s/AKfycbzf3f7B7Pqo7nX67aBXhOrmvOTmYh8Hng4c6r0to_MokP2ZdpIbi40gxlZY2mwm6i5Z/exec";
    
    let spt = res.split("base64,")[1];
    // console.log("spt: ", spt);
    let date = new Date().toLocaleDateString();
    let obj = {
        base64:spt,
        type:"image/jpeg",
        name: img_name + ".jpg",
        date: date
    }
    fetch(url,{
        method:"POST",
        body:JSON.stringify(obj)
    })
    .then(r=>r.text())
    .then(data => {
        console.log(data);
        // msg.style.display = "block";
        // alert("Added Successfully")
        CustomAlert("Added Successfully", 1000);
    })

}