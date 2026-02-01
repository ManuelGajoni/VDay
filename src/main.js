import './style.css'

const letter = document.getElementById('myLetter');
const container = document.getElementById('mailboxContainer');
const mailboxImage = document.getElementById('mailboxImage');
const sideText = document.getElementById('sideText');

// Variabile per controllare la pioggia di cuori
let heartInterval;

// --- GESTIONE CLICK ---
letter.addEventListener('click', (event) => {
  event.preventDefault(); 
  
  // 1. STOP AI CUORI
  clearInterval(heartInterval);
  document.querySelectorAll('.heart-particle').forEach(el => el.remove());

  // 2. START ALLE LETTERE
  setInterval(createLetterParticle, 35);

  // 3. Modifiche UI
  sideText.classList.add('transparent');
  mailboxImage.classList.add('transparent');
  container.classList.add('zoomed-center');
});


// --- FUNZIONE: ESPLOSIONE LETTERE ---
function createLetterParticle() 
{
  const particle = document.createElement('div');
  particle.classList.add('mini-letter-particle');
  
  const tx = (Math.random() - 0.5) * 400; 
  const ty = (Math.random() - 0.5) * 400 - 100; 
  const r = (Math.random() - 0.5) * 360;
  
  particle.style.setProperty('--tx', `${tx}px`);
  particle.style.setProperty('--ty', `${ty}px`);
  particle.style.setProperty('--r', `${r}deg`);
  
  const duration = 2 + Math.random() * 2;
  particle.style.animation = `flyParticles ${duration}s ease-out forwards`;
  
  container.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}


// --- FUNZIONE: PIOGGIA DI CUORI ---
function createHeartRain() {
  const heart = document.createElement('div');
  heart.classList.add('heart-particle');
  
  heart.style.left = Math.random() * 100 + 'vw';
  
  const duration = 3 + Math.random() * 4; 
  const delay = Math.random() * 2; 
  
  heart.style.animation = `fallRain ${duration}s linear ${delay}s forwards`;
  
  document.body.appendChild(heart);
  
  setTimeout(() => {
    heart.remove();
  }, (duration + delay) * 1000);
}

// MODIFICA: Intervallo ridotto a 50ms per molti più cuori!
heartInterval = setInterval(createHeartRain, 50);