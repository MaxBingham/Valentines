/* ======================
   CAPTCHA LOGIC
   ====================== */

// Elements
const captchaImages = document.querySelectorAll(".captcha-img");
const verifyButton = document.getElementById("captcha-verify");
const errorText = document.getElementById("captcha-error");
const captchaContainer = document.getElementById("captcha-container");
const envelopeContainer = document.getElementById("envelope-container");

// Toggle image selection
captchaImages.forEach((img) => {
  img.addEventListener("click", () => {
    img.classList.toggle("selected");
  });
});

// Verify captcha
verifyButton.addEventListener("click", () => {
  let passed = true;

  captchaImages.forEach((img) => {
    const isCorrect = img.dataset.correct === "true";
    const isSelected = img.classList.contains("selected");

    if (isCorrect && !isSelected) passed = false;
    if (!isCorrect && isSelected) passed = false;
  });

  if (passed) {
    captchaContainer.style.display = "none";
    envelopeContainer.style.display = "block";
    errorText.textContent = "";
  } else {
    errorText.textContent = "mhmmmmm... weiß nicht.....";
  }
});

/* ======================
   LETTER / ENVELOPE LOGIC
   ====================== */

// Elements
const envelope = document.getElementById("envelope-container");
const letterContainer = document.getElementById("letter-container");
const letterWindow = document.querySelector(".letter-window");

const noBtn = document.querySelector(".no-btn");
const yesBtn = document.querySelector(".yes-btn");

const title = document.getElementById("letter-title");
const catImg = document.getElementById("letter-cat");
const buttons = document.getElementById("letter-buttons");
const finalText = document.getElementById("final-text");

// Open letter when envelope is clicked
// Open letter when envelope is clicked
envelope.addEventListener("click", () => {
  envelope.style.display = "none";
  letterContainer.style.display = "flex";

  // allow DOM to render before animation
  requestAnimationFrame(() => {
    letterWindow.classList.add("open");
  });
});

// Make NO button dodge
noBtn.addEventListener("mouseover", () => {
  const distance = 200;
  const angle = Math.random() * Math.PI * 2;

  const moveX = Math.cos(angle) * distance;
  const moveY = Math.sin(angle) * distance;

  noBtn.style.transform = `translate(${moveX}px, ${moveY}px)`;
});

// YES button logic
yesBtn.addEventListener("click", () => {
  title.textContent = "Yayyy, freue mich <3";
  catImg.src = "";

  letterWindow.classList.add("final");
  buttons.style.display = "none";
  finalText.style.display = "block";
});
