// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    // Close mobile menu when clicking on nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed header
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Smooth scrolling for hero buttons
    const heroButtons = document.querySelectorAll('.hero-buttons a[href^="#"]');
    heroButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                    navLinks.forEach(link => link.classList.remove('active'));
                    navLink.classList.add('active');
                }
            }
        });
    }

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Navbar background on scroll
    function updateNavbarBackground() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }

    // Scroll animations
    function animateOnScroll() {
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        const windowHeight = window.innerHeight;
        
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }

    // Add animate-on-scroll class to elements
    function addScrollAnimations() {
        const elementsToAnimate = [
            '.about-content',
            '.showcase-item',
            '.timeline-item',
            '.contact-item',
            '.resume-card',
            '.stat-item',
            '.skill-item'
        ];

        elementsToAnimate.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach((element, index) => {
                element.classList.add('animate-on-scroll');
                element.style.transitionDelay = `${index * 0.1}s`;
            });
        });
    }

    // Advanced Typing animation for hero title
    function advancedTypeWriter() {
        const nameElement = document.querySelector('#typewriter-name');
        const roleElement = document.querySelector('#typewriter-role');
        const cursor = document.querySelector('#cursor');
        
        if (!nameElement || !roleElement || !cursor) return;

        const nameText = nameElement.textContent;
        const roleText = roleElement.textContent;
        
        // Clear initial content
        nameElement.textContent = '';
        roleElement.textContent = '';
        
        let nameIndex = 0;
        let roleIndex = 0;
        let isTypingName = true;
        let isTypingRole = false;
        let isNameComplete = false;
        let isRoleComplete = false;
        
        // Show cursor initially
        cursor.style.opacity = '1';
        
        function typeCharacter() {
            if (isTypingName && nameIndex < nameText.length) {
                // Add typing sound effect simulation
                if (Math.random() > 0.7) {
                    // Simulate occasional typing pause
                    setTimeout(typeCharacter, Math.random() * 100 + 50);
                    return;
                }
                
                nameElement.textContent += nameText.charAt(nameIndex);
                nameIndex++;
                
                // Variable typing speed for more realism
                const typingSpeed = Math.random() * 100 + 80;
                setTimeout(typeCharacter, typingSpeed);
            } else if (isTypingName && nameIndex >= nameText.length) {
                // Name typing complete
                isTypingName = false;
                isNameComplete = true;
                
                // Add name completion effect
                nameElement.style.textShadow = '0 0 30px rgba(59, 130, 246, 0.6)';
                
                // Wait before starting role typing
                setTimeout(() => {
                    isTypingRole = true;
                    typeCharacter();
                }, 800);
            } else if (isTypingRole && roleIndex < roleText.length) {
                // Simulate backspace occasionally for realism
                if (Math.random() > 0.95 && roleIndex > 0) {
                    roleElement.textContent = roleElement.textContent.slice(0, -1);
                    roleIndex--;
                    setTimeout(typeCharacter, 100);
                    return;
                }
                
                roleElement.textContent += roleText.charAt(roleIndex);
                roleIndex++;
                
                // Slightly faster for role
                const typingSpeed = Math.random() * 80 + 60;
                setTimeout(typeCharacter, typingSpeed);
            } else if (isTypingRole && roleIndex >= roleText.length) {
                // Role typing complete
                isTypingRole = false;
                isRoleComplete = true;
                
                // Add completion effects
                roleElement.style.color = 'rgba(255, 255, 255, 0.9)';
                
                // Stop cursor blinking after completion
                setTimeout(() => {
                    cursor.style.animation = 'none';
                    cursor.style.opacity = '0';
                }, 2000);
            }
        }
        
        // Start typing after initial delay
        setTimeout(() => {
            typeCharacter();
        }, 1500);
        
        // Add glitch effect occasionally
        function addGlitchEffect() {
            if (isNameComplete) {
                const originalText = nameElement.textContent;
                const glitchChars = '!@#$%^&*()_+{}[]|;:,.<>?';
                let glitchText = '';
                
                for (let i = 0; i < originalText.length; i++) {
                    if (Math.random() > 0.8) {
                        glitchText += glitchChars[Math.floor(Math.random() * glitchChars.length)];
                    } else {
                        glitchText += originalText[i];
                    }
                }
                
                nameElement.textContent = glitchText;
                nameElement.style.color = '#ff0080';
                
                setTimeout(() => {
                    nameElement.textContent = originalText;
                    nameElement.style.color = '';
                }, 100);
            }
        }
        
        // Trigger glitch effect randomly
        const glitchInterval = setInterval(() => {
            if (Math.random() > 0.85) {
                addGlitchEffect();
            }
        }, 3000);
        
        // Clear glitch after 20 seconds
        setTimeout(() => {
            clearInterval(glitchInterval);
        }, 20000);
    }

    // Enhanced floating orbs animation
    function enhanceFloatingOrbs() {
        const orbs = document.querySelectorAll('.orb');
        
        orbs.forEach((orb, index) => {
            // Add random movement
            setInterval(() => {
                const randomX = Math.random() * 100 - 50;
                const randomY = Math.random() * 100 - 50;
                orb.style.transform = `translate(${randomX}px, ${randomY}px)`;
            }, 5000 + index * 1000);
            
            // Add hover effect
            orb.addEventListener('mouseenter', () => {
                orb.style.opacity = '0.3';
                orb.style.transform = 'scale(1.2)';
            });
            
            orb.addEventListener('mouseleave', () => {
                orb.style.opacity = '0.1';
                orb.style.transform = 'scale(1)';
            });
        });
    }

    // Matrix rain effect for background
    function createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.zIndex = '0';
        canvas.style.opacity = '0.1';
        
        document.querySelector('.hero').appendChild(canvas);
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const matrixArray = matrix.split("");
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        
        const drops = [];
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        function draw() {
            ctx.fillStyle = 'rgba(15, 23, 42, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#3b82f6';
            ctx.font = fontSize + 'px arial';
            
            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        
        const matrixInterval = setInterval(draw, 35);
        
        // Clean up after 30 seconds
        setTimeout(() => {
            clearInterval(matrixInterval);
            canvas.remove();
        }, 30000);
    }

    // Particle system for tech icons
    function createParticleSystem() {
        const techIcons = document.querySelectorAll('.tech-icon');
        
        techIcons.forEach(icon => {
            icon.addEventListener('mouseenter', () => {
                createParticles(icon);
            });
        });
        
        function createParticles(element) {
            for (let i = 0; i < 5; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    width: 4px;
                    height: 4px;
                    background: #3b82f6;
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                const rect = element.getBoundingClientRect();
                particle.style.left = rect.left + rect.width / 2 + 'px';
                particle.style.top = rect.top + rect.height / 2 + 'px';
                
                document.body.appendChild(particle);
                
                const angle = (Math.PI * 2 * i) / 5;
                const velocity = 2;
                const vx = Math.cos(angle) * velocity;
                const vy = Math.sin(angle) * velocity;
                
                let x = 0;
                let y = 0;
                let opacity = 1;
                
                const animate = () => {
                    x += vx;
                    y += vy;
                    opacity -= 0.02;
                    
                    particle.style.transform = `translate(${x}px, ${y}px)`;
                    particle.style.opacity = opacity;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        particle.remove();
                    }
                };
                
                requestAnimationFrame(animate);
            }
        }
    }

    // Contact form handling
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const name = formData.get('name');
            const email = formData.get('email');
            const subject = formData.get('subject');
            const message = formData.get('message');
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showNotification('Please enter a valid email address', 'error');
                return;
            }

            // Simulate form submission
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitButton.disabled = true;

            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you for your message! I\'ll get back to you soon.', 'success');
                this.reset();
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            }, 2000);
        });
    }

    // Email validation function
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
                <span>${message}</span>
                <button class="notification-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: white;
            border-radius: 8px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
            padding: 1rem;
            z-index: 10000;
            max-width: 400px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        `;

        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Close button functionality
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(100%)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }

    // Lazy loading for images (if any are added later)
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }

    // Scroll progress indicator
    function createScrollProgressIndicator() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
            z-index: 10001;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        function updateScrollProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        }

        window.addEventListener('scroll', updateScrollProgress);
    }

    // Parallax effect for hero section
    function parallaxEffect() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero) {
            hero.style.backgroundPositionY = rate + 'px';
        }
    }

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Initialize scroll animations
    addScrollAnimations();
    
    // Observe all animated elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Create scroll progress indicator
    createScrollProgressIndicator();

    // Initialize lazy loading
    lazyLoadImages();

    // Event listeners for scroll events
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                toggleBackToTopButton();
                updateNavbarBackground();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', onScroll);

    // Resize event listener
    window.addEventListener('resize', function() {
        // Close mobile menu on resize
        if (window.innerWidth > 768) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Initialize typing animation
    setTimeout(advancedTypeWriter, 500);

    // Initialize enhanced effects
    setTimeout(() => {
        enhanceFloatingOrbs();
        createMatrixRain();
        createParticleSystem();
    }, 1000);

    // Smooth reveal animation for page load
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Trigger initial scroll animations
        animateOnScroll();
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        // ESC key to close mobile menu
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    // Add loading states to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function() {
            if (!this.classList.contains('loading')) {
                this.classList.add('loading');
                setTimeout(() => {
                    this.classList.remove('loading');
                }, 2000);
            }
        });
    });

    // Social links hover effect
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Skill items hover effect
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    console.log('Portfolio website initialized successfully!');
});