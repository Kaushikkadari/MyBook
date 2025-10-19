// Smooth scrolling for navigation links with animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 100%;
                height: 100%;
                background: rgba(108, 92, 231, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-effect 0.6s ease-out;
                pointer-events: none;
            `;
            this.style.position = 'relative';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
            
            // Special "going down" effect for Explore Now button
            if (this.classList.contains('btn-primary')) {
                createScrollDownEffect();
            }
            
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Create "going down" visual effect
function createScrollDownEffect() {
    // Create overlay with down arrow animation
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Create multiple descending arrows
    for (let i = 0; i < 5; i++) {
        const arrow = document.createElement('div');
        arrow.innerHTML = '<i class="fas fa-chevron-down"></i>';
        arrow.style.cssText = `
            position: absolute;
            font-size: 3rem;
            color: rgba(255, 255, 255, 0.8);
            animation: scroll-down-arrow 1s ease-out forwards;
            animation-delay: ${i * 0.1}s;
            top: ${20 + i * 15}%;
        `;
        overlay.appendChild(arrow);
    }
    
    document.body.appendChild(overlay);
    
    // Remove overlay after animation
    setTimeout(() => overlay.remove(), 1500);
}

// Add ripple animation and scroll down effect
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-effect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    @keyframes scroll-down-arrow {
        0% {
            transform: translateY(0);
            opacity: 0;
        }
        20% {
            opacity: 1;
        }
        100% {
            transform: translateY(200px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 5px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Pause book rotation on hover
const bookContainer = document.querySelector('.book-container');
if (bookContainer) {
    bookContainer.addEventListener('mouseenter', () => {
        bookContainer.style.animationPlayState = 'paused';
    });

    bookContainer.addEventListener('mouseleave', () => {
        bookContainer.style.animationPlayState = 'running';
    });
}

// Enhanced Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) scale(1)';
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all detail cards and other elements with stagger effect
document.querySelectorAll('.detail-card').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px) scale(0.9)';
    el.style.transition = `all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.2}s`;
    observer.observe(el);
});

document.querySelectorAll('.download-card, .author-content').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(40px) scale(0.95)';
    el.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
    observer.observe(el);
});

// Create enhanced floating particles
function createParticles() {
    const particles = document.querySelector('.particles');
    if (!particles) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 100 + 50;
        particle.style.position = 'absolute';
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.borderRadius = '50%';
        particle.style.background = `rgba(255, 255, 255, ${Math.random() * 0.1})`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.filter = 'blur(2px)';
        particles.appendChild(particle);
    }
}

createParticles();

// Add twinkling stars effect
function createStars() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    for (let i = 0; i < 50; i++) {
        const star = document.createElement('div');
        star.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: white;
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${Math.random() * 3 + 2}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        hero.appendChild(star);
    }
}

createStars();

// Add twinkle animation
const starStyle = document.createElement('style');
starStyle.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0.3; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.5); }
    }
`;
document.head.appendChild(starStyle);

