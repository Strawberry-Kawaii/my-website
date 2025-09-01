//popup sound
const popupSound = new Audio('./sound_effects/sharp-pop-328170.mp3');
popupSound.volume = 0.3;

// PRELOADER 
document.addEventListener("DOMContentLoaded", () => {
  const preloader = document.getElementById("preloader");
  const loaderText = document.getElementById("loader-text");

  let images = document.images;
  let totalImages = images.length;
  let loadedImages = 0;

  if (totalImages === 0) {
    loaderText.textContent = "100%";
    preloader.style.opacity = "0";
    setTimeout(() => preloader.style.display = "none", 500);
  } else {
    for (let i = 0; i < totalImages; i++) {
      let img = new Image();
      img.onload = img.onerror = () => {
        loadedImages++;
        let percent = Math.floor((loadedImages / totalImages) * 100);
        loaderText.textContent = percent + "%";

        if (loadedImages === totalImages) {
          setTimeout(() => {
            preloader.style.opacity = "0";
            setTimeout(() => preloader.style.display = "none", 500);
          }, 300);
        }
      };
      img.src = images[i].src;
    }
  }
});


// Sound 
const soundToggle = document.querySelector('.sound');
const volumeOnIcon = soundToggle.querySelector('.uil-volume');
const volumeOffIcon = soundToggle.querySelector('.uil-volume-off');

let isMuted = false; // Track mute state

// Function to mute/unmute all audio elements
function toggleMuteAll() {
    // Mute/unmute all <audio> elements
    document.querySelectorAll('audio').forEach(audio => {
        audio.muted = isMuted;
    });

    // Override Audio.prototype.play for JS-triggered sounds
    const originalPlay = Audio.prototype.play;
    Audio.prototype.play = function(...args) {
        if (!isMuted) {
            return originalPlay.apply(this, args);
        }
        return Promise.resolve(); // Do nothing if muted
    };

    // Toggle icons
    if (isMuted) {
        volumeOnIcon.style.display = 'none';
        volumeOffIcon.style.display = 'inline-block';
    } else {
        volumeOnIcon.style.display = 'inline-block';
        volumeOffIcon.style.display = 'none';
    }
}

soundToggle.addEventListener('click', () => {
    isMuted = !isMuted;
    toggleMuteAll();
});



// Dark mode button
var moonSound = new Audio('./sound_effects/moon.wav');
moonSound.preload = 'auto';

//Light Mode Button
var sunSound = new Audio('./sound_effects/sun.mp3');
sunSound.preload = 'auto';

// Dark and Light Mode 
const darkmode = document.querySelector(".uil-moon");
const lightmode = document.querySelector(".uil-sun");
const body = document.getElementsByTagName("body")[0];

window.addEventListener("DOMContentLoaded", () => {
  const mode = localStorage.getItem("theme");

  if (mode === "light") {
    body.classList.remove("darkmode");
    darkmode.style.display = "inline";
    lightmode.style.display = "none";
  } else {
    body.classList.add("darkmode");
    lightmode.style.display = "inline";
    darkmode.style.display = "none";
  }
});


darkmode.addEventListener("click", () => {
  moonSound.cloneNode(true).play();

  body.classList.add("darkmode");
  localStorage.setItem("theme", "dark"); 
  darkmode.style.display = "none";
  lightmode.style.display = "inline";
});

// Light mode button
lightmode.addEventListener("click", () => {
  sunSound.cloneNode(true).play();

  body.classList.remove("darkmode");
  localStorage.setItem("theme", "light"); 
  lightmode.style.display = "none";
  darkmode.style.display = "inline";
});



// Navbar 
const burger = document.getElementById("burger");
const navLinks = document.getElementById("nav-links");

// Toggle navbar when burger is clicked
burger.addEventListener("click", () => {
  if (window.innerWidth <= 900) {
    // Toggle between hidden and visible
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
    }
  } else {
    // On bigger screens, always show navbar
    navLinks.style.display = "flex";
  }

  sound_effect.play();
});

// Select all links inside navLinks
const links = navLinks.querySelectorAll(".sound-effect"); // all <a> links inside nav-links

links.forEach(link => {
  link.addEventListener("click", () => {
    if (window.innerWidth <= 900) {
      // Hide navbar after clicking a link
      navLinks.style.display = "none";
    }
  });
});





// Sidebar arrow
const container = document.querySelector(".container");
const leftArrow = document.querySelector(".left-toggle");
const rightArrow = document.querySelector(".right-toggle");

function enableSidebarToggle() {
    if (window.innerWidth > 900) {
        rightArrow.addEventListener("click", rightClickHandler);
        leftArrow.addEventListener("click", leftClickHandler);
    } else {
        rightArrow.removeEventListener("click", rightClickHandler);
        leftArrow.removeEventListener("click", leftClickHandler);
    }
}

