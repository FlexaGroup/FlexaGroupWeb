document.addEventListener("DOMContentLoaded", function () {
  // Call the checkBlacklist function when the page loads
  checkBlacklist();

  // JavaScript to toggle the visibility of the footer based on scroll position
  window.onscroll = function () {
    showHideFooter();
  };
  showHideFooter();

  // Function to toggle the footer visibility based on scroll position
  function showHideFooter() {
    var footer = document.getElementById("footer");
    var hasScroll = document.body.scrollHeight > window.innerHeight;

    if (hasScroll) {
      var isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight;
      footer.style.opacity = isAtBottom ? 1 : 0;
    } else {
      footer.style.opacity = 1;
    }
  }

  // Periodically reload the page every 5 minutes
  setInterval(function () {
    location.reload();
  }, 300000);

  // Tailwind CSS dark mode configuration
  tailwind.config = {
    darkMode: "class", // class/media, here we use class to enable manually dark mode
  };

  // Manage dark mode based on user preference
  if (localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }

  // Change the icons inside the button based on previous settings
  var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
  var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

  if (localStorage.getItem("color-theme") === "dark" ||
    (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    themeToggleLightIcon.classList.remove("hidden");
  } else {
    themeToggleDarkIcon.classList.remove("hidden");
  }

  var themeToggleBtn = document.getElementById("theme-toggle");

  themeToggleBtn.addEventListener("click", function () {
    themeToggleDarkIcon.classList.toggle("hidden");
    themeToggleLightIcon.classList.toggle("hidden");

    // Add a class to html element to trigger transition
    document.documentElement.classList.add("theme-transition");

    if (localStorage.getItem("color-theme")) {
      if (localStorage.getItem("color-theme") === "light") {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      } else {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      }
    } else {
      if (document.documentElement.classList.contains("dark")) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("color-theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("color-theme", "dark");
      }
    }

    // Remove the transition class after 3 seconds
    setTimeout(function () {
      document.documentElement.classList.remove("theme-transition");
    }, 3000);
  });

  // Prevent right-click context menu and certain key combinations
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  document.onkeydown = function (e) {
    if (e.keyCode == 123 || (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) ||
      (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) || (e.ctrlKey && e.keyCode == "U".charCodeAt(0))) {
      return false;
    }
  };

  // Function to check for browser extensions (only works in certain contexts)
  function checkExtensions() {
    // List of extensions to check
    const blockedExtensions = [
      "https://chromewebstore.google.com/detail/noscript/doojmbjmlfjjnbmnoijecmcbfeoakpjm",
    ];

    // Get current browser extensions (Chrome specific, requires permissions)
    if (chrome && chrome.management) {
      chrome.management.getAll(function (extensions) {
        const isBlocked = extensions.some((extension) => blockedExtensions.includes(extension.optionsUrl || extension.id));

        // Redirect if blocked extension is detected
        if (isBlocked) {
          window.location.href = "blocked.html";
        }
      });
    }
  }

  checkExtensions();

  // Other functions and configurations remain unchanged
});

async function checkBlacklist() {
  try {
    const response = await fetch("blacklistedips.txt");
    const blacklistText = await response.text();
    const blacklistedEntries = blacklistText.split("\n\n").map((entry) => {
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
