import './style.css'

const letter = document.getElementById('myLetter');
const container = document.getElementById('mailboxContainer');
const mailboxImage = document.getElementById('mailboxImage');
const sideText = document.getElementById('sideText');

let heartInterval;

// --- GESTIONE CLICK ---
letter.addEventListener('click', (event) => {
  event.preventDefault(); 
  
  // 1. STOP AI CUORI DELLO SFONDO
  clearInterval(heartInterval);
  document.querySelectorAll('.heart-particle').forEach(el => el.remove());

  // 2. START ALL'ESPLOSIONE DI LETTERINE
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

heartInterval = setInterval(createHeartRain, 50);

// --- GESTIONE BOTTONI YES / NO ---
const btnYes = document.getElementById('btnYes');
const btnNo = document.getElementById('btnNo');

// 1. Azione quando si preme YES
btnYes.addEventListener('click', (e) => {
  e.stopPropagation(); // Evita che il click chiuda la lettera o faccia altro
  alert("YEEEEEE! ❤️ Ti amo!"); // Puoi personalizzare questo messaggio
  
  // Opzionale: altra pioggia di cuori
  setInterval(createHeartRain, 100);
});

// 2. Azione "Fuggiasca" per il bottone NO
// Usiamo mouseover per renderlo più reattivo
btnNo.addEventListener('mouseover', moveButton); 
btnNo.addEventListener('click', moveButton); // Per sicurezza

function moveButton(e) {
  e.preventDefault();
  e.stopPropagation();

  // Selezioniamo l'area principale della lettera (dove c'è la foto e il testo)
  const finalContent = document.querySelector('.final-content');

  // TRUCCO: Spostiamo il bottone dentro il contenitore principale
  // così le coordinate top/left si riferiscono a tutta la lettera e non solo all'angolino
  if (btnNo.parentElement !== finalContent) {
    btnNo.style.position = 'absolute'; // Assicuriamoci che sia absolute
    btnNo.style.zIndex = '1000';       // Assicuriamoci che stia sopra a tutto
    finalContent.appendChild(btnNo);   // Lo "adottiamo" nel contenitore grande
  }

  // Calcoliamo le dimensioni dell'area disponibile (la lettera aperta)
  const containerWidth = finalContent.offsetWidth; 
  const containerHeight = finalContent.offsetHeight;
  
  // Calcoliamo le dimensioni del bottone
  const btnWidth = btnNo.offsetWidth;
  const btnHeight = btnNo.offsetHeight;

  // Calcoliamo i limiti massimi per non uscire dai bordi
  // (LarghezzaLettera - LarghezzaBottone - un po' di margine)
  const maxLeft = containerWidth - btnWidth - 20; 
  const maxTop = containerHeight - btnHeight - 20; 

  // Generiamo nuove coordinate random
  // Math.max(10, ...) assicura che non vada troppo a sinistra/in alto
  const newLeft = Math.max(10, Math.random() * maxLeft);
  const newTop = Math.max(10, Math.random() * maxTop);

  // Applichiamo
  btnNo.style.left = `${newLeft}px`;
  btnNo.style.top = `${newTop}px`;
}