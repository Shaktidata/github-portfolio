// Animate sections on scroll
const sections = document.querySelectorAll('.section-content');


function revealOnScroll() {
const triggerBottom = window.innerHeight / 5 * 4;


sections.forEach(section => {
const sectionTop = section.getBoundingClientRect().top;
if(sectionTop < triggerBottom) {
section.classList.add('visible');
}
});
}


window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);