// Enhanced Download button animation with burst effect
const downloadBtn = document.querySelector('.btn-download');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
        // Create burst effect
        for (let i = 0; i < 12; i++) {
            const burst = document.createElement('div');
            const angle = (i * 30) * Math.PI / 180;
            burst.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: white;
                border-radius: 50%;
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                z-index: 10;
            `;
            this.appendChild(burst);
            
            // Animate burst
            burst.animate([
                { transform: 'translate(-50%, -50%) scale(1)', opacity: 1 },
                { 
                    transform: `translate(calc(-50% + ${Math.cos(angle) * 60}px), calc(-50% + ${Math.sin(angle) * 60}px)) scale(0)`,
                    opacity: 0 
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            });
            
            setTimeout(() => burst.remove(), 600);
        }
        
        // Don't prevent default to allow the download
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Preparing Download...</span>';
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-check"></i><span>Download Started!</span>';
            this.style.background = 'linear-gradient(135deg, #26de81 0%, #20bf6b 100%)';
        }, 500);
        
        setTimeout(() => {
            this.innerHTML = '<i class="fas fa-download"></i><span>Download Now</span>';
            this.style.background = '';
        }, 3000);
    });
}

// Enhanced parallax effect with multiple layers
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            const scrolled = window.pageYOffset;
            
            // Parallax for hero content
            const parallaxElements = document.querySelectorAll('.hero-content');
            parallaxElements.forEach(el => {
                const speed = 0.5;
                el.style.transform = `translateY(${scrolled * speed}px)`;
            });
            
            // Parallax for book
            const book = document.querySelector('.book-container');
            if (book) {
                const rect = book.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                if (scrollPercent > 0 && scrollPercent < 1) {
                    const moveY = (1 - scrollPercent) * 30;
                    book.style.transform = `translateY(${moveY}px)`;
                }
            }
            
            // Parallax for detail cards
            const cards = document.querySelectorAll('.detail-card');
            cards.forEach((card, index) => {
                const rect = card.getBoundingClientRect();
                const scrollPercent = (window.innerHeight - rect.top) / window.innerHeight;
                if (scrollPercent > 0 && scrollPercent < 1) {
                    const moveY = (1 - scrollPercent) * 20 * (index % 2 === 0 ? 1 : -1);
                    card.style.transform = `translateY(${moveY}px)`;
                }
            });
            
            ticking = false;
        });
        ticking = true;
    }
});

// Enhanced 3D interaction for book with smooth easing
const book3d = document.querySelector('.book-3d');
const bookContainer = document.querySelector('.book-container');

if (book3d && bookContainer) {
    let isHovering = false;
    let targetRotation = { x: 0, y: 0 };
    let currentRotation = { x: 0, y: 0 };
    let animationFrame = null;

    // Smooth animation loop
    function animate() {
        const ease = 0.1;
        
        currentRotation.x += (targetRotation.x - currentRotation.x) * ease;
        currentRotation.y += (targetRotation.y - currentRotation.y) * ease;
        
        if (isHovering) {
            bookContainer.style.transform = 
                `rotateX(${currentRotation.x}deg) rotateY(${currentRotation.y}deg) scale(1.15)`;
            animationFrame = requestAnimationFrame(animate);
        }
    }
    
    book3d.addEventListener('mouseenter', () => {
        isHovering = true;
        bookContainer.style.animationPlayState = 'paused';
        bookContainer.style.transition = 'none';
        animate();
    });
    
    book3d.addEventListener('mouseleave', () => {
        isHovering = false;
        if (animationFrame) {
            cancelAnimationFrame(animationFrame);
        }
        
        bookContainer.style.transition = 'transform 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
        bookContainer.style.transform = '';
        bookContainer.style.animationPlayState = 'running';
    });
    
    book3d.addEventListener('mousemove', (e) => {
        if (!isHovering) return;
        
        const rect = book3d.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        targetRotation.y = (x - 0.5) * 60; // -30 to 30 degrees
        targetRotation.x = (0.5 - y) * 30; // -15 to 15 degrees
    });
}

// Add sparkle effect on book
function createSparkles() {
    const book3d = document.querySelector('.book-3d');
    if (!book3d) return;
    
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 4 + 2;
        const duration = Math.random() * 2 + 1;
        
        sparkle.style.cssText = `
            position: absolute;
            left: ${x}%;
            top: ${y}%;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(255, 255, 255, 1) 0%, rgba(108, 92, 231, 0.5) 50%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            animation: sparkle ${duration}s ease-out forwards;
            z-index: 100;
        `;
        
        book3d.appendChild(sparkle);
        
        setTimeout(() => sparkle.remove(), duration * 1000);
    }, 2000);
}

createSparkles();

// Mouse move parallax effect for interactive elements
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 15;
    const y = (e.clientY / window.innerHeight - 0.5) * 15;
    
    // Move particles based on mouse
    const particles = document.querySelectorAll('.particles > div');
    particles.forEach((particle, index) => {
        const speed = (index % 3 + 1) * 0.3;
        const currentTransform = particle.style.transform || '';
        if (!currentTransform.includes('translateY') || !currentTransform.includes('translateX')) {
            particle.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        }
    });
});

// Add cursor trail effect with gradient
let cursorTrail = [];
let lastMouseMove = 0;
document.addEventListener('mousemove', (e) => {
    const now = Date.now();
    if (now - lastMouseMove < 30) return; // Throttle
    lastMouseMove = now;
    
    const trail = document.createElement('div');
    trail.style.cssText = `
        position: fixed;
        width: 8px;
        height: 8px;
        background: radial-gradient(circle, rgba(108, 92, 231, 0.8), rgba(118, 75, 162, 0.4), transparent);
        border-radius: 50%;
        pointer-events: none;
        left: ${e.clientX - 4}px;
        top: ${e.clientY - 4}px;
        z-index: 9999;
        animation: fade-trail 0.8s ease-out forwards;
    `;
    document.body.appendChild(trail);
    
    cursorTrail.push(trail);
    if (cursorTrail.length > 8) {
        const old = cursorTrail.shift();
        if (old && old.parentNode) old.remove();
    }
    
    setTimeout(() => {
        if (trail && trail.parentNode) trail.remove();
    }, 800);
});

// Add fade trail animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes fade-trail {
        to {
            transform: scale(2.5);
            opacity: 0;
        }
    }
`;
document.head.appendChild(trailStyle);

// Animate section titles on scroll with glow effect
const sectionTitles = document.querySelectorAll('.section-title');
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
        }
    });
}, { threshold: 0.5 });

