// Function to check if the user's IP is blacklisted
async function checkBlacklist() {
    try {
        const response = await fetch("blacklistedips.txt");
        const blacklistText = await response.text();
        const blacklistedEntries = blacklistText
            .split("\n\n")
            .map((entry) => {
                const lines = entry.split("\n");
                const ip = lines.find(line => line.startsWith("IP:"))?.split(":")[1]?.trim();
                const reason = lines.find(line => line.startsWith("REASON:"))?.split(":")[1]?.trim();
                const time = lines.find(line => line.startsWith("TIME:"))?.split(":")[1]?.trim();
                return { ip, reason, time };
            });

        const userIP = await fetch("https://api64.ipify.org?format=json")
            .then((response) => response.json())
            .then((data) => data.ip);

        const currentUserEntry = blacklistedEntries.find(entry => entry.ip === userIP);

        if (currentUserEntry) {
            const reasonElement = document.getElementById('reason');
            const timeElement = document.getElementById('time');
            reasonElement.textContent = `You have been blocked at Flexa Group for ${currentUserEntry.reason}.`;
            timeElement.textContent = currentUserEntry.time ? `You will be unblocked on ${currentUserEntry.time}.` : "You will not get unblocked.";
        } else {
            // User not found in blacklist
            // Redirect or handle as needed
        }
    } catch (error) {
        console.error("Error checking blacklist:", error);
    }
}

// Call the checkBlacklist function when the page loads
checkBlacklist();
