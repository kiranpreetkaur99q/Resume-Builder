
// the welcome message apear when we land on planets or stop
function showMessage(text) {
    let message = document.getElementById("planet-message");
    message.innerHTML = text;
    let box = document.getElementById("planetMessage");
    box.style.display = "flex";
    box.style.flexDirection = "column";
    box.style.justifyContent = "space-around";
    box.style.alignItems = "center";
}
let continueBtn = document.getElementById("continue");
continueBtn.onclick = function(){
    let box = document.getElementById("planetMessage");
    box.style.display = "none";
}

let whichRocket = document.getElementById("rocket");

window.addEventListener("load", function () {
    resetStorageKeepGender();
});
if (localStorage.getItem("gender") == "male") {
    whichRocket.src = "../images/boyRocket.png";
}
else {
    whichRocket.src = "../images/girlRocket.png";
}

let alian = document.querySelector("#alian");

alian.addEventListener("animationend", function (event) {

    if (event.animationName === "movingToCenter") {
        showMessage(" Welcome to Saturn! Share Details with Alien");
        askUserName();

        pauseSound();

    }
});

// FORM 1: USER NAME 

let userName;
let address;
let email;

function askUserName() {
    let form = document.getElementsByTagName("form")[0];
    form.style.opacity = 1;
    form.addEventListener("submit", startAskAddress);
}

function startAskAddress(event) {
    event.preventDefault();
    userName = document.getElementsByTagName("input")[0].value;
    askAddress();
}

function askAddress() {
    let form = document.getElementsByTagName("form")[0];
    // Replace old submit event with the new one
    form.removeEventListener("submit", startAskAddress);
    form.addEventListener("submit", startAskEmail);


    clearForm(form);
    // Rewrite form content
    createFields(form, "What's address?", "text", "address", "Type your address");
    createSubmitButton(form);
}

function startAskEmail(event) {
    event.preventDefault();
    address = document.getElementsByTagName("input")[0].value;
    askEmail();
}

function askEmail() {
    let form = document.getElementsByTagName("form")[0];

    form.removeEventListener("submit", startAskEmail);
    form.addEventListener("submit", startRestart);

    clearForm(form);
    createFields(form, "What's your email?", "email", "email", "Type your email");
    createSubmitButton(form);
}
function startRestart(event) {
    event.preventDefault();
    email = document.getElementsByTagName("input")[0].value;
    restart();
}
function restart() {
    let form = document.getElementsByTagName("form")[0];
    clearForm(form);

    playSound();

    document.getElementById("collectInfoScene").removeChild(document.getElementsByTagName("form")[0]);
    alian.style.animation = "movingFromCenter 5s linear forwards";
    let saturn = document.querySelector("#saturn");

    saturn.style.animation = "movingPlanetsFromCenter 7s linear forwards";
    let jupitor = document.querySelector("#jupitor");
    jupitor.style.animation = "movingPlanetsToCenter 5s linear 7s forwards";

    // Save data for resume

    localStorage.setItem("userName", userName);
    localStorage.setItem("address", address);
    localStorage.setItem("email", email);
}



let jupitor = document.querySelector("#jupitor");
jupitor.addEventListener("animationend", function (event) {
    if (event.animationName === "movingPlanetsToCenter") {
        showMessage("Jupiter Calling! Let’s check your education.");

        askQualification();
        pauseSound();

    }
});


let qualification;
let schoolName;
let schoolYear;
function askQualification() {
    let form = document.createElement("form");
    let label = document.createElement('label');
    label.setAttribute("for", "qualification");
    createFields(form, "What is your highest qualification?", "text", "qualification", "Type your qualification");
    createSubmitButton(form);

    form.addEventListener("submit", startAskSchool);
    document.getElementById("collectInfoScene").appendChild(form);

}

function startAskSchool(event) {
    event.preventDefault();
    qualification = document.getElementsByTagName("input")[0].value;
    askSchhol();
}

