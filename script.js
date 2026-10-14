/**
 * Daniella Jade Baldo — portfolio interactions.
 * Features: accessible mobile navigation, light/dark theme toggle,
 * active section navigation, and automatic footer year.
 */
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('.theme-icon');
const rootElement = document.documentElement;
const currentYear = document.getElementById('currentYear');

function updateThemeButton(isDark) {
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeToggle.title = isDark ? 'Switch to light theme' : 'Switch to dark theme';
    themeIcon.innerHTML = isDark
        ? '<circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path>'
        : '<path d="M20.2 15.2A8.4 8.4 0 0 1 8.8 3.8 8.5 8.5 0 1 0 20.2 15.2Z"></path>';
}
function setMenuOpen(isOpen) {
    navMenu.classList.toggle('is-open', isOpen);
    menuToggle.classList.toggle('is-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
}
menuToggle.addEventListener('click', () => setMenuOpen(!navMenu.classList.contains('is-open')));
navLinks.forEach((link) => {
    link.addEventListener('click', () => {
        setMenuOpen(false);
        navLinks.forEach((item) => item.classList.remove('is-active'));
        link.classList.add('is-active');
    });
});
window.addEventListener('resize', () => { if (window.innerWidth > 680) setMenuOpen(false); });
themeToggle.addEventListener('click', () => {
    const isDark = rootElement.getAttribute('data-theme') !== 'dark';
    if (isDark) rootElement.setAttribute('data-theme', 'dark');
    else rootElement.removeAttribute('data-theme');
    updateThemeButton(isDark);
});
const observedSections = document.querySelectorAll('main section[id]');
if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
        });
    }, { rootMargin: '-35% 0px -55% 0px' });
    observedSections.forEach((section) => sectionObserver.observe(section));
}
if (currentYear) currentYear.textContent = new Date().getFullYear();
