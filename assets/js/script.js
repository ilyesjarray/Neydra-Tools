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

    // Real USB Detection using WebUSB API
    async function checkTethering() {
        try {
            // Request USB device
            const device = await navigator.usb.requestDevice({
                filters: [{ vendorId: 0x1234 }] // Specify a vendorId for your phone (replace with real value)
            });

            if (device) {
                // If a device is detected, update UI
                successIcon.classList.remove("hidden");
                linkingScreen.classList.add("hidden");
                toolsMenu.classList.remove("hidden");

                // Update phone information (mocked; replace with actual data)
                phoneName.textContent = `Phone: ${device.productName}`;
                phoneBattery.textContent = "Battery: 85%"; // Replace with real battery data if available
            }
        } catch (error) {
            console.error("No device connected or detection failed", error);
            setTimeout(checkTethering, 2000); // Retry after 2 seconds
        }
    }

    // Start tethering detection
    checkTethering();
});