function askSchhol() {
    let form = document.getElementsByTagName("form")[0];

    form.removeEventListener("submit", startAskSchool);
    form.addEventListener("submit", startRestart2);

    clearForm(form);

    createFields(form, "School/University Name?", "text", "schoolName", "Type name");
    createFields(form, "Completion Date?", "date", "schoolYear", "");
    createSubmitButton(form);

}

function startRestart2(event) {
    event.preventDefault();
    schoolName = document.getElementsByTagName("input")[0].value;
    schoolYear = document.getElementsByTagName("input")[1].value;
    restart2();
}
function restart2() {
    let form = document.getElementsByTagName("form")[0];
    clearForm(form);
    playSound();


    document.getElementById("collectInfoScene").removeChild(document.getElementsByTagName("form")[0]);
    jupitor.style.animation = "movingPlanetsFromCenter 5s linear forwards";
    let mars = document.getElementById("mars");
    mars.style.animation = "movingPlanetsToCenter 5s linear 5s forwards";
    let astronaut = document.getElementById("astronaut");
    astronaut.style.animation = "movingToCenter 5s linear 5s forwards";
    localStorage.setItem("qualification", qualification);
    localStorage.setItem("schoolName", schoolName);
    localStorage.setItem("schoolYear", schoolYear);
}


let mars = document.getElementById("mars");
mars.addEventListener("animationend", function (event) {
    if (event.animationName === "movingPlanetsToCenter") {
        showMessage("Mars Base Alert! 🚀 Tell us where you’ve worked and your space-worthy experiences")
        askWorkHistoryNum();
        pauseSound();

    }
});

function askWorkHistoryNum() {
    let form = document.createElement("form");

    createFields(form, "How many places have you worked?", "number", "num", "");
    createSubmitButton(form);

    form.addEventListener("submit", startAskWorkHistory);
    document.getElementById("collectInfoScene").appendChild(form);
}

function startAskWorkHistory(event) {
    event.preventDefault();
    num = Number(document.getElementsByTagName("input")[0].value);
    if (num <= 0) {
        askWorkExperience();
    } else {
        askWorkHistory();
    }
}

let workPlaces = [];
let workPlaceQuestions = 1;
let num = 0;

function askWorkHistory() {
    let form = document.getElementsByTagName("form")[0];

    clearForm(form);

    createFields(form, `What is your work place (${workPlaceQuestions})?`, "text", "workPlace", "Type your work place");
    createSubmitButton(form);
    form.removeEventListener("submit", startAskWorkHistory);

    form.addEventListener("submit", startAskWorkExperience);


}

function startAskWorkExperience(event) {
    event.preventDefault();
    workPlaces.push(document.getElementsByTagName("input")[0].value);
    workPlaceQuestions++;
    if (workPlaceQuestions <= num) {
        askWorkHistory();
    } else {
        askWorkExperience();
    }
}
let workExperience;
function askWorkExperience() {

    // special case for form we use textarea here and dont use create FIleds bwcuase its use input
    let form = document.getElementsByTagName("form")[0];

    let label = document.createElement('label');
    label.setAttribute("for", "experience");
    label.textContent = "What experiences helped you grow?";
    label.style.fontSize = "4vw";
    label.style.webkitTextStrokeWidth = "0.2vw";


    let inputField = document.createElement('textarea');
    inputField.placeholder = 'Write your experience';
    inputField.rows = "10",
        inputField.cols = "100",


        inputField.name = 'experience';
    inputField.id = 'experience';
    inputField.required = true;

    form.removeEventListener("submit", startAskWorkHistory);
    form.addEventListener("submit", startRestart3);

    clearForm(form);


    form.appendChild(label);
    form.appendChild(inputField);
    createSubmitButton(form);
}

