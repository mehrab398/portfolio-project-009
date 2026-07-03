

const particlesContainer = document.getElementById("particlescontainr");

function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 8 + 3;
    const position = Math.random() * 100;
    const duration = Math.random() * 15 + 10;
    const delay = Math.random() * 5;

    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${position}%`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.opacity = Math.random() * 0.2 + 0.1;

    const colors = [
        "linear-gradient(45deg, #ff4757, #ff6b81)",
        "linear-gradient(45deg, #2ed573, #1e90ff)",
        "linear-gradient(45deg, #ffa502, #ff7f50)",
        "linear-gradient(45deg, #9b59b6, #8e44ad)",
    ];
    particle.style.background = colors[Math.floor(Math.random() * colors.length)];

    particlesContainer.appendChild(particle);

    setTimeout(() => {
        if (particle.parentNode === particlesContainer) {
            particlesContainer.removeChild(particle);
        }
    }, duration * 1000 + delay * 1000);
}

function spawnParticles() {
    const particleCount = window.innerWidth < 768 ? 15 : 25;
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => createParticle(), i * 300);
    }
}

spawnParticles();
setInterval(spawnParticles, 20000);

function setupTypingAnimation() {
    const words = document.querySelectorAll(".word-list span");
    if (words.length === 0) return;

    const wordHeight = words[0].offsetHeight;
    const container = document.querySelector(".typing-words");
    container.style.height = `${wordHeight}px`;
}

window.addEventListener("load", () => {
    setTimeout(setupTypingAnimation, 100);
});

window.addEventListener("resize", setupTypingAnimation);

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = "running";
        }
    });
}, observerOptions);

document.querySelectorAll(".home-content > *").forEach((el) => {
    el.style.animationPlayState = "paused";
    observer.observe(el);
});

window.addEventListener("resize", () => {
    while (particlesContainer.firstChild) {
        particlesContainer.removeChild(particlesContainer.firstChild);
    }
    spawnParticles();
});
const logo = document.querySelector(".logo-wrapper");
if (logo) {
    logo.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}

// ================== منوی همبرگری موبایل ==================
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('nav-active');
            menuToggle.classList.toggle('active');
        });

        document.querySelectorAll('.nav-list .nav-link').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                menuToggle.classList.remove('active');
            });
        });
    } else {
        console.warn('menu-toggle یا nav پیدا نشد');
    }
});



// ================== سوییچ زبان فارسی/انگلیسی ==================
document.addEventListener('DOMContentLoaded', () => {
    const langOptions = document.querySelectorAll('.lang-option');
    const body = document.body;
    const contactSections = document.querySelectorAll('.contact-wrapper .right-section');

    const savedLang = localStorage.getItem('site-lang') || 'en';
    setLanguage(savedLang);

    langOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedLang = option.getAttribute('data-lang');
            setLanguage(selectedLang);
            localStorage.setItem('site-lang', selectedLang);
        });
    });

    function setLanguage(lang) {
        langOptions.forEach(opt => {
            opt.classList.toggle('active', opt.getAttribute('data-lang') === lang);
        });

        body.classList.toggle('lang-fa', lang === 'fa');

        document.querySelectorAll('[data-en]').forEach(el => {
            const text = el.getAttribute(lang === 'fa' ? 'data-fa' : 'data-en');
            if (text) el.innerText = text;
        });

        // اضافه یا حذف کلاس فارسی روی بخش کانتکت
        contactSections.forEach(section => {
            section.classList.toggle('right-section-fa', lang === 'fa');
        });
    }
});