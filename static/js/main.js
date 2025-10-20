// ========== CINEMATIC ANIMATIONS & INTERACTIONS ==========

console.log('🎬 Initializing Cinematic Animations...');

// Typing Effect for Hero Subtitle
document.addEventListener('DOMContentLoaded', function() {
    const typingElement = document.querySelector('.typing-effect');
    if (typingElement) {
        const text = typingElement.getAttribute('data-text') || 'Some stories aren\'t written — they\'re felt.';
        typingElement.textContent = '';
        typingElement.style.width = '0';
        
        let charIndex = 0;
        function typeChar() {
            if (charIndex < text.length) {
                typingElement.textContent += text.charAt(charIndex);
                charIndex++;
                setTimeout(typeChar, 50 + Math.random() * 30); // Varied typing speed
            } else {
                setTimeout(() => {
                    typingElement.style.borderRight = 'none';
                }, 500);
            }
        }
        
        setTimeout(typeChar, 1500); // Start after title animation
    }
});

// Scroll Progress Bar
window.addEventListener('scroll', function() {
    const progressBar = document.querySelector('.scroll-progress-bar');
    if (progressBar) {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    }
});

// Enhanced Floating Bokeh Particles
function createBokehParticles() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    // Create beautiful bokeh orbs
    for (let i = 0; i < 20; i++) {
        const bokeh = document.createElement('div');
        const size = Math.random() * 80 + 40;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 5;
        
        bokeh.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, 
                rgba(255, 255, 255, 0.2), 
                rgba(167, 139, 250, 0.15) 50%, 
                rgba(236, 72, 153, 0.1));
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${duration}s ease-in-out ${delay}s infinite, 
                       pulse ${duration / 2}s ease-in-out ${delay}s infinite;
            filter: blur(${Math.random() * 3 + 1}px);
            pointer-events: none;
        `;
        
        particlesContainer.appendChild(bokeh);
    }
    
    console.log('✨ Bokeh particles created');
}

createBokehParticles();

// Quote Section - Letter by Letter Animation with Keyword Highlighting
function animateQuoteText(container) {
    const quoteText = container.querySelector('.quote-text');
    if (!quoteText || quoteText.hasAttribute('data-animated')) return;
    
    quoteText.setAttribute('data-animated', 'true');
    const originalText = quoteText.textContent;
    quoteText.innerHTML = '';
    
    // Keywords to highlight
    const keywords = ['love', 'heart', 'silence', 'feelings', 'emotions', 'beautiful', 'chaos'];
    
    let charIndex = 0;
    function revealLetter() {
        if (charIndex < originalText.length) {
            const char = originalText.charAt(charIndex);
            const span = document.createElement('span');
            span.textContent = char;
            span.style.opacity = '0';
            span.style.animation = 'letterFadeIn 0.3s ease forwards';
            span.style.animationDelay = (charIndex * 0.03) + 's';
            
            // Check if we're at the start of a keyword
            let isKeyword = false;
            for (const keyword of keywords) {
                if (originalText.substr(charIndex, keyword.length).toLowerCase() === keyword.toLowerCase()) {
                    isKeyword = true;
                    break;
                }
            }
            
            if (isKeyword) {
                span.style.color = 'var(--secondary-color)';
                span.style.textShadow = '0 0 10px rgba(236, 72, 153, 0.6)';
                span.style.fontWeight = '600';
            }
            
            quoteText.appendChild(span);
            charIndex++;
            setTimeout(revealLetter, 30);
        }
    }
    
    // Add CSS for letter animation
    if (!document.getElementById('letterAnimStyle')) {
        const style = document.createElement('style');
        style.id = 'letterAnimStyle';
        style.textContent = `
            @keyframes letterFadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(revealLetter, 300);
}

// Page Flip Transition for Quotes
function pageFlipTransition(oldQuote, newQuote, callback) {
    console.log('📖 Page flip starting...');
    
    if (!oldQuote || !newQuote) {
        console.warn('Missing quote elements for flip');
        return;
    }
    
    // Phase 1: Flip out the old quote (like turning a page left)
    oldQuote.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.8s ease';
    oldQuote.style.transformOrigin = 'center left';
    oldQuote.style.transformStyle = 'preserve-3d';
    oldQuote.style.transform = 'perspective(2000px) rotateY(-180deg) scale(0.8)';
    oldQuote.style.opacity = '0';
    
    // Phase 2: After old quote flips out, prepare and flip in new quote
    setTimeout(() => {
        // Hide old quote completely
        oldQuote.classList.remove('active');
        oldQuote.style.visibility = 'hidden';
        oldQuote.style.transform = '';
        oldQuote.style.opacity = '';
        oldQuote.style.transition = '';
        
        // Prepare new quote (flipped and hidden)
        newQuote.style.visibility = 'visible';
        newQuote.style.transformOrigin = 'center right';
        newQuote.style.transformStyle = 'preserve-3d';
        newQuote.style.transform = 'perspective(2000px) rotateY(180deg) scale(0.8)';
        newQuote.style.opacity = '0';
        newQuote.classList.add('active');
        
        // Small delay before animating in
        setTimeout(() => {
            // Flip in the new quote (like turning a page right)
            newQuote.style.transition = 'transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1), opacity 0.8s ease';
            newQuote.style.transform = 'perspective(2000px) rotateY(0deg) scale(1)';
            newQuote.style.opacity = '1';
            
            console.log('📖 Page flip in progress...');
            
            // Animate text after flip completes
            setTimeout(() => {
                animateQuoteText(newQuote);
                
                // Clean up inline styles after animation
                setTimeout(() => {
                    newQuote.style.transform = '';
                    newQuote.style.transition = '';
                    newQuote.style.transformOrigin = '';
                    console.log('✅ Page flip complete!');
                    if (callback) callback();
                }, 100);
            }, 800);
        }, 50);
    }, 800);
}

