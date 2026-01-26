// Updated script.js
document.addEventListener('DOMContentLoaded', function() {
    // ============================================
    // 1. CUSTOM CURSOR
    // ============================================
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-dot');
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let isMobile = window.innerWidth <= 768;
    
    // Update cursor position with smooth animation
    function updateCursor() {
        if (isMobile) {
            cursor.classList.add('hidden');
            return;
        }
        
        // Smooth interpolation (lag behind for smooth effect)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
        
        requestAnimationFrame(updateCursor);
    }
    
    // Track mouse movement
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (isMobile) return;
        
        // Show cursor if hidden
        cursor.classList.remove('hidden');
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', function() {
        cursor.classList.add('hidden');
    });
    
    // Show cursor when entering window
    document.addEventListener('mouseenter', function() {
        if (!isMobile) {
            cursor.classList.remove('hidden');
        }
    });
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll(
        'a, button, .project-card-compact, .skill-tag, .tag, .tech-chip'
    );
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            if (!isMobile) {
                cursor.classList.add('hover');
            }
        });
        
        el.addEventListener('mouseleave', function() {
            if (!isMobile) {
                cursor.classList.remove('hover');
            }
        });
    });
    
    // Start cursor animation
    updateCursor();
    
    // ============================================
    // 2. NAVIGATION & MOBILE MENU
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    mobileToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        
        // Animate hamburger to X
        const hamburger = this.querySelector('.hamburger');
        if (navMenu.classList.contains('active')) {
            hamburger.style.transform = 'translate(-50%, -50%) rotate(45deg)';
            hamburger.style.background = 'var(--color-accent-blue)';
            hamburger.style.before = 'transform: rotate(90deg)';
            hamburger.style.after = 'opacity: 0';
        } else {
            hamburger.style.transform = 'translate(-50%, -50%) rotate(0)';
            hamburger.style.background = 'var(--color-text)';
        }
    });
    
    // Update active nav link based on scroll position
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Close mobile menu when clicking a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            mobileToggle.classList.remove('active');
            
            // Reset hamburger
            const hamburger = mobileToggle.querySelector('.hamburger');
            hamburger.style.transform = 'translate(-50%, -50%) rotate(0)';
            hamburger.style.background = 'var(--color-text)';
        });
    });
    
    // ============================================
    // 3. SMOOTH SCROLLING
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ============================================
    // 4. NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        updateActiveNavLink();
    }
    
    window.addEventListener('scroll', updateNavbar);
    updateNavbar(); // Initialize on load
    
    // ============================================
    // 5. SCROLL REVEAL ANIMATIONS
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Add staggered delay for child elements
                if (entry.target.classList.contains('stats-grid')) {
                    const children = entry.target.querySelectorAll('.stat-card');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                if (entry.target.classList.contains('skills-grid')) {
                    const children = entry.target.querySelectorAll('.skill-category');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
                
                if (entry.target.classList.contains('timeline')) {
                    const children = entry.target.querySelectorAll('.timeline-item');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.15}s`;
                    });
                }
                
                if (entry.target.classList.contains('projects-grid')) {
                    const children = entry.target.querySelectorAll('.project-card-compact');
                    children.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 0.1}s`;
                    });
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => {
        scrollObserver.observe(el);
    });
    
    // Observe form groups and contact items separately for staggered animation
    const formGroups = document.querySelectorAll('.form-group');
    const contactItems = document.querySelectorAll('.contact-item');
    
    const formObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    formGroups.forEach(el => formObserver.observe(el));
    contactItems.forEach(el => formObserver.observe(el));
    
    // ============================================
    // 6. PROJECT MODAL FUNCTIONALITY
    // ============================================
    const modalOverlay = document.getElementById('modal-overlay');
    const projectCards = document.querySelectorAll('.project-card-compact');
    const modalCloseButtons = document.querySelectorAll('.modal-close');
    const modals = document.querySelectorAll('.modal');
    
    // Open modal when clicking project card or view details button
    projectCards.forEach(card => {
        card.addEventListener('click', function(e) {
            // Don't open modal if clicking the button (handled separately)
            if (e.target.classList.contains('view-details-btn')) return;
            
            const modalId = this.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // View Details button click
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click event
            const card = this.closest('.project-card-compact');
            const modalId = card.getAttribute('data-modal');
            openModal(modalId);
        });
    });
    
    // Open modal function
    function openModal(modalId) {
        // Hide all modals first
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        
        // Show the requested modal
        const targetModal = document.getElementById(modalId);
        if (targetModal) {
            targetModal.style.display = 'block';
            setTimeout(() => {
                modalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            }, 10);
        }
    }
    
    // Close modal functions
    function closeModal() {
        modalOverlay.classList.remove('active');
        
        setTimeout(() => {
            document.body.style.overflow = 'auto'; // Re-enable scrolling
            
            // Reset modal display after animation
            modals.forEach(modal => {
                modal.style.display = 'none';
            });
        }, 300);
    }
    
    // Close modal buttons
    modalCloseButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    // Close modal when clicking overlay
    modalOverlay.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });
    
    // Close modal with ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });
    
    // ============================================
    // 7. BUTTON MICRO-INTERACTIONS
    // ============================================
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        // Ripple effect
        button.addEventListener('click', function(e) {
            // Create ripple element
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            
            // Position ripple at click point
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = `${size}px`;
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Hover effect
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        button.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Magnetic effect (very subtle)
        if (!isMobile) {
            button.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) * 0.1;
                const deltaY = (y - centerY) * 0.1;
                
                this.style.transform = `translate(${deltaX}px, ${deltaY - 3}px)`;
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        }
    });
    
    // ============================================
    // 8. BACK TO TOP BUTTON
    // ============================================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ============================================
    // 9. FORM SUBMISSION
    // ============================================
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Show success animation
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            const originalHTML = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset form
            contactForm.reset();
            
            // Log data to console (for demo)
            console.log('Contact form submitted:', data);
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalHTML;
                submitBtn.style.background = '';
            }, 3000);
        });
    }
    // Enhanced version with progress simulation
