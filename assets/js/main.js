
// main.js
// Handles small UI animations using GSAP and interactions.

document.addEventListener('DOMContentLoaded', () => {
  // simple entrance animation
  gsap.from('.hero-inner', {y: 40, opacity:0, duration:1, ease:'power3.out'});
  gsap.from('.logo', {y:-10, opacity:0, duration:0.8, delay:0.2});
  gsap.from('nav a', {y:-6, opacity:0, duration:0.6, stagger:0.08, delay:0.3});

  // card hover effects
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      gsap.to(card, {scale:1.03, duration:0.28});
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, {scale:1, duration:0.28});
    });
  });

  // smooth scroll for nav
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if(target){
        window.scrollTo({top: target.offsetTop - 64, behavior:'smooth'});
      }
    });
  });
});
