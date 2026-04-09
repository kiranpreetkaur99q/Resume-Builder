let male = document.getElementById("male");
function goMalePage(){
    window.location.href = "template.html";
    localStorage.setItem("gender", "male");

}
let female = document.getElementById("female");
function goFemalePage(){
    localStorage.setItem("gender", "female");

    window.location.href = "template.html";
}
male.onclick = goMalePage;
female.onclick = goFemalePage;

let btn = document.getElementById("prevBtn");
btn.onclick = function(){
    window.location.href = "home.html";
}


document.addEventListener("click", function(e){
    if(e.target.tagName =="BUTTON"){
        let buttonAudio = document.getElementById("buttonClick");
        buttonAudio.currentTime = 0;
        buttonAudio.play();
    }
});