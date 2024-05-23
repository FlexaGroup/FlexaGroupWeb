document.addEventListener("DOMContentLoaded", function () {
    // Call the checkBlacklist function when the page loads
    checkBlacklist();

    function triggerAlert(text) {
        const originalTitle = document.title;
        document.title = "ALERT - " + originalTitle;

        const alertSound = document.getElementById('alert-sound');

        const playSound = () => {
            alertSound.currentTime = 0;
            alertSound.play();
        };

        playSound(); // Play sound initially

        const confirmation = confirm(`Alert: ${text}`);
        if (!confirmation) {
            // Repeat sound every 3 seconds
            const intervalId = setInterval(() => {
                playSound();
            }, 3000);

            // Restore original page title when alert is dismissed
            window.addEventListener('focus', () => {
                document.title = originalTitle;
                clearInterval(intervalId); // Stop repeating sound
            }, { once: true });
        } else {
            alertSound.pause();
            alertSound.currentTime = 0;
            document.title = originalTitle; // Restore original page title
        }
    }

    // Create a Broadcast Channel for inter-window communication
    const broadcastChannel = new BroadcastChannel('website-alert');

    // Function to broadcast the alert message to all connected browsers
    function sendWebsiteAlert(text) {
        broadcastChannel.postMessage(text);
    }

    // Overwrite the console object with a custom handler
    const originalConsole = console;
    console = new Proxy(originalConsole, {
        get(target, prop) {
            if (prop === 'alert') {
                return (text) => {
                    triggerAlert(text);
                    sendWebsiteAlert(text); // Broadcast the alert to other browsers
                };
            }
            return target[prop];
        }
    });

    // Add an audio element for playing the alert sound
    const alertSoundElement = document.createElement('audio');
    alertSoundElement.id = 'alert-sound';
    alertSoundElement.src = 'alert.mp3';
    alertSoundElement.preload = 'auto';
    document.body.appendChild(alertSoundElement);

    // Listen for messages from other browsers
    broadcastChannel.onmessage = function (event) {
        triggerAlert(event.data);
    };
});
