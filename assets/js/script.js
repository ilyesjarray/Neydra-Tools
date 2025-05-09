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

    // Polling mechanism to check for connected devices
    let previousDevices = [];

    async function checkDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log("Connected devices:", devices);

            // Check for new devices
            if (devices.length > previousDevices.length) {
                const newDevice = devices[devices.length - 1]; // Simplified logic
                console.log("New device detected:", newDevice);

                // Update UI on successful detection
                successIcon.classList.remove("hidden");
                linkingScreen.classList.add("hidden");
                toolsMenu.classList.remove("hidden");

                // Update phone information (mocked for simplicity)
                phoneName.textContent = `Phone: Connected Device`;
                phoneBattery.textContent = "Battery: Unknown"; // Replace with real data if possible
            }

            // Update the previous device list
            previousDevices = devices;
        } catch (error) {
            console.error("Error detecting devices:", error);
        } finally {
            // Poll again after 2 seconds
            setTimeout(checkDevices, 2000);
        }
    }

    // Start polling for devices
    checkDevices();
});