function startRestart3(event) {
    event.preventDefault();
    workExperience = document.getElementsByTagName("textarea")[0].value;
    restart3();
}
function restart3() {

    let form = document.getElementsByTagName("form")[0];
    clearForm(form);
    playSound();

    document.getElementById("collectInfoScene").removeChild(document.getElementsByTagName("form")[0]);

    mars.style.animation = "movingPlanetsFromCenter 7s linear forwards";
    let astronaut = document.getElementById("astronaut");
    astronaut.style.animation = "movingFromCenter 5s linear  forwards";
    let moon = document.getElementById("moon");
    moon.style.animation = "movingPlanetsToCenter 5s linear 7s forwards";

    for (let i = 0; i < workPlaces.length; i++) {
        localStorage.setItem("workPlace" + i, workPlaces[i]);
    }
    localStorage.setItem("workExperience", workExperience);
}

let moon = document.getElementById("moon");

moon.addEventListener("animationend", function (event) {
    if (event.animationName === "movingPlanetsToCenter") {
        pauseSound();
        showMessage(" Moon Base Skill Scanner Activated! ⚡.")
        askSkills();
    }
});

function startAskSkills(event) {
    event.preventDefault();

    askSkills();



}

function askSkills() {

    let form = document.createElement("form");

    let title = document.createElement('label');
    title.textContent = "Show Case Your Skills";
    title.style.fontSize = "3vw";
    title.style.webkitTextStrokeWidth = "0.1vw";


    form.appendChild(title);
    let skills = ["Communication", "Teamwork", "Creativity", "Problem Solving", "Adaptability", "Leadership", "Time Management", "Customer Service", "Quick Learner"];

    let div = document.createElement("div");

    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.gap = "0.4vw";
    div.style.marginBottom = "0.8vw";
    div.style.transform = "translate(-50%,-50%)";
    for (let i = 0; i < skills.length; i++) {

        //special case
        let label = document.createElement('label');
        label.textContent = skills[i];
        label.style.fontSize = "1.5vw";
        label.setAttribute("for", skills[i]);
        label.style.webkitTextStrokeWidth = "0.1vw";
        let inputField = document.createElement('input');
        inputField.type = 'checkbox';
        inputField.name = "skills";
        inputField.id = skills[i];
        label.appendChild(inputField);
        div.appendChild(label);
        form.appendChild(div);

    }
    createSubmitButton(form);
    form.removeEventListener("submit", startRestart3);

    form.addEventListener("submit", startRestart4);
    document.getElementById("collectInfoScene").appendChild(form);
}
function startRestart4(event) {
    event.preventDefault();

    // Collect selected skills
    // Following code fromhttps://www.w3schools.com/js/js_json_stringify.asp

    let selectedSkills = [];
    let checkedBoxes = document.querySelectorAll('input[name="skills"]:checked');
    if (checkedBoxes.length >= 1) {
        for (let i = 0; i < checkedBoxes.length; i++) {
            selectedSkills.push(checkedBoxes[i].id); // get the skill name from the id
        }
        localStorage.setItem("skills", JSON.stringify(selectedSkills));

        restart4();
    }
    else {
        alert("Please check at least one skill to move further");
    }

}

function restart4() {
    let form = document.getElementsByTagName("form")[0];
    document.getElementById("collectInfoScene").removeChild(form);
    playSound();

    // let moon = document.querySelector("#moon");

    moon.style.animation = "movingPlanetsFromCenter 5s linear forwards";

}


//---------dream tower------------

let sun = document.getElementById("sun");
moon.addEventListener("animationend", function (event) {
    if (event.animationName === "movingPlanetsFromCenter") {
        sun.style.animation = "movingPlanetsToCenter  5s linear forwards";
    }
});

sun.addEventListener("animationend", function (event) {
    if (event.animationName === "movingPlanetsToCenter") {
        askMoto();
        showMessage(" Finally Reach at near  Sun the main center of your purpose.")

        pauseSound();

    }
});

let lifeMotto;

