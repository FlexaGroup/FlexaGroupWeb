// Function to check if an element is in the viewport
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to trigger the animation on page load
function triggerAnimationOnPageLoad() {
  var developers = document.querySelectorAll(".devs");

  developers.forEach(function (image) {
    if (isInViewport(image) && !image.classList.contains("fly-in")) {
      image.classList.add("fly-in");
    }
  });
}

// Call triggerAnimationOnPageLoad once when the page loads to trigger animation on page load
window.addEventListener("load", triggerAnimationOnPageLoad);

// Initial check for elements in the viewport on page load
document.addEventListener("DOMContentLoaded", function () {
  triggerAnimationOnPageLoad();
});

// Function to check if an element is in the viewport
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to trigger the animation on scrolling
function triggerAnimationOnScroll() {
  var developers = document.querySelectorAll(".devs");

  developers.forEach(function (image) {
    if (isInViewport(image) && !image.classList.contains("fly-in")) {
      image.classList.add("fly-in");
    }
  });
}

// Call triggerAnimationOnScroll whenever the window is scrolled
window.addEventListener("scroll", triggerAnimationOnScroll);

// Initial check for elements in the viewport on page load
document.addEventListener("DOMContentLoaded", function () {
  triggerAnimationOnScroll();
});

function showPopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.opacity = "0";
  popup.style.display = "block";

  // Triggering reflow before adding the fade-in class
  void popup.offsetWidth;

  popup.style.transition = "opacity 1s";
  popup.style.opacity = "1";
}

function closePopup(popupId) {
  var popup = document.getElementById(popupId);
  popup.style.transition = "opacity 2s";
  popup.style.opacity = "0";
  setTimeout(() => {
    popup.style.display = "none";
  }, 1900);
}