// Handlers
function rightClickHandler() {
    container.classList.toggle("collapsed");
    rightArrow.style.display = "none";
    leftArrow.style.display = "inline";
}

function leftClickHandler() {
    container.classList.toggle("collapsed");
    leftArrow.style.display = "none";
    rightArrow.style.display = "inline";
}

enableSidebarToggle();


window.addEventListener("resize", enableSidebarToggle);

// Media
function checkScreen() {
    if (window.innerWidth < 900 && container.classList.contains("collapsed")) {
        container.classList.remove("collapsed");
    }
}

window.addEventListener("resize", checkScreen);

checkScreen();


// ========== Resume Popup
const resumeBtn = document.getElementById("resumeBtn");
const resumePopup = document.getElementById("resumePopup1");
const resumeClose = document.getElementById("resumeClose1");

resumeBtn.addEventListener("click", () => {
  popupSound.play();
  resumePopup.style.display = "block";
});

resumeClose.addEventListener("click", () => {
  resumePopup.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === resumePopup) {
    resumePopup.style.display = "none";
  }
});





// Sidebar info
const home_btn = document.querySelector("#home");
const work_btn = document.querySelector("#myWork");
const aboutme_btn = document.querySelector("#aboutme");
const contact_btn = document.querySelector("#contactme");

const home = document.querySelector(".intro-container");
const work = document.querySelector(".work");
const aboutme = document.querySelector(".aboutme");
const contact = document.querySelector(".contact");

// Sound pop effect
const buttons = document.querySelectorAll(".sound-effect");
var sound_effect = new Audio('./sound_effects/mouse-click-290204.mp3');

home_btn.classList.add("bg");

// Home
home_btn.addEventListener("click", () => {
  home.style.display = "flex";
  work.style.display = "none";
  aboutme.style.display = "none";
  contact.style.display = "none";

  home_btn.classList.add("bg");
  work_btn.classList.remove("bg");
  aboutme_btn.classList.remove("bg");
  contact_btn.classList.remove("bg");
  sound_effect.play();
});

// Work 
work_btn.addEventListener("click", () => {
  home.style.display = "none";
  work.style.display = "block";
  aboutme.style.display = "none";
  contact.style.display = "none";

  home_btn.classList.remove("bg");
  work_btn.classList.add("bg");
  aboutme_btn.classList.remove("bg");
  contact_btn.classList.remove("bg");
  sound_effect.play();
});

// About Me 
aboutme_btn.addEventListener("click", () => {
  home.style.display = "none";
  work.style.display = "none";
  aboutme.style.display = "block";
  contact.style.display = "none";

  home_btn.classList.remove("bg");
  work_btn.classList.remove("bg");
  aboutme_btn.classList.add("bg");
  contact_btn.classList.remove("bg");
  sound_effect.play();
});

// Contact Me 
contact_btn.addEventListener("click", () => {
  home.style.display = "none";
  work.style.display = "none";
  aboutme.style.display = "none";
  contact.style.display = "flex";

  home_btn.classList.remove("bg");
  work_btn.classList.remove("bg");
  aboutme_btn.classList.remove("bg");
  contact_btn.classList.add("bg");
  sound_effect.play();
});



// ========== Image popup 
const popup = document.getElementById("popupWindow");
const popupImg = document.getElementById("popupImg");
const popupClose = document.querySelectorAll(".popup-close");
const popupHeader = document.getElementById("popupHeader");

// Open popup when illustration is clicked
document.querySelectorAll(".art_work img").forEach(img => {
  img.addEventListener("click", () => {
    popupSound.play();
    popup.style.display = "block";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popupImg.src = img.src;
  });
});

// Close popup (for all close buttons)
document.querySelectorAll(".popup-close").forEach(btn => {
  btn.addEventListener("click", () => {
    sound_effect.play();
    sound_effect.volume = 0.6;
    btn.closest(".popup-window").style.display = "none";
  });
});



// MOBILE ALERT 
const alertBox = document.getElementById('mobile-alert');
const closeBtn = document.getElementById('close-alert');

function showMobileAlert() {
    const dismissed = sessionStorage.getItem('mobileAlertDismissed');
    if (window.innerWidth <= 900 && !dismissed) {
        alertBox.style.display = 'block';
    }else {
        alertBox.style.display = 'none'; 
    }
}

closeBtn.addEventListener('click', () => {
    alertBox.style.display = 'none';
    sessionStorage.setItem('mobileAlertDismissed', 'true');
});

showMobileAlert();

window.addEventListener('resize', showMobileAlert);
