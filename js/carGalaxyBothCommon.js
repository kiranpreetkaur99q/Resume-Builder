// this file declare function which are calling in car and galxy journey js

// reset all localstorage value and keep only gender value ;
function resetStorageKeepGender() {
    const gender = localStorage.getItem("gender");

    localStorage.clear();
    if (gender === "male") {
        localStorage.setItem("gender", "male");
    }else{
        localStorage.setItem("gender", "female");
    }
}
//  Play sounds only if user click sound button
let soundEnabled = false;

let backSound = document.getElementById("backSound");
let soundButton = document.getElementById("enableSound");
let count = 0;
function playClickAudio(e){
    if (e.target.tagName == "BUTTON") {
        let buttonAudio = document.getElementById("buttonClick");
        buttonAudio.currentTime = 0;
        buttonAudio.play();
    }
}

soundButton.addEventListener("click", function (e) {
    if(count%2===0){
        backSound.muted = false;
        document.addEventListener("click", playClickAudio);
        backSound.play();
        soundEnabled = true;
        soundButton.style.opacity = "0.2"; 
        count++;
    }else{
        document.removeEventListener("click", playClickAudio);
        backSound.muted = true;
        pauseSound();
        soundEnabled = false;
        soundButton.style.opacity = "1";
        count++;
    } 

}
);

//Play background sound
function playSound() {
    if (soundEnabled) {
        backSound.currentTime = 0;
        backSound.play();
    }
}
//  Pause background sound

function pauseSound() {
    if (soundEnabled) {
        backSound.pause();
    }
}
//  Remove all elements from a form

function clearForm(form) {
    while (form.firstChild) {
        form.removeChild(form.firstChild);
    }
}

// Create a label + input which is form of que/ans and add itno form
function createFields(form, labelText, type, name, placeholder) {
    let label = document.createElement("label");
    label.textContent = labelText;
    label.setAttribute("for", name);

    let input = document.createElement("input");
    input.type = type;
    input.name = name;
    input.id = name;
    input.required = true;
    input.placeholder = placeholder;
  form.append(label, input);
}

//  Create a submit button for any form

function createSubmitButton(form) {
    const btn = document.createElement("button");
    btn.type = "submit";
    btn.textContent = "submit";
    form.append(btn);
}
