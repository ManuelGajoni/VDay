import './style.css'

const letter = document.getElementById('myLetter');
const container = document.getElementById('mailboxContainer');

// --- GESTIONE CLICK ---
letter.addEventListener('click', (event) => {
  event.preventDefault(); 
  // Inserisci qui il link alla pagina 2
  alert("Messaggio aperto! Andiamo alla pagina 2.");
});

// --- SISTEMA DI PARTICELLE (LETTERINE DI SFONDO) ---
function createParticle() 
{
  const particle = document.createElement('div');
  particle.classList.add('mini-letter-particle');
  
  // Assegnamo valori casuali per la direzione (CSS Variables)
  // --tx: movimento orizzontale (-100px a +100px)
  // --ty: movimento verticale (-200px a +50px - tendenzialmente verso l'alto)
  // --r: rotazione
  const tx = (Math.random() - 0.5) * 400; 
  const ty = (Math.random() - 0.5) * 400 - 100; 
  const r = (Math.random() - 0.5) * 360;
  
  particle.style.setProperty('--tx', `${tx}px`);
  particle.style.setProperty('--ty', `${ty}px`);
  particle.style.setProperty('--r', `${r}deg`);
  
  // Velocità random tra 2s e 4s
  const duration = 2 + Math.random() * 2;
  particle.style.animation = `flyParticles ${duration}s ease-out forwards`;
  
  container.appendChild(particle);
  
  // Rimuovi l'elemento quando l'animazione è finita per non intasare la memoria
  setTimeout(() => {
    particle.remove();
  }, duration * 1000);
}

// Inizia a generare particelle dopo 1 secondo
setTimeout(() => 
  {
  // Crea una nuova lettera ogni 200 millisecondi
  setInterval(createParticle, 35);
}, 1000);