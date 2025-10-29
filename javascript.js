
//popup sound
const popupSound = new Audio('./sound_effects/sharp-pop-328170.mp3');
popupSound.volume = 0.7;

// PRELOADER 
// document.addEventListener("DOMContentLoaded", () => {
//   const preloader = document.getElementById("preloader");
//   const loaderText = document.getElementById("loader-text");

//   let images = document.images;
//   let totalImages = images.length;
//   let loadedImages = 0;

//   if (totalImages === 0) {
//     loaderText.textContent = "100%";
//     preloader.style.opacity = "0";
//     setTimeout(() => preloader.style.display = "none", 500);
//   } else {
//     for (let i = 0; i < totalImages; i++) {
//       let img = new Image();
//       img.onload = img.onerror = () => {
//         loadedImages++;
//         let percent = Math.floor((loadedImages / totalImages) * 100);
//         loaderText.textContent = percent + "%";

//         if (loadedImages === totalImages) {
//           setTimeout(() => {
//             preloader.style.opacity = "0";
//             setTimeout(() => preloader.style.display = "none", 500);
//           }, 300);
//         }
//       };
//       img.src = images[i].src;
//     }
//   }
// });


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
  Audio.prototype.play = function (...args) {
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




// Sidebar arrow
const container = document.querySelector(".container");
const leftArrow = document.querySelector(".left-toggle");
const rightArrow = document.querySelector(".right-toggle");

function enableSidebarToggle() {
  if (window.innerWidth > 800) {
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
  if (window.innerWidth < 800 && container.classList.contains("collapsed")) {
    container.classList.remove("collapsed");
  }
}

window.addEventListener("resize", checkScreen);

checkScreen();


// ========== Resume Popup
const popup = document.getElementById("resumePopup");
const close = document.getElementById("resumeClose");
const buttons = [document.getElementById("resumeBtn1"), document.getElementById("resumeBtn2")];

buttons.forEach((btn) => {
  if (btn) {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      popupSound.play();
      popup.style.display = "flex";
    });
  }
});

close.addEventListener("click", (e) => {
  e.stopPropagation();
  popup.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (!popup.contains(e.target) && !buttons.includes(e.target)) {
    popup.style.display = "none";
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

// ====== Popup functions for mobile ======
function openPopup(section) {
  section.classList.add("active");
}

function closePopup(section) {
  section.classList.remove("active");
}

// ====== Initial display ======
function setInitialDisplay() {
  if (window.innerWidth > 800) {
    // Desktop layout
    home.style.display = "flex";
    work.style.display = "none";
    aboutme.style.display = "none";
    contact.style.display = "none";
  } else {
    // Mobile layout: keep intro visible, popups hidden
    home.style.display = "flex";
    [work, aboutme, contact].forEach(s => s.classList.remove("active"));
  }
}
setInitialDisplay();
window.addEventListener("resize", setInitialDisplay);

// ====== Update highlighting ======
function updateHighlight(activeBtn) {
  if (window.innerWidth > 800) {
    [home_btn, work_btn, aboutme_btn, contact_btn].forEach(btn => btn.classList.remove("bg"));
    activeBtn.classList.add("bg");
  }
}
updateHighlight(home_btn);

// ====== Sidebar click handlers ======
home_btn.addEventListener("click", () => {
  if (window.innerWidth > 800) {
    // Desktop
    home.style.display = "flex";
    work.style.display = "none";
    aboutme.style.display = "none";
    contact.style.display = "none";
  } else {
    // Mobile: close all popups, keep intro visible
    [work, aboutme, contact].forEach(s => closePopup(s));
    home.style.display = "flex";
  }
  updateHighlight(home_btn);
  popupSound.play();
});

work_btn.addEventListener("click", () => {
  if (window.innerWidth > 800) {
    // Desktop
    home.style.display = "none";
    work.style.display = "block";
    aboutme.style.display = "none";
    contact.style.display = "none";
  } else {
    // Mobile popup
    openPopup(work);
    [aboutme, contact].forEach(s => closePopup(s));
    home.style.display = "flex"; // intro always visible
  }
  updateHighlight(work_btn);
  popupSound.play();
});

aboutme_btn.addEventListener("click", () => {
  if (window.innerWidth > 800) {
    // Desktop
    home.style.display = "none";
    work.style.display = "none";
    aboutme.style.display = "block";
    contact.style.display = "none";
  } else {
    // Mobile popup
    openPopup(aboutme);
    [work, contact].forEach(s => closePopup(s));
    home.style.display = "flex";
  }
  updateHighlight(aboutme_btn);
  popupSound.play();
});

contact_btn.addEventListener("click", () => {
  if (window.innerWidth > 800) {
    // Desktop
    home.style.display = "none";
    work.style.display = "none";
    aboutme.style.display = "none";
    contact.style.display = "flex";
  } else {
    // Mobile popup
    openPopup(contact);
    [work, aboutme].forEach(s => closePopup(s));
    home.style.display = "flex";
  }
  updateHighlight(contact_btn);
  popupSound.play();
});

// ====== Close arrow for all popups ======
document.querySelectorAll(".popup-handle").forEach(btn => {
  btn.addEventListener("click", () => {
    const section = btn.closest(".popup-section");
    closePopup(section);
  });
});






// Select all slideshow containers
const slideshows = document.querySelectorAll('.slideshow');

slideshows.forEach((slideshow) => {
  const slides = slideshow.querySelectorAll('img');
  const dotsContainer = slideshow.querySelector('.dots');
  let currentIndex = 0;

  // Create dots dynamically for each slideshow
  slides.forEach((_, index) => {
    const dot = document.createElement('span');
    if (index === 0) dot.classList.add('active');
    dotsContainer.appendChild(dot);
  });

  const dots = dotsContainer.querySelectorAll('span');

  // Function to show specific slide
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
      dots[i].classList.toggle('active', i === index);
    });
  }

  // Show next image
  function showNextImage() {
    currentIndex = (currentIndex + 1) % slides.length;
    showSlide(currentIndex);
  }

  // Allow manual click on dots
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentIndex = index;
      showSlide(currentIndex);
    });
  });

  // Initialize slideshow
  showSlide(currentIndex);

  // Auto-change every 3 seconds
  setInterval(showNextImage, 3000);
});





// MOBILE ALERT 
const alertBox = document.getElementById('mobile-alert');
const closeBtn = document.getElementById('close-alert');

function showMobileAlert() {
  const dismissed = sessionStorage.getItem('mobileAlertDismissed');
  if (window.innerWidth <= 800 && !dismissed) {
    alertBox.style.display = 'block';
  } else {
    alertBox.style.display = 'none';
  }
}

closeBtn.addEventListener('click', () => {
  alertBox.style.display = 'none';
  sessionStorage.setItem('mobileAlertDismissed', 'true');
});

showMobileAlert();

window.addEventListener('resize', showMobileAlert);
