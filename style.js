// Typing effect
const roles = [
  "Manager de la communication marketing intégrée",
  "Responsable marketing digital",
  "Chargé de communication digitale",
  "Créateur de contenus & Ads (Meta/Google)",
  "Data-driven & orienté KPI"
];
const typingSpan = document.querySelector(".typing");
let r = 0, c = 0, deleting = false;

function typeLoop(){
  if(!typingSpan) return;
  const current = roles[r];
  typingSpan.textContent = current.slice(0, c);

  if(!deleting && c < current.length){ c++; }
  else if(deleting && c > 0){ c--; }
  else{
    if(!deleting){ deleting = true; setTimeout(typeLoop, 1200); return; }
    deleting = false; r = (r + 1) % roles.length;
  }
  setTimeout(typeLoop, deleting ? 30 : 60);
}
typeLoop();

// Active link on scroll + reveal
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav a");
const revealables = document.querySelectorAll("section > *");

const io = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting) e.target.classList.add("visible");
  });
},{threshold: .12});
revealables.forEach(el => { el.classList.add("reveal"); io.observe(el); });

window.addEventListener("scroll", ()=>{
  let fromTop = window.scrollY + 80;
  sections.forEach(sec=>{
    if(sec.offsetTop <= fromTop && (sec.offsetTop + sec.offsetHeight) > fromTop){
      navLinks.forEach(a=>a.classList.remove("active"));
      const active = document.querySelector(`.nav a[href="#${sec.id}"]`);
      active && active.classList.add("active");
    }
  });
});

// Mobile menu
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
toggle?.addEventListener("click", ()=>{
  if(getComputedStyle(nav).display === "none"){
    nav.style.display = "flex";
    nav.style.flexDirection = "column";
    nav.style.gap = "1.2rem";
    nav.style.position = "absolute";
    nav.style.top = "64px";
    nav.style.right = "6%";
    nav.style.background = "linear-gradient(90deg, var(--main-color), blueviolet)";
    nav.style.padding = "1rem 1.4rem";
    nav.style.borderRadius = "12px";
    nav.style.border = "1px solid rgba(255,255,255,.12)";
  } else {
    nav.style.display = "";
    nav.removeAttribute("style");
  }
});

// Contact form (demo)
const form = document.getElementById("contactForm");
const statusEl = document.querySelector(".form-status");
form?.addEventListener("submit",(e)=>{
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  // 👉 Ici tu peux brancher EmailJS / API / webhook.
  console.log("Contact form data:", data);
  statusEl.textContent = "Merci ! Votre message a bien été envoyé.";
  form.reset();
});

// Year
document.getElementById("year").textContent = new Date().getFullYear();
