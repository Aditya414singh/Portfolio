// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const themeIcon = themeToggle.querySelector('i');

const currentTheme = localStorage.getItem('theme') || 'light';
body.classList.add(currentTheme);
updateThemeIcon(currentTheme);

themeToggle.addEventListener('click', () => {
    const newTheme = body.classList.contains('dark') ? 'light' : 'dark';
    body.classList.remove('light', 'dark');
    body.classList.add(newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Typing Animation for Hero Subtitle
const roles = [
    "Full Stack Developer",
    "Backend Engineer",
    "Blockchain Researcher",
    "B.Tech @ IIIT Lucknow",
    "Competitive Programmer"
];

const subtitle = document.querySelector('.hero-subtitle');
let roleIndex = 0;
let charIndex = 0;
let typing = true;

function typeRole() {
    const currentRole = roles[roleIndex];

    if (typing) {
        subtitle.textContent = currentRole.slice(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentRole.length) {
            typing = false;
            setTimeout(typeRole, 1000); // pause before deleting
        } else {
            setTimeout(typeRole, 50); // typing speed
        }
    } else {
        subtitle.textContent = currentRole.slice(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
            typing = true;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, 300); // pause before typing next
        } else {
            setTimeout(typeRole, 50); // deleting speed
        }
    }
}

window.addEventListener('load', () => {
    typeRole();
});


// Smooth Scrolling Navigation
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        const headerHeight = document.querySelector('.header').offsetHeight;
        const elementPosition = element.offsetTop - headerHeight;
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    }
}

const navLinkElements = document.querySelectorAll('.nav-link');
navLinkElements.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

// Header scroll effect
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    header.style.background = body.classList.contains('dark')
        ? scrollTop > 100 ? 'rgba(15, 23, 42, 0.95)' : 'rgba(15, 23, 42, 0.9)'
        : scrollTop > 100 ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.9)';
    header.style.backdropFilter = 'blur(10px)';
    lastScrollTop = scrollTop;
});

// Active nav link highlight
const sections = document.querySelectorAll('section[id]');
function highlightActiveSection() {
    const scrollPosition = window.scrollY + 100;
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}
window.addEventListener('scroll', highlightActiveSection);

// Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Mobile menu toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinksContainer = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    const icon = mobileMenuToggle.querySelector('i');
    const isActive = navLinksContainer.classList.contains('active');
    icon.className = isActive ? 'fas fa-times' : 'fas fa-bars';
    navLinksContainer.style.display = isActive ? 'flex' : '';
    navLinksContainer.style.flexDirection = isActive ? 'column' : '';
    navLinksContainer.style.position = isActive ? 'absolute' : '';
    navLinksContainer.style.top = isActive ? '100%' : '';
    navLinksContainer.style.left = isActive ? '0' : '';
    navLinksContainer.style.right = isActive ? '0' : '';
    navLinksContainer.style.backgroundColor = isActive ? (body.classList.contains('dark') ? '#1e293b' : '#ffffff') : '';
    navLinksContainer.style.padding = isActive ? '1rem' : '';
    navLinksContainer.style.boxShadow = isActive ? '0 4px 6px rgba(0, 0, 0, 0.1)' : '';
    navLinksContainer.style.gap = isActive ? '1rem' : '';
});

navLinksContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-link')) {
        navLinksContainer.classList.remove('active');
        const icon = mobileMenuToggle.querySelector('i');
        icon.className = 'fas fa-bars';
        navLinksContainer.style.display = '';
        navLinksContainer.style.flexDirection = '';
        navLinksContainer.style.position = '';
        navLinksContainer.style.top = '';
        navLinksContainer.style.left = '';
        navLinksContainer.style.right = '';
        navLinksContainer.style.backgroundColor = '';
        navLinksContainer.style.padding = '';
        navLinksContainer.style.boxShadow = '';
        navLinksContainer.style.gap = '';
    }
});

// Resume download
function downloadResume() {
    alert("Resume download feature would be implemented here with the actual resume file");
}

// Contact Links
function handleContactClick(type) {
    if (type === 'email') alert("Email contact information would be provided here");
    else if (type === 'linkedin') alert("LinkedIn profile would be provided here");
}

// Add active nav style
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
    @media (max-width: 768px) {
        .nav-links.active {
            display: flex !important;
        }
    }
`;
document.head.appendChild(style);

// Reveal on scroll
function revealOnScroll() {
    const reveals = document.querySelectorAll('.animate-on-scroll');
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', revealOnScroll);

// Parallax
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    hero.style.transform = `translate3d(0, ${rate}px, 0)`;
});

// Load animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    setTimeout(() => {
        revealOnScroll();
    }, 100);
});

// Throttling
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
window.addEventListener('scroll', throttle(() => {
    highlightActiveSection();
    revealOnScroll();
}, 10));