// Countdown timer removed per user request

// Email Notification Form Handler
window.handleNotifySubmit = function(event) {
    event.preventDefault();
    
    const form = event.target;
    const emailInput = form.querySelector('.email-input');
    const button = form.querySelector('.btn-notify');
    const successDiv = document.querySelector('.notify-success');
    
    if (!emailInput || !emailInput.value) return false;
    
    // Animate button
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Subscribing...</span>';
    button.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Hide form
        form.style.transition = 'all 0.5s ease';
        form.style.opacity = '0';
        form.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            form.style.display = 'none';
            
            // Show success message
            if (successDiv) {
                successDiv.style.display = 'block';
                successDiv.style.animation = 'success-appear 0.5s ease forwards';
            }
            
            // Store email (in real app, send to backend)
            console.log('📧 Email subscribed:', emailInput.value);
            
            // Confetti effect
            createConfetti();
        }, 500);
    }, 1500);
    
    return false;
};

// Confetti Effect
function createConfetti() {
    const colors = ['#a78bfa', '#ec4899', '#3b82f6', '#26de81'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}%;
            top: -10px;
            opacity: 1;
            border-radius: 50%;
            z-index: 10000;
            pointer-events: none;
        `;
        
        document.body.appendChild(confetti);
        
        const endX = Math.random() * 100;
        const endY = window.innerHeight + 50;
        const rotation = Math.random() * 720;
        
        confetti.animate([
            { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
            { transform: `translate(${endX - 50}vw, ${endY}px) rotate(${rotation}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        });
        
        setTimeout(() => confetti.remove(), 3000);
    }
}

// Audio control is now handled inline in index.html for simplicity


// Cinematic Ending - Trigger when in view
const endingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            console.log('🎬 Cinematic ending triggered');
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.3 });

const cinematicEnding = document.querySelector('.cinematic-ending');
if (cinematicEnding) {
    endingObserver.observe(cinematicEnding);
}

console.log('✅ All cinematic animations initialized!');

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

// Enhanced Quotes Carousel with Page Flip & Letter Animation
(function initCarousel() {
    let currentQuote = 0;
    const quoteContainers = document.querySelectorAll('.quote-container');
    const quoteDots = document.querySelector('.quote-dots');
    const prevBtn = document.querySelector('.quote-nav-btn.prev');
    const nextBtn = document.querySelector('.quote-nav-btn.next');

    console.log('🎠 Enhanced Carousel Initializing...', {
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

    // Initialize first quote as active with animation
    quoteContainers[0].classList.add('active');
    animateQuoteText(quoteContainers[0]);
    console.log('✅ First quote activated with animation');
    
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
        console.log('📖 Showing quote with page flip:', index);
        
        const oldIndex = currentQuote;
        if (oldIndex === index) return;
        
        const oldQuote = quoteContainers[oldIndex];
        const newQuote = quoteContainers[index];
        
        // Use page flip transition
        pageFlipTransition(oldQuote, newQuote);
        
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
        if (index === currentQuote) return;
        showQuote(index);
        currentQuote = index;
    }
    
    function nextQuote() {
        const newIndex = (currentQuote + 1) % quoteContainers.length;
        console.log('➡️ Next quote:', newIndex);
        goToQuote(newIndex);
    }
    
    function prevQuote() {
        const newIndex = (currentQuote - 1 + quoteContainers.length) % quoteContainers.length;
        console.log('⬅️ Previous quote:', newIndex);
        goToQuote(newIndex);
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
    
    // Auto-advance quotes every 10 seconds (longer for page flip + letter animation)
    setInterval(function() {
        nextQuote();
    }, 10000);
    console.log('✅ Auto-advance enabled (10 seconds)');
    
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
    
    console.log('🎉 Enhanced Carousel fully initialized!');
})();

// Equation Dividers - Fade in when scrolled into view
document.addEventListener('DOMContentLoaded', function() {
    const equationDividers = document.querySelectorAll('.equation-divider');
    
    if (equationDividers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    console.log('✨ Equation divider revealed');
                }
            });
        }, {
            threshold: 0.3
        });
        
        equationDividers.forEach(divider => {
            observer.observe(divider);
        });
        
        console.log('📊 Initialized', equationDividers.length, 'equation dividers');
    }
});

// Signature removed per user request

console.log('🚀 Book Website Loaded with Amazing Animations! 📚✨🎨');

