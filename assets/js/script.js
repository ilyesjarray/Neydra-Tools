document.addEventListener("DOMContentLoaded", () => {
    const launchScreen = document.getElementById("launch-screen");
    const linkingScreen = document.getElementById("linking-screen");
    const toolsMenu = document.getElementById("tools-menu");
    const successIcon = document.getElementById("success-icon");
    const phoneName = document.getElementById("phone-name");
    const phoneBattery = document.getElementById("phone-battery");

    // Flag to prevent repeated transitions
    let currentScreen = 'launch'; // Tracks the current visible screen
    let deviceDetected = false; // Flag to track if a device has been detected

    // Transition from Launch Screen to Linking Screen
    const showLinkingScreen = () => {
        if (currentScreen === 'launch') {
            launchScreen.classList.add("hidden");
            linkingScreen.classList.remove("hidden");
            currentScreen = 'linking';
            console.log("Transitioned to linking screen");
        }
    };

    // Transition to Tools Menu
    const showToolsMenu = () => {
        if (currentScreen === 'linking') {
            linkingScreen.classList.add("hidden");
            toolsMenu.classList.remove("hidden");
            currentScreen = 'tools';
            console.log("Transitioned to tools menu");
        }
    };

    // Simulate Launch Screen Animation
    setTimeout(() => {
        showLinkingScreen();
    }, 3000); // Reduced time for faster transitions

    // Polling mechanism to check for connected devices
    async function checkDevices() {
        try {
            const devices = await navigator.mediaDevices.enumerateDevices();
            console.log("Connected devices:", devices);

            if (!deviceDetected && devices.length > 0) {
                const newDevice = devices[devices.length - 1]; // Simplified logic
                console.log("New device detected:", newDevice);

                // Update UI on successful detection
                successIcon.classList.remove("hidden");
                phoneName.textContent = `Phone: Connected Device`;
                phoneBattery.textContent = "Battery: Unknown"; // Replace with real data if possible

                deviceDetected = true; // Stop further polling
                showToolsMenu();
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
