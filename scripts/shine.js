// Function to create and animate the shine
function createShine() {
  const shine = document.getElementById("shine");
  shine.style.position = "absolute";
  shine.style.width = "100px"; // Adjust the width of the shine as needed
  shine.style.height = "100px"; // Adjust the height of the shine as needed
  shine.style.background =
    "linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0))"; // White shine gradient
  shine.style.borderRadius = "50%"; // Make it round
  shine.style.animation = "shineAnimation 3s infinite"; // Adjust animation duration as needed

  // Keyframes for the animation
  const styleSheet = document.styleSheets[0];
  styleSheet.insertRule(
    `
      @keyframes shineAnimation {
        0% {
          left: -100px; // Start off-screen to the left
        }
        100% {
          left: calc(100% + 100px); // Move off-screen to the right
        }
      }
    `,
    styleSheet.cssRules.length
  );
}

// Call the function to create the shine
createShine();
