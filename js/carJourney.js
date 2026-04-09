
// Change car image based on saved gender selection

let whichCar = document.getElementById("car");

window.addEventListener("load", function () {
    resetStorageKeepGender();
});
if (localStorage.getItem("gender") === "male") {
    whichCar.src = "../images/boyCar.png";
}else {
    whichCar.src = "../images/girlCar.png";
}

// POLICE / FIrst Stop
// Start asking questions after policeman animation is finished
let policeMan = document.querySelector("#policeMan");
let road = document.querySelector("#road");

policeMan.addEventListener("animationend", function (event) {

    if (event.animationName === "movingToCenter") {
        askUserName();
        pauseSound();
    }
});

// FORM 1: USER NAME 
let userName;
let address;
let email;

function askUserName() {
    road.style.animation = "none";
    road.style.left = "0%";
    let form = document.getElementsByTagName("form")[0];
    form.style.opacity = 1;
    // First form submits to the address question

    form.addEventListener("submit", startAskAddress);
}

function startAskAddress(event) {
    event.preventDefault();
    userName = document.getElementsByTagName("input")[0].value;
    askAddress();
}
// FORM 2: ADDRESS
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

// FORM 3: EMAIL
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
// Save email then start next stop transition
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
    road.style.animation = "movingRoad 5s linear infinite";
    road.style.left = "100%";
    policeMan.style.animation = "movingFromCenter 5s linear forwards";
    let policeOffice = document.querySelector("#policeOffice");
    policeOffice.style.animation = "movingBuildingFromCenter 5s linear forwards";
    let school = document.getElementById("school");
    school.style.animation = "movingBuildingToCenter 5s linear 5s forwards";
    // Save data for resume

    localStorage.setItem("userName", userName);
    localStorage.setItem("address", address);
    localStorage.setItem("email", email);

}
// 2nd Stop SCHOOL BUILDING ASK EDUCATION

let school = document.querySelector("#school");

school.addEventListener("animationend", function (event) {
    if (event.animationName === "movingBuildingToCenter") {
        askQualification();
        pauseSound();
    }
});


let qualification;
let schoolName;
let schoolYear;
// Ask highest qualification

function askQualification() {
    road.style.animation = "none";
    road.style.left = "0%";
    let form = document.createElement("form");

    createFields(form, "What is your highest qualification?", "text", "qualification", "Type your qualification");
    createSubmitButton(form);

    form.addEventListener("submit", startAskSchool);
    document.getElementById("collectInfoScene").appendChild(form);
}
// Move to next question (school name)

function startAskSchool(event) {
    event.preventDefault();
    qualification = document.getElementsByTagName("input")[0].value;
    askSchhol();
}
// Ask school name + year

function askSchhol() {
    let form = document.getElementsByTagName("form")[0];

    form.removeEventListener("submit", startAskSchool);
    form.addEventListener("submit", startRestart2);

    clearForm(form);

    createFields(form, "School/University Name?", "text", "schoolName", "Type name");
    createFields(form, "Completion Date?", "date", "schoolYear", "");
    createSubmitButton(form);


}

// Save school info + move to next stop
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

    // Remove form from the scene
    document.getElementById("collectInfoScene").removeChild(form);

    // Restart animations
    road.style.animation = "movingRoad 5s linear infinite";
    road.style.left = "100%";

    let school = document.getElementById("school");
    school.style.animation = "movingBuildingFromCenter 5s linear forwards";

    let office = document.getElementById("office");
    office.style.animation = "movingBuildingToCenter 5s linear 5s forwards";

    // Save data for resume
    localStorage.setItem("qualification", qualification);
    localStorage.setItem("schoolName", schoolName);
    localStorage.setItem("schoolYear", schoolYear);

}

// 3rd stop OFFICE ARRIVES ASK WORK HISTORY

let office = document.getElementById("office");
office.addEventListener("animationend", function (event) {
    if (event.animationName === "movingBuildingToCenter") {

        askWorkHistoryNum();
        pauseSound();
    }
});

// Ask how many workplaces

