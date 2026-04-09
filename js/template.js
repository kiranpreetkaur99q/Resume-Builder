
        document.addEventListener("click", function(e){
            if(e.target.tagName =="BUTTON"){
                let buttonAudio = document.getElementById("buttonClick");
                buttonAudio.currentTime = 0;
                buttonAudio.play();
            }
            });
        let prevB = document.getElementById("prevBtn");

        function goBackTogender() {
            window.location.href = "gender.html";
        }

         function goToCarTheme() {
            window.location.href = "CarIntro.html";
        }

        function goToGalaxyTheme() {
            window.location.href = "GalaxyIntro.html";
        }

        prevB.onclick = goBackTogender;

