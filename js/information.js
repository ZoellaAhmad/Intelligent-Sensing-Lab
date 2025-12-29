//information page

//array to assist in the looping of promotional texts
var promo_texts = new Array("Optical Sensing Division has 8 openings for PhD researchers! Develop next-gen imaging systems.", "Bio-Sensing Group offers 5 internship positions in medical sensor development for researchers!", "3 vacancies are available in Smart-Sensing Division! Research IoT sensors networks and AI-enabled sensing.");

//selecting a random index of the array
selected = Math.floor((Math.random()) * 3);

window.onload = function() {
    document.getElementsByTagName('h2')[0].innerHTML = promo_texts[selected];
}

//looping mechanism with 3-second intervals in between each heading
let currentIndex = 0;
currentIndex = (selected + 1) % 3;
setInterval(loop, 3000);

function loop () {
    document.getElementsByTagName('h2')[0].innerHTML = promo_texts[currentIndex];
    currentIndex = (currentIndex + 1) % 3;
}



//video looping 
const vid = document.getElementById("video");
vid.addEventListener("ended", function() {
    playVid();
});

//to check which video has already played
let flag = false;
function playVid() {
    let type1 = document.getElementById("webm");
    let type2 = document.getElementById("mp4");

    if (flag === false) {
        type1.setAttribute("src", "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.webm");
        type2.setAttribute("src", "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video2.mp4");
        flag = true;
    } else if (flag === true) {
        type1.setAttribute("src", "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.webm");
        type2.setAttribute("src", "https://personal.cs.cityu.edu.hk/~cs2204/2025/video/video1.mp4");
        flag = false;
    }

    vid.load();
    vid.play();
}