function askWorkHistoryNum() {
    road.style.animation = "none";
    road.style.left = "0%";
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

// Ask workplace names one by one
function askWorkHistory() {
    let form = document.getElementsByTagName("form")[0];

    clearForm(form);

    createFields(form, `What is your work place (${workPlaceQuestions})?`, "text", "workPlace", "Type your work place");
    createSubmitButton(form);
    form.removeEventListener("submit", startAskWorkHistory);

    form.addEventListener("submit", startAskWorkExperience);
}

// Collect workplace(s), then move to experience textarea
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
    let form = document.getElementsByTagName("form")[0];

    form.removeEventListener("submit", startAskWorkHistory);
    form.addEventListener("submit", startRestart3);

    clearForm(form);

    // label + textarea (special case)
    let label = document.createElement('label');
    label.textContent = "What experiences helped you grow?";
    label.style.fontSize = "4vw";
    label.style.webkitTextStrokeWidth = "0.2vw";

    let textarea = document.createElement('textarea');
    textarea.id = "experience";
    textarea.name = "experience";
    textarea.placeholder = "Write your experience";
    textarea.rows = "10";
    textarea.cols = "100";
    textarea.required = true;

    form.append(label, textarea);
    createSubmitButton(form);
}
// Save and trigger next stop

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
    // Move office away, bring skills stop in

    road.style.animation = "movingRoad 5s linear infinite";

    road.style.left = "100%";
    office.style.animation = "movingBuildingFromCenter 5s linear forwards";
    for (let i = 0; i < workPlaces.length; i++) {
        localStorage.setItem("workPlace" + i, workPlaces[i]);
    }
    localStorage.setItem("workExperience", workExperience);
    let talentShow = document.getElementById("talentShow");
    talentShow.style.animation = "movingBuildingToCenter 5s linear 5s forwards";


}

//4th SKILL(Talentshow) Stop 
let talentShow = document.getElementById("talentShow");

talentShow.addEventListener("animationend", function (event) {
    if (event.animationName === "movingBuildingToCenter") {
        pauseSound();
        askSkills();
    }
});

function startAskSkills(event) {
    event.preventDefault();

    askSkills();



}
// Display list of skills with checkboxes

function askSkills() {
    road.style.animation = "none";
    road.style.left = "0%";
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

// Save skills → move to Dream Tower

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
    road.style.animation = "movingRoad 5s linear infinite";
    road.style.left = "100%";
    playSound();
    talentShow.style.animation = "movingBuildingFromCenter 5s linear forwards";

}


//5th Stop 
let dreamTower = document.getElementById("dreamTower");

talentShow.addEventListener("animationend", function (event) {
    if (event.animationName === "movingBuildingFromCenter") {
        dreamTower.style.animation = "movingBuildingToCenter 5s linear  forwards";

    }
});
// When Dream Tower arrives → ask dream

dreamTower.addEventListener("animationend", function (event) {
    if (event.animationName === "movingBuildingToCenter") {
        pauseSound();
        askDream();
    }
});

let lifeMotto;
// Ask user's dream/life motto

function askDream() {
    road.style.animation = "none";
    road.style.left = "0%";

    let form = document.createElement("form");

    createFields(
        form, "You've reached the Dream Tower! What is your goal or life motto?", "text",
        "lifeMotto", "Type a few short lines (e.g. “To be a developer is like…”)"
    );

    createSubmitButton(form);

    form.addEventListener("submit", endScene);

    document.getElementById("collectInfoScene").appendChild(form);


}

function endScene(event) {
    event.preventDefault();
    lifeMotto = document.getElementsByTagName("input")[0].value;
    localStorage.setItem("lifeMotto", lifeMotto);
    showCongratulations();
}

// Final congratulation scene

function showCongratulations() {
    let form = document.getElementsByTagName("form")[0];
    if (form) form.remove();
    playSound();
    road.style.animation = "movingRoad 5s linear infinite";
    road.style.left = "100%";
    dreamTower.style.animation = "movingBuildingFromCenter 5s linear forwards";
    whichCar.style.animation = "movingToRightEnd 5s linear forwards";
    // Congratulations
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
    buttonContainer.style.top = "70%";
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
