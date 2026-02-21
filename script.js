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



//BEE BACKGROUND ANIMATION 
// Improved Fireflies background animation by Michal from CodePen.io

const BEE_SIZE = 40;
const MAX_BEES = 20;

let w = window.innerWidth;
let h = window.innerHeight;

function applyBeeStyles(el) {
    el.style.position = 'fixed';
    el.style.width = BEE_SIZE + 'px';
    el.style.height = BEE_SIZE + 'px';
    el.style.pointerEvents = 'none';
    el.style.zIndex = '1';
    el.style.imageRendering = 'pixelated';
    el.style.display = 'none';
}

class Bee {
    constructor(randomStart = false) {
        this.elRight = document.createElement('img');
        this.elRight.src = 'images/rightbee.gif';
        applyBeeStyles(this.elRight);
        document.body.appendChild(this.elRight);

        this.elLeft = document.createElement('img');
        this.elLeft.src = 'images/leftbee.gif';
        applyBeeStyles(this.elLeft);
        document.body.appendChild(this.elLeft);

        this.facingRight = null;
        this.reset(randomStart);
    }

    reset(randomStart = false) {
        if (randomStart) {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
        } else {
            const edge = Math.floor(Math.random() * 4);
            if (edge === 0)      { this.x = Math.random() * w; this.y = -BEE_SIZE; }
            else if (edge === 1) { this.x = w + BEE_SIZE;      this.y = Math.random() * h; }
            else if (edge === 2) { this.x = Math.random() * w; this.y = h + BEE_SIZE; }
            else                 { this.x = -BEE_SIZE;          this.y = Math.random() * h; }
        }

        this.speed = 0.5 + Math.random() * 1.5;
        this.ang = Math.random() * 2 * Math.PI;
        this.vx = this.speed * Math.cos(this.ang);
        this.vy = this.speed * Math.sin(this.ang);

        this.wobbleAngle  = Math.random() * Math.PI * 2;
        this.wobbleSpeed  = 0.03 + Math.random() * 0.04;
        this.wobbleAmount = 0.08 + Math.random() * 0.1;

        this.facingRight = null;
        this.updateSprite();
        this.updatePosition();
    }

    updateSprite() {
        const shouldFaceRight = this.vx >= 0;
        if (shouldFaceRight !== this.facingRight) {
            this.facingRight = shouldFaceRight;
            this.elRight.style.display = this.facingRight ? 'block' : 'none';
            this.elLeft.style.display  = this.facingRight ? 'none'  : 'block';
        }
    }

    updatePosition() {
        const left = (this.x - BEE_SIZE / 2) + 'px';
        const top  = (this.y - BEE_SIZE / 2) + 'px';
        this.elRight.style.left = left;
        this.elRight.style.top  = top;
        this.elLeft.style.left  = left;
        this.elLeft.style.top   = top;
    }

    move() {
        this.wobbleAngle += this.wobbleSpeed;
        this.ang += Math.sin(this.wobbleAngle) * this.wobbleAmount;

        this.vx = this.speed * Math.cos(this.ang);
        this.vy = this.speed * Math.sin(this.ang);

        this.x += this.vx;
        this.y += this.vy;

        this.updateSprite();
        this.updatePosition();
    }

    isOffScreen() {
        return (
            this.x < -BEE_SIZE * 3 ||
            this.x > w + BEE_SIZE * 3 ||
            this.y < -BEE_SIZE * 3 ||
            this.y > h + BEE_SIZE * 3
        );
    }
}

const bees = [];
for (let i = 0; i < MAX_BEES; i++) {
    bees.push(new Bee(true));
}

function beeLoop() {
    if (!animationPaused) {
        for (let i = 0; i < bees.length; i++) {
            bees[i].move();
            if (bees[i].isOffScreen()) {
                bees[i].reset(false);
            }
        }
    }
    requestAnimationFrame(beeLoop);
}

window.addEventListener('resize', function () {
    w = window.innerWidth;
    h = window.innerHeight;
});

beeLoop();


//canvas image
const canvas = document.getElementById('canvas');
const c = canvas.getContext('2d');

const bgImage = new Image();
bgImage.src = 'images/grassbg.png';

function paintBackground() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    if (bgImage.complete && bgImage.naturalWidth > 0) {
        const pattern = c.createPattern(bgImage, 'repeat');
        c.fillStyle = pattern;
    } else {
        // Fallback colour
        c.fillStyle = '#008080';
    }
    c.fillRect(0, 0, canvas.width, canvas.height);
}

// Paint once image is loaded, and on every resize
bgImage.onload = paintBackground;
paintBackground();
window.addEventListener('resize', paintBackground);


//BGMusic Toggle
const bgMusic = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');
const musicIcon = document.getElementById('music-icon');
const musicTitle = document.getElementById('music-title');

bgMusic.volume = 0.4;

let musicStarted = false;
let titleTimeout = null;

function showMusicTitle() {
    // Clear any existing fade-out timer
    clearTimeout(titleTimeout);
    musicTitle.classList.add('show');

    // Fade out after 3 seconds
    titleTimeout = setTimeout(() => {
        musicTitle.classList.remove('show');
    }, 3000);
}

document.addEventListener('click', () => {
    if (!musicStarted) {
        bgMusic.play().catch(() => {});
        musicIcon.src = 'images/Sound-On.png';
        musicStarted = true;
        showMusicTitle();
    }
});

musicToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
        bgMusic.play();
        musicIcon.src = 'images/Sound-On.png';
        showMusicTitle();
    } else {
        bgMusic.pause();
        musicIcon.src = 'images/Sound-Mute.png';
        // Hide title immediately when muted
        clearTimeout(titleTimeout);
        musicTitle.classList.remove('show');
    }
    playSound();
});