// ============================================
// 10. RESUME BUTTON DOWNLOAD (ENHANCED)
// ============================================
const resumeBtn = document.getElementById('resume-btn');

if (resumeBtn) {
    resumeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Your Google Drive resume link
        const resumeUrl = 'https://drive.google.com/uc?export=download&id=1pVElo09vvRUCHil0EW0UbJ2OStKrvgSd';
        
        // Save original button state
        const originalHTML = this.innerHTML;
        const originalBackground = this.style.background;
        const originalWidth = this.offsetWidth;
        
        // Set fixed width to prevent button size change
        this.style.width = `${originalWidth}px`;
        
        // Show downloading state
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing...';
        this.style.pointerEvents = 'none';
        
        // Simulate download progress
        let progress = 0;
        const progressInterval = setInterval(() => {
            progress += 20;
            if (progress <= 100) {
                this.innerHTML = `<i class="fas fa-spinner fa-spin"></i> Downloading ${progress}%`;
                
                // Update background gradient to show progress
                const progressColor = `linear-gradient(90deg, #3b82f6 ${progress}%, rgba(30, 41, 59, 0.3) ${progress}%)`;
                this.style.background = progressColor;
            }
        }, 200);
        
        // Create invisible download link
        const downloadLink = document.createElement('a');
        downloadLink.href = resumeUrl;
        downloadLink.download = 'Deva_Resume.pdf';
        downloadLink.target = '_blank';
        downloadLink.style.display = 'none';
        
        // Add to document and trigger download after short delay
        setTimeout(() => {
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
            
            // Complete progress
            clearInterval(progressInterval);
            this.innerHTML = '<i class="fas fa-check"></i> Download Complete!';
            this.style.background = 'linear-gradient(135deg, #10b981, #059669)';
            
            // Reset button after 1.5 seconds
            setTimeout(() => {
                this.innerHTML = originalHTML;
                this.style.background = originalBackground;
                this.style.pointerEvents = 'auto';
                this.style.width = ''; // Reset width
            }, 1500);
        }, 1000);
    });
}
    // ============================================
    // 12. FLOATING ORBS ANIMATION
    // ============================================
    const floatingOrbsContainer = document.createElement('div');
    floatingOrbsContainer.className = 'floating-orbs';
    document.body.appendChild(floatingOrbsContainer);
    
    // Create floating orbs
    for (let i = 1; i <= 3; i++) {
        const orb = document.createElement('div');
        orb.className = `floating-orb floating-orb-${i}`;
        floatingOrbsContainer.appendChild(orb);
    }
    
    // ============================================
    // 13. INITIALIZATION
    // ============================================
    
    // Trigger initial scroll reveal for elements already in view
    setTimeout(() => {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
        
        // Trigger form and contact animations if in view
        formGroups.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
        
        contactItems.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    }, 100);
    
    // Initialize navbar state
    updateNavbar();
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        // Disable cursor and floating orbs for reduced motion
        cursor.style.display = 'none';
        floatingOrbsContainer.style.display = 'none';
    }
});
