/* script.js: the BEHAVIOUR of the page (interactivity).
   Plain JavaScript only, no libraries. */
 
/* 1. Mobile menu: open/close with the hamburger button */
const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
 
function setMenu(open) {
  siteNav.classList.toggle('open', open);
  // Tells screen readers whether the menu is expanded
  navToggle.setAttribute('aria-expanded', String(open));
}
 
navToggle.addEventListener('click', () => {
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  setMenu(!isOpen);
});
 
// Close the menu after choosing a link
siteNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => setMenu(false));
});
 
// Close the menu with the Escape key (keyboard accessibility)
document.addEventListener('keydown', (event) => {
  // Only react if the menu is actually open
  if (event.key === 'Escape' && siteNav.classList.contains('open')) {
    setMenu(false);
    navToggle.focus();
  }
});
 
/* 2. Highlight today's row in the opening hours table.
   getDay() gives 0 (Sunday) to 6 (Saturday), matching data-day in the HTML. */
const today = new Date().getDay();
const todayRow = document.querySelector('.hours-table tr[data-day="' + today + '"]');
if (todayRow) {
  todayRow.classList.add('today');
}
 
/* 3. Keep the footer year up to date automatically */
document.getElementById('year').textContent = new Date().getFullYear();
 
/* 4. Contact form: validate the fields and show a friendly message.
   NOTE: this is a DEMO. A static site cannot send email or store data.
   A real business would need a proper form service or server arranged
   with the client (and an adult's help with privacy rules). */
const form = document.getElementById('contactForm');
const statusMessage = document.getElementById('formStatus');
 
// Shows or clears an error under one field
function setError(input, errorId, message) {
  document.getElementById(errorId).textContent = message;
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}
 
form.addEventListener('submit', (event) => {
  event.preventDefault(); // stop the page from reloading
 
  const name = form.elements['name'];
  const email = form.elements['email'];
  const message = form.elements['message'];
  let firstBadField = null;
 
  // Check each field and remember the first problem
  if (name.value.trim() === '') {
    setError(name, 'nameError', 'Please enter your name.');
    firstBadField = firstBadField || name;
  } else {
    setError(name, 'nameError', '');
  }
 
  // Simple email pattern: something@something.something
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email.value.trim())) {
    setError(email, 'emailError', 'Please enter a valid email address.');
    firstBadField = firstBadField || email;
  } else {
    setError(email, 'emailError', '');
  }
 
  if (message.value.trim().length < 5) {
    setError(message, 'messageError', 'Please write a short message.');
    firstBadField = firstBadField || message;
  } else {
    setError(message, 'messageError', '');
  }
 
  if (firstBadField) {
    statusMessage.textContent = '';
    firstBadField.focus(); // move the keyboard to the first problem
    return;
  }
 
  statusMessage.textContent = 'Thanks! This is a demo form, so nothing was actually sent.';
  form.reset();
});