sectionTitles.forEach(title => titleObserver.observe(title));

// Add floating animation to social links
const socialLinks = document.querySelectorAll('.social-link');
socialLinks.forEach((link, index) => {
    link.addEventListener('mouseenter', function() {
        this.style.animation = 'none';
        setTimeout(() => {
            this.style.animation = '';
        }, 10);
    });
});

// Quotes Carousel - Fixed and Working
(function initCarousel() {
    let currentQuote = 0;
    const quoteContainers = document.querySelectorAll('.quote-container');
    const quoteDots = document.querySelector('.quote-dots');
    const prevBtn = document.querySelector('.quote-nav-btn.prev');
    const nextBtn = document.querySelector('.quote-nav-btn.next');

    console.log('🎠 Carousel Initializing...', {
        quotes: quoteContainers.length,
        dots: !!quoteDots,
        prev: !!prevBtn,
        next: !!nextBtn
    });

    // Initialize carousel only if elements exist
    if (quoteContainers.length === 0) {
        console.warn('No quote containers found!');
        return;
    }

    // Initialize first quote as active
    quoteContainers[0].classList.add('active');
    console.log('✅ First quote activated');
    
    // Create dots
    if (quoteDots) {
        quoteContainers.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('quote-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', function() {
                console.log('Dot clicked:', index);
                goToQuote(index);
            });
            quoteDots.appendChild(dot);
        });
        console.log('✅ Dots created:', quoteContainers.length);
    }
    
    function showQuote(index) {
        console.log('📖 Showing quote:', index);
        quoteContainers.forEach((container, i) => {
            if (i === index) {
                container.classList.add('active');
            } else {
                container.classList.remove('active');
            }
        });
        
        // Update dots
        const dots = document.querySelectorAll('.quote-dot');
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    function goToQuote(index) {
        currentQuote = index;
        showQuote(currentQuote);
    }
    
    function nextQuote() {
        currentQuote = (currentQuote + 1) % quoteContainers.length;
        console.log('➡️ Next quote:', currentQuote);
        showQuote(currentQuote);
    }
    
    function prevQuote() {
        currentQuote = (currentQuote - 1 + quoteContainers.length) % quoteContainers.length;
        console.log('⬅️ Previous quote:', currentQuote);
        showQuote(currentQuote);
    }
    
    // Add click event listeners
    if (prevBtn) {
        prevBtn.addEventListener('click', function(e) {
            console.log('🔘 Prev button clicked!');
            e.preventDefault();
            e.stopPropagation();
            prevQuote();
        });
        console.log('✅ Prev button listener added');
    } else {
        console.warn('❌ Prev button not found!');
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', function(e) {
            console.log('🔘 Next button clicked!');
            e.preventDefault();
            e.stopPropagation();
            nextQuote();
        });
        console.log('✅ Next button listener added');
    } else {
        console.warn('❌ Next button not found!');
    }
    
    // Auto-advance quotes every 5 seconds
    setInterval(function() {
        nextQuote();
    }, 5000);
    console.log('✅ Auto-advance enabled');
    
    // Keyboard navigation for quotes
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            console.log('⌨️ Left arrow pressed');
            prevQuote();
        }
        if (e.key === 'ArrowRight') {
            console.log('⌨️ Right arrow pressed');
            nextQuote();
        }
    });
    console.log('✅ Keyboard navigation enabled');
    
    console.log('🎉 Carousel fully initialized!');
})();

console.log('🚀 Book Website Loaded with Amazing Animations! 📚✨🎨');

