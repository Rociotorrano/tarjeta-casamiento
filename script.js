/**
 * Wedding Invitation Script - Premium Edition
 */

// Curtain Opening Functionality
function openCurtain() {
    const curtainContainer = document.getElementById('curtain-container');
    const mainContent = document.getElementById('main-content');

    curtainContainer.classList.add('opened');

    // Fade out welcoming text immediately to avoid overlap
    const curtainContent = document.querySelector('.curtain-content');
    if (curtainContent) curtainContent.style.opacity = '0';

    // Show main content immediately so it's visible behind the curtains
    mainContent.classList.remove('hidden');
    document.body.style.overflowY = 'auto'; // Allow scrolling
    initScrollReveal();

    // Completely remove curtains after animation finishes
    setTimeout(() => {
        curtainContainer.style.display = 'none';
    }, 2500);
}

// Background Stars Generation
function createStars() {
    const container = document.getElementById('stars-container');
    const starCount = 150;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';

        const size = Math.random() * 2 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;

        star.style.top = `${Math.random() * 100}%`;
        star.style.left = `${Math.random() * 100}%`;

        const duration = Math.random() * 3 + 2;
        star.style.setProperty('--duration', `${duration}s`);
        star.style.animationDelay = `${Math.random() * 5}s`;

        container.appendChild(star);
    }
}

// Scroll Reveal Logic
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        for (let i = 0; i < reveals.length; i++) {
            const windowHeight = window.innerHeight;
            const elementTop = reveals[i].getBoundingClientRect().top;
            const elementVisible = 150;

            if (elementTop < windowHeight - elementVisible) {
                reveals[i].classList.add('active');
            }
        }
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check initially
}

// Countdown Timer
function initCountdown() {
    // Target: March 20, 2027 at 6:00 PM
    const targetDate = new Date('2027-03-20T18:00:00').getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').innerHTML = "<h2>¡Llegó el gran día!</h2>";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').innerText = days.toString().padStart(2, '0');
        document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
        document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
    };

    updateTimer();
    const timerInterval = setInterval(updateTimer, 1000);
}

// Copy to Clipboard
function copyText(elementId) {
    const text = document.getElementById(elementId).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("¡Copiado al portapapeles! ✨");
    }).catch(err => {
        console.error('Error al copiar: ', err);
    });
}

// Rising Bubbles Effect
function createBubbles() {
    const container = document.getElementById('bubbles-container');
    const bubbleCount = 30; // Balanced count

    for (let i = 0; i < bubbleCount; i++) {
        spawnBubble(container);
    }
}

function spawnBubble(container) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';

    const size = Math.random() * 60 + 20 + 'px';
    bubble.style.width = size;
    bubble.style.height = size;

    bubble.style.left = Math.random() * 100 + '%';

    // Set duration and delay
    const duration = Math.random() * 10 + 10;
    const delay = -Math.random() * duration; // Negative delay to start mid-animation

    bubble.style.setProperty('--duration', duration + 's');
    bubble.style.animationDelay = delay + 's';

    container.appendChild(bubble);
}

// RSVP Form Handling
function initRSVP() {
    const form = document.getElementById('rsvp-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerText = "ENVIANDO...";
        submitBtn.disabled = true;

        const formData = new FormData(form);

        fetch(form.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Google Apps Script requires this for cross-domain POST
        }).then(() => {
            form.innerHTML = `
                <div class="success-message reveal active" style="padding: 2rem;">
                    <h3 class="section-title">¡Gracias por confirmar!</h3>
                    <p>Tu respuesta ha sido guardada</p>
                </div>
            `;
        }).catch(err => {
            console.error('Error:', err);
            alert("Hubo un problema al enviar. Por favor intenta de nuevo.");
            submitBtn.innerText = "ENVIAR";
            submitBtn.disabled = false;
        });
    });
}

// Initialize components on load
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createBubbles();
    initCountdown();
    initRSVP();
});

