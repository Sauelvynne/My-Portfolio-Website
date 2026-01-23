// Get elements
const aboutIcon = document.getElementById('about-icon');
const linksIcon = document.getElementById('links-icon');
const worksIcon = document.getElementById('works-icon');
const contactsIcon = document.getElementById('contacts-icon');

const aboutPopup = document.getElementById('about-popup');
const linksPopup = document.getElementById('links-popup');
const worksPopup = document.getElementById('works-popup');
const contactsPopup = document.getElementById('contacts-popup');

const popupCloses = document.querySelectorAll('.popup-close');
const emailButton = document.getElementById('email-button');
const clickSound = document.getElementById('click-sound');



// Function to play sound (WIP)
function playSound() {
    if (!clickSound) return;
    clickSound.currentTime = 0;
    clickSound.play().catch(() => {});
}

// Function to show popup
function showPopup(popup) {
    const popupWindow = popup.querySelector('.popup-window');
    popupWindow.style.left = '50%';
    popupWindow.style.top = '50%';
    popup.style.display = 'block';
    setTimeout(() => {
        popup.classList.add('show');
    }, 10); 
    playSound();
}

// Function to hide popup
function hidePopup(popup) {
    const popupWindow = popup.querySelector('.popup-window');
    popupWindow.style.left = '50%';
    popupWindow.style.top = '50%';
    popup.classList.remove('show');
    playSound();
    setTimeout(() => {
        popup.style.display = 'none';
    }, 300);
}

// Function to minimize popup
function minimizePopup(popup) {
    const popupWindow = popup.querySelector('.popup-window');
    popupWindow.classList.toggle('minimized');
    playSound();
}

// Event listeners for icons
aboutIcon.addEventListener('click', () => showPopup(aboutPopup));
linksIcon.addEventListener('click', () => showPopup(linksPopup));
worksIcon.addEventListener('click', () => showPopup(worksPopup));
contactsIcon.addEventListener('click', () => showPopup(contactsPopup));

// Event listeners for close buttons
popupCloses.forEach(close => {
    close.addEventListener('click', (e) => {
        const popup = e.target.closest('.popup');
        hidePopup(popup);
    });
});

// Event listener for email button
emailButton.addEventListener('click', () => {
    window.location.href = 'mailto:jevinloya@gmail.com';
    playSound();
});

// Click outside popup to close
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('popup')) {
        hidePopup(e.target);
    }
});

// Minimize functionality (discontinued)
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        document.querySelectorAll('.popup.show').forEach(popup => hidePopup(popup));
        closeLightbox();
    }
});

// Lightbox 
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');

let animationPaused = false;

// Lightbox functions

document.addEventListener('click', (e) => {
    const img = e.target.closest('.gallery-image');
    if (!img) return;

    e.stopPropagation();

    animationPaused = true;
    lightboxImage.src = img.src;
    lightboxCaption.textContent = img.alt;
    lightbox.classList.add('show');
    playSound();
});

function openLightbox(src, caption) {
    animationPaused = true;
    lightboxImage.src = src;
    lightboxCaption.textContent = caption;
    lightbox.classList.add('show');
    playSound();
}

function closeLightbox() {
    animationPaused = false;
    lightbox.classList.remove('show');
    playSound();
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});



// FIREFLIES BACKGROUND ANIMATION all credit goes to Michal from CodePen.io
const canvas = document.getElementById("canvas");

let c = init("canvas"),
    w = canvas.width = window.innerWidth,
    h = canvas.height = window.innerHeight;
//initiation

class firefly{
  constructor(){
    this.x = Math.random()*w;
    this.y = Math.random()*h;
    this.s = Math.random()*2;
    this.ang = Math.random()*2*Math.PI;
    this.v = this.s*this.s/4;
  }
  move(){
    this.x += this.v*Math.cos(this.ang);
    this.y += this.v*Math.sin(this.ang);
    this.ang += Math.random()*20*Math.PI/180-10*Math.PI/180;
  }
  show(){
    c.beginPath();
    c.arc(this.x,this.y,this.s,0,2*Math.PI);
    c.fillStyle="#fddba3";
    c.fill();
  }
}

let f = [];

function draw() {
  if(f.length < 100){
    for(let j = 0; j < 10; j++){
     f.push(new firefly());
  }
     }
  //animation
  for(let i = 0; i < f.length; i++){
    f[i].move();
    f[i].show();
    if(f[i].x < 0 || f[i].x > w || f[i].y < 0 || f[i].y > h){
       f.splice(i,1);
       }
  }
}

let mouse = {};
let last_mouse = {};

canvas.addEventListener(
  "mousemove",
  function(e) {
    last_mouse.x = mouse.x;
    last_mouse.y = mouse.y;

    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  },
  false
);
function init(elemid) {
  let canvas = document.getElementById(elemid),
    c = canvas.getContext("2d"),
    w = (canvas.width = window.innerWidth),
    h = (canvas.height = window.innerHeight);
  c.fillStyle = "rgba(30,30,30,1)";
  c.fillRect(0, 0, w, h);
  return c;
}

window.requestAnimFrame = (function() {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
      window.setTimeout(callback);
    }
  );
});

function loop() {
  window.requestAnimFrame(loop);
  c.clearRect(0, 0, w, h);
  draw();
}

window.addEventListener("resize", function() {
  (w = canvas.width = window.innerWidth),
  (h = canvas.height = window.innerHeight);
  loop();
});


function loop() {
  if (!animationPaused) {
    c.clearRect(0, 0, w, h);
    draw();
  }
  requestAnimationFrame(loop);
}

loop();

