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
        alert("Added Successfully")
    })

}