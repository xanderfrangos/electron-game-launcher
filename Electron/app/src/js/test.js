console.log("worker!")

function tmp() {
    //console.log("tmp");
    setTimeout(tmp,16);
}

tmp();