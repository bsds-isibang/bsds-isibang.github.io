// ===== DOM Elements =====
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const statNumbers = document.querySelectorAll('.stat-number');

// ===== Navbar Scroll Effect =====
let lastScrollY = window.scrollY;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    
    // Add/remove scrolled class
    if (currentScrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    // Hide/show navbar on scroll
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScrollY = currentScrollY;
});

// ===== Mobile Navigation Toggle =====
navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    });
});

// ===== Smooth Scroll for Navigation Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== Active Navigation Link Highlight =====
const sections = document.querySelectorAll('section[id]');

function highlightNavLink() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavLink);

// ===== Project Filter =====
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        
        projectCards.forEach(card => {
            const category = card.dataset.category;
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.5s ease forwards';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== Animated Counter =====
function animateCounter(element, target, duration = 2000) {
    let startTime = null;
    const startValue = 0;
    
    function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        // Easing function for smooth animation
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.floor(easeOutQuart * target);
        
        element.textContent = currentValue;
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    requestAnimationFrame(updateCounter);
}

// ===== Intersection Observer for Animations =====
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

// Observer for fade-in animations
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            fadeObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in class to elements and observe them
const animatedElements = document.querySelectorAll(
    '.section-header, .project-card, .research-item, .talk-card, .blog-card, .event-card, .feature'
);

animatedElements.forEach(el => {
    el.classList.add('fade-in');
    fadeObserver.observe(el);
});

// Observer for stat counters
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = parseInt(entry.target.dataset.count);
            animateCounter(entry.target, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ===== Parallax Effect for Hero =====
const heroContent = document.querySelector('.hero-content');
const gridPattern = document.querySelector('.grid-pattern');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    
    if (scrollY < window.innerHeight) {
        const parallaxValue = scrollY * 0.3;
        heroContent.style.transform = `translateY(${parallaxValue}px)`;
        heroContent.style.opacity = 1 - (scrollY / window.innerHeight);
        
        if (gridPattern) {
            gridPattern.style.transform = `translateY(${scrollY * 0.1}px)`;
        }
    }
});

// ===== Cursor Glow Effect =====
const createCursorGlow = () => {
    const glow = document.createElement('div');
    glow.classList.add('cursor-glow');
    glow.style.cssText = `
        position: fixed;
        width: 400px;
        height: 400px;
        background: radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: -1;
        transition: transform 0.2s ease-out;
    `;
    document.body.appendChild(glow);
    
    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX - 200 + 'px';
        glow.style.top = e.clientY - 200 + 'px';
    });
};

// ===== Math Cursor Trail Effect =====
const createMathCursorTrail = () => {
    // Mathematical symbols for the trail
    const mathSymbols = [
        '∑', '∫', '∂', '∞', 'π', '√', 'Δ', '∇', 'θ', 'λ', 
        'μ', 'σ', 'φ', 'ψ', 'ω', 'α', 'β', 'γ', 'ε', 'ζ',
        '∈', '∉', '⊂', '⊃', '∪', '∩', '∀', '∃', '≈', '≠',
        '≤', '≥', '±', '÷', '×', '∝', '∴', '∵', 'ℝ', 'ℂ',
        'ℕ', 'ℤ', 'ℚ', '⊕', '⊗', '∧', '∨', '¬', '⇒', '⇔',
        'lim', 'sup', 'inf', 'det', 'dim', 'ker', 'log', 'ln',
        'sin', 'cos', 'tan', 'exp', 'E[X]', 'P(A)', 'f(x)', 'dy/dx',
        '∮', '∬', '∭', 'ℓ', 'ℏ', '∅', '⊥', '∥'
    ];
    
    // Colors for the symbols (matching the theme)
    const colors = [
        'rgba(99, 102, 241, 0.8)',   // Primary accent
        'rgba(129, 140, 248, 0.8)',  // Secondary accent
        'rgba(167, 139, 250, 0.7)',  // Purple
        'rgba(139, 92, 246, 0.7)',   // Violet
        'rgba(192, 132, 252, 0.6)',  // Light purple
    ];
    
    let lastX = 0;
    let lastY = 0;
    let throttle = false;
    
    // Create a container for math particles
    const particleContainer = document.createElement('div');
    particleContainer.id = 'math-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);
    
    // Create a single math particle
    const createParticle = (x, y) => {
        const particle = document.createElement('span');
        const symbol = mathSymbols[Math.floor(Math.random() * mathSymbols.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = 12 + Math.random() * 14;
        const duration = 1500 + Math.random() * 1000;
        
        // Random offset from cursor
        const offsetX = (Math.random() - 0.5) * 30;
        const offsetY = (Math.random() - 0.5) * 30;
        
        // Random movement direction
        const moveX = (Math.random() - 0.5) * 100;
        const moveY = -30 - Math.random() * 70; // Float upward
        const rotation = (Math.random() - 0.5) * 360;
        
        particle.textContent = symbol;
        particle.style.cssText = `
            position: fixed;
            left: ${x + offsetX}px;
            top: ${y + offsetY}px;
            font-size: ${size}px;
            font-family: 'JetBrains Mono', 'Times New Roman', serif;
            color: ${color};
            pointer-events: none;
            z-index: 9999;
            text-shadow: 0 0 10px ${color};
            animation: mathFloat ${duration}ms ease-out forwards;
            --moveX: ${moveX}px;
            --moveY: ${moveY}px;
            --rotation: ${rotation}deg;
        `;
        
        particleContainer.appendChild(particle);
        
        // Remove particle after animation
        setTimeout(() => {
            particle.remove();
        }, duration);
    };
    
    // Handle mouse movement
    document.addEventListener('mousemove', (e) => {
        if (throttle) return;
        
        // Calculate distance moved
        const distance = Math.sqrt(
            Math.pow(e.clientX - lastX, 2) + 
            Math.pow(e.clientY - lastY, 2)
        );
        
        // Only create particles if cursor moved enough
        if (distance > 30) {
            // Create 1-2 particles
            const numParticles = 1 + Math.floor(Math.random() * 2);
            for (let i = 0; i < numParticles; i++) {
                setTimeout(() => createParticle(e.clientX, e.clientY), i * 50);
            }
            
            lastX = e.clientX;
            lastY = e.clientY;
            
            // Throttle to prevent too many particles
            throttle = true;
            setTimeout(() => throttle = false, 60);
        }
    });
    
    // Add keyframes for the animation
    const mathStyle = document.createElement('style');
    mathStyle.textContent = `
        @keyframes mathFloat {
            0% {
                opacity: 1;
                transform: translate(0, 0) rotate(0deg) scale(1);
            }
            100% {
                opacity: 0;
                transform: translate(var(--moveX), var(--moveY)) rotate(var(--rotation)) scale(0.5);
            }
        }
    `;
    document.head.appendChild(mathStyle);
};

// Only add cursor effects on desktop
if (window.innerWidth > 768) {
    createCursorGlow();
    createMathCursorTrail();
}

// ===== Card Tilt Effect =====
const tiltCards = document.querySelectorAll('.project-card, .talk-card, .blog-card');

tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ===== Typewriter Effect for Code Block =====
const codeBlock = document.querySelector('.code-content code');

if (codeBlock) {
    const originalContent = codeBlock.innerHTML;
    
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reset and animate
                codeBlock.style.opacity = '0';
                setTimeout(() => {
                    codeBlock.style.opacity = '1';
                    codeBlock.style.animation = 'typewriter 2s steps(40) forwards';
                }, 300);
                typewriterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    typewriterObserver.observe(codeBlock);
}

// ===== Staggered Animation for Cards =====
function staggerAnimation(elements, delay = 100) {
    elements.forEach((el, index) => {
        el.style.animationDelay = `${index * delay}ms`;
    });
}

staggerAnimation(document.querySelectorAll('.project-card'), 100);
staggerAnimation(document.querySelectorAll('.talk-card'), 100);
staggerAnimation(document.querySelectorAll('.research-item'), 150);

// ===== Page Load Animation =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Trigger hero animations
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-cta, .hero-stats');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        setTimeout(() => {
            el.style.transition = 'all 0.8s ease-out';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, 200 + (index * 150));
    });
});

// ===== Smooth Reveal on Scroll =====
const revealOnScroll = () => {
    const reveals = document.querySelectorAll('.fade-in:not(.visible)');
    
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Initial check

// ===== Add CSS Animation Keyframes =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes typewriter {
        from {
            max-width: 0;
            opacity: 0;
        }
        to {
            max-width: 100%;
            opacity: 1;
        }
    }
    
    .nav-link.active {
        color: var(--accent-secondary) !important;
        background: var(--accent-glow);
    }
    
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded) .hero-content > * {
        opacity: 0 !important;
    }
`;
document.head.appendChild(style);

// ===== Keyboard Navigation Support =====
document.addEventListener('keydown', (e) => {
    // Close mobile menu on Escape
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }
});

// ===== Lazy Loading Images (if any are added) =====
const lazyImages = document.querySelectorAll('img[data-src]');

if (lazyImages.length > 0) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}

// ===== Console Easter Egg =====
console.log(`
%c╔════════════════════════════════════════╗
║                                        ║
║     🎓 BSDS Community @ ISI Bangalore  ║
║                                        ║
║   Building the future with data! 📊    ║
║                                        ║
╚════════════════════════════════════════╝
`, 'color: #6366f1; font-weight: bold; font-size: 14px;');

console.log('%cInterested in joining our community? Reach out at bsds@isibang.ac.in', 'color: #a78bfa;');
