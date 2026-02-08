// Get elements
const questionContainer = document.getElementById('questionContainer');
const yesContainer = document.getElementById('yesContainer');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');

let noBtnClickCount = 0;

// Handle Yes button click
yesBtn.addEventListener('click', function() {
    questionContainer.classList.add('hidden');
    yesContainer.classList.remove('hidden');
    
    // Create confetti effect
    createConfetti();
});

// Handle No button click - make it harder to click
noBtn.addEventListener('click', function(e) {
    e.preventDefault();
    noBtnClickCount++;
    
    // Make the No button move away
    const btn = e.target;
    const container = questionContainer;
    
    const containerRect = container.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();
    
    // Calculate random position within container
    const maxX = containerRect.width - btnRect.width - 40;
    const maxY = containerRect.height - btnRect.height - 40;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btn.style.position = 'absolute';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
    
    // Make Yes button bigger and more appealing
    const yesBtnSize = 1 + (noBtnClickCount * 0.1);
    yesBtn.style.transform = `scale(${yesBtnSize})`;
    
    // Change No button text
    if (noBtnClickCount === 1) {
        noBtn.textContent = 'Are you sure?';
    } else if (noBtnClickCount === 2) {
        noBtn.textContent = 'Really?? 🥺';
    } else if (noBtnClickCount === 3) {
        noBtn.textContent = 'Please?? 💔';
    } else if (noBtnClickCount >= 4) {
        noBtn.textContent = 'I\'ll be sad... 😢';
        noBtn.style.fontSize = '0.8em';
    }
});

// Hover effect for No button - also move away
noBtn.addEventListener('mouseenter', function(e) {
    if (noBtnClickCount > 0) {
        const btn = e.target;
        const container = questionContainer;
        
        const containerRect = container.getBoundingClientRect();
        const btnRect = btn.getBoundingClientRect();
        
        const maxX = containerRect.width - btnRect.width - 40;
        const maxY = containerRect.height - btnRect.height - 40;
        
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;
        
        btn.style.position = 'absolute';
        btn.style.left = randomX + 'px';
        btn.style.top = randomY + 'px';
    }
});

// Confetti effect
function createConfetti() {
    const colors = ['#ff1493', '#ff69b4', '#ff6b9d', '#ffc3d4', '#ffb6c1'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = '-10px';
            confetti.style.opacity = '1';
            confetti.style.borderRadius = '50%';
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            
            document.body.appendChild(confetti);
            
            const fallDuration = 3 + Math.random() * 2;
            const horizontalMovement = (Math.random() - 0.5) * 200;
            
            confetti.animate([
                { 
                    transform: 'translateY(0) translateX(0) rotate(0deg)',
                    opacity: 1
                },
                { 
                    transform: `translateY(${window.innerHeight}px) translateX(${horizontalMovement}px) rotate(${Math.random() * 360}deg)`,
                    opacity: 0
                }
            ], {
                duration: fallDuration * 1000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });
            
            setTimeout(() => {
                confetti.remove();
            }, fallDuration * 1000);
        }, i * 30);
    }
}
