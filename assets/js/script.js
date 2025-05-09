document.addEventListener("DOMContentLoaded", () => {
    const launchScreen = document.getElementById("launch-screen");
    const linkingScreen = document.getElementById("linking-screen");
    const toolsMenu = document.getElementById("tools-menu");
    const successIcon = document.getElementById("success-icon");
    const phoneName = document.getElementById("phone-name");
    const phoneBattery = document.getElementById("phone-battery");

    // Transition from Launch Screen to Linking Screen
    setTimeout(() => {
        launchScreen.classList.add("hidden"); // Hide launch screen
        linkingScreen.classList.remove("hidden"); // Show linking screen
        console.log("Transitioned to linking screen");
    }, 3000); // Reduced animation time for better user experience

    // Polling mechanism to check for connected devices
    let deviceDetected = false; // Flag to ensure polling stops after detection

    async function checkDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log("Connected devices:", devices);

            if (!deviceDetected && devices.length > 0) {
                const newDevice = devices[devices.length - 1]; // Simplified logic
                console.log("New device detected:", newDevice);

                // Update UI on successful detection
                successIcon.classList.remove("hidden");
                linkingScreen.classList.add("hidden");
                toolsMenu.classList.remove("hidden");

                // Update phone information (mocked for simplicity)
                phoneName.textContent = `Phone: Connected Device`;
                phoneBattery.textContent = "Battery: Unknown"; // Replace with real data if possible

                deviceDetected = true; // Stop further polling
                console.log("Device detected, polling stopped");
            }
        } catch (error) {
            console.error("Error detecting devices:", error);
        } finally {
            // Poll again after 2 seconds if no device detected
            if (!deviceDetected) {
                setTimeout(checkDevices, 2000);
            }
        }
    }

    // Start polling for devices
    checkDevices();
});
