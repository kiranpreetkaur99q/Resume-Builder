
  // 1. Retrieve data from localStorage
  let name = localStorage.getItem("userName") || "Your Name";
  let address = localStorage.getItem("address") || "Not Provided";
  let email = localStorage.getItem("email") || "example@email.com";
 
  let qualification = localStorage.getItem("qualification") || "Education not provided";
  let schoolName = localStorage.getItem("schoolName") || "School/University not provided";
  let schoolYear = localStorage.getItem("schoolYear") || "Year not provided";



  let workExperience = localStorage.getItem("workExperience") || "Experience not provided";
  let lifeMotto = localStorage.getItem("lifeMotto") || "Your goal or life motto";


  // Skills are stored as JSON string in localStorage
  let skills = [];
  if (localStorage.getItem("skills")) {
    try {
      skills = JSON.parse(localStorage.getItem("skills"));
    } catch (e) {
      skills = [];
    }
  }

  // Work places (stored individually as workPlace0, workPlace1, ...)
  let workPlaces = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    if (key.startsWith("workPlace")) {
      workPlaces.push(localStorage.getItem(key));
    }
  }

  // 2. Fill content in resume.html
  document.getElementById("name").textContent = name;
  // contact details
 document.getElementById("address").textContent = address || "Address not provided";
document.getElementById("email").textContent = email || "Email not provided";

  // Education
  document.getElementById("education").textContent = `${qualification} - ${schoolName} (${schoolYear})`;

  // Skills
  let skillsList = document.getElementById("skills");
  skillsList.innerHTML = ""; 
  for (let i = 0; i < skills.length; i++) {
    let li = document.createElement("li");
    li.textContent = skills[i];
    skillsList.appendChild(li);
  }

  // Work Experience
  let experienceEl = document.getElementById("experience");
  experienceEl.innerHTML = ""; // clear default
  for (let i = 0; i < workPlaces.length; i++) {
    let li = document.createElement("li");
    li.textContent = workPlaces[i];
    experienceEl.appendChild(li);
  }

  if (workExperience) {
    let li = document.createElement("li");
    li.textContent = workExperience;
    experienceEl.appendChild(li);
  }

  // Future Goals / Life Motto
  document.getElementById("goal").textContent = lifeMotto;


   let d = document.getElementById("downloadPdf");
// when buttone click then not display button in print format hide it
  d.addEventListener("click", function() {
  /* refernce https://stackoverflow.com/questions/16894683/how-to-print-html-content-on-click-of-a-button-but-not-the-page */

   d.classList.add("notDisplay");
    window.print(); 
});