function askMoto() {
    let form = document.createElement("form");

    createFields(form, "Your main goal or ambition in life?", "text", "lifeMotto", "Type like: I am really ambitious about...");

    createSubmitButton(form);

    form.addEventListener("submit", finishSunScene);

    document.getElementById("collectInfoScene").appendChild(form);
}

function finishSunScene(event) {
    event.preventDefault();
    lifeMotto = document.getElementById("lifeMotto").value;
    localStorage.setItem("lifeMotto", lifeMotto);
    showSun();
}

function showSun() {
    let form = document.getElementsByTagName("form")[0];
    document.getElementById("collectInfoScene").removeChild(form);

    playSound();
    sun.style.animation = "movingPlanetsFromCenter 5s linear forwards";
    whichRocket.style.animation = "movingToRightEnd 5s linear forwards";

    let congrats = document.createElement("h1");
    congrats.textContent = "🎉Congratulations!🎉";
    congrats.classList.add("dynapuff");
    congrats.style.position = "absolute";
    congrats.style.top = "10%";
    congrats.style.left = "50%";
    congrats.style.transform = "translate(-50%, -50%)";
    congrats.style.fontSize = "6vw";
    congrats.style.color = "gold";
    congrats.style.webkitTextStroke = "0.2vw black";
    congrats.style.zIndex = "10";

    //ready
    let subtext = document.createElement("p");
    subtext.textContent = "Your resume is ready.";
    subtext.classList.add("dynapuff");
    subtext.style.position = "absolute";
    subtext.style.top = "30%";
    subtext.style.left = "50%";
    subtext.style.transform = "translate(-50%, -50%)";
    subtext.style.fontSize = "3vw";
    subtext.style.color = "white";
    subtext.style.webkitTextStroke = "0.1vw red";
    subtext.style.zIndex = "10";

    let buttonContainer = document.createElement("div");
    buttonContainer.style.position = "absolute";
    buttonContainer.style.top = "80%";
    buttonContainer.style.left = "50%";
    buttonContainer.style.width = "30%";
    buttonContainer.style.transform = "translate(-50%, -50%)";
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "3vw";
    buttonContainer.style.zIndex = "10";

    let downloadButton = document.createElement("button");
    downloadButton.textContent = "Download Website";
    downloadButton.classList.add("dynapuff");
    downloadButton.style.fontSize = "2vw";
    downloadButton.style.padding = "1vw 2vw";
    downloadButton.style.borderRadius = "1vw";
    downloadButton.style.cursor = "pointer";
    downloadButton.style.backgroundColor = "gold";
    downloadButton.style.border = "none";
    downloadButton.style.boxShadow = "0 0 15px rgba(255, 215, 0, 0.8)";

    let previewButton = document.createElement("button");
    previewButton.textContent = "Preview";
    previewButton.classList.add("dynapuff");
    previewButton.style.fontSize = "2vw";
    previewButton.style.padding = "1vw 2vw";
    previewButton.style.borderRadius = "1vw";
    previewButton.style.cursor = "pointer";
    previewButton.style.backgroundColor = "lightblue";
    previewButton.style.border = "none";
    previewButton.style.boxShadow = "0 0 15px rgba(173, 216, 230, 0.8)";

    buttonContainer.appendChild(downloadButton);
    buttonContainer.appendChild(previewButton);

    // Add all to scene
    let scene = document.getElementById("collectInfoScene");
    scene.appendChild(congrats);
    scene.appendChild(subtext);
    scene.appendChild(buttonContainer);

  

    // reference https://www.w3schools.com/jsref/met_win_print.asp
    downloadButton.addEventListener("click", function (e) {



        let newWindow = window.open("resume.html", "_blank");
        newWindow.onload = function () {
            let d = newWindow.document.getElementById("downloadPdf");
            if (d) {
                d.classList.add("notDisplay");
            }
            newWindow.print();
        };
    });


    previewButton.addEventListener("click", function (e) {
        window.location.href = "resume.html";

    })
}
