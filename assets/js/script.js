document.addEventListener("DOMContentLoaded", () => {
    const launchScreen = document.getElementById("launch-screen");
    const linkingScreen = document.getElementById("linking-screen");
    const toolsMenu = document.getElementById("tools-menu");
    const successIcon = document.getElementById("success-icon");
    const phoneName = document.getElementById("phone-name");
    const phoneBattery = document.getElementById("phone-battery");
  
    // Simulate Launch Screen Animation
    setTimeout(() => {
      launchScreen.classList.add("hidden");
      linkingScreen.classList.remove("hidden");
    }, 3000);
  
    // Simulate USB Detection
    let tetheringDetected = false;
  
    function checkTethering() {
      if (!tetheringDetected) {
        // Simulate successful tethering after 5 seconds
        setTimeout(() => {
          tetheringDetected = true;
          successIcon.classList.remove("hidden");
          setTimeout(() => {
            linkingScreen.classList.add("hidden");
            toolsMenu.classList.remove("hidden");
            phoneName.textContent = "Phone: NEYDRA Device";
            phoneBattery.textContent = "Battery: 85%";
          }, 2000);
        }, 5000);
      }
    }
  
    checkTethering();
  });