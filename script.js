document.addEventListener('DOMContentLoaded', function() {
    // --- PARTICLES CONFIG ---
    particlesJS("particles-js", {
        particles: {
            number: { value: 60, density: { enable: true, value_area: 800 } },
            color: { value: "#6c63ff" },
            shape: { type: "circle" },
            opacity: { value: 0.3, random: true },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#6c63ff", opacity: 0.15, width: 1 },
            move: { enable: true, speed: 1.5, direction: "none", random: true, out_mode: "out" }
        },
        retina_detect: true
    });

    // --- TYPING EFFECT ---
    const typedTextSpan = document.querySelector(".typed-text");
    const textArray = ["Aspiring Software Developer", "Problem Solver", "Java Learner", "Web Developer", "Tech Student"];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }
    setTimeout(type, newTextDelay);

    // --- MOBILE MENU ---
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuBtn.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when link clicked
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // --- MODAL LOGIC (Unified) ---
    const overlay = document.getElementById('globalOverlay');
    
    window.openModal = function(modalId) {
        overlay.classList.add('active');
        document.getElementById(modalId).classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    window.closeAllModals = function() {
        overlay.classList.remove('active');
        document.querySelectorAll('.popup-modal').forEach(m => m.classList.remove('active'));
        document.body.style.overflow = '';
    }

    // Experience data for May and June 2025 internships
    const experienceData = {
        aiml: {
            title: "AIML Intern - AICTE Platform (May 2025)",
            desc: "Developed an Employee Salary Prediction system using Machine Learning algorithms. Built and trained regression models to predict salaries based on multiple parameters including experience, education, and job role.",
            links: [
                { text: "View GitHub Repository", url: "https://github.com/devak/employee-salary-prediction", icon: "fab fa-github" },
                { text: "View Certificate", url: "https://drive.google.com/file/d/1e1fg_BV9cGi2vrKiPn59t_dPEr57NmVF/view?usp=sharing", icon: "fas fa-certificate" }
            ]
        },
        webdev: {
            title: "Web Developer - InternPro (June 2025)",
            desc: "Created a Dynamic Weather Application with real-time data fetching, location-based weather updates, and interactive visualization of weather forecasts and historical data.",
            links: [
                { text: "View GitHub Repository", url: "https://github.com/devak/weather-app", icon: "fab fa-github" },
                { text: "View Certificate", url: "https://drive.google.com/file/d/1nG8wEcWGMEF1ErTUwWDQMuSNNkZcs_5y/view?usp=sharing", icon: "fas fa-certificate" }
            ]
        }
    };

    // Experience modal triggers
    document.querySelectorAll('.timeline-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const expId = this.closest('.timeline-item').dataset.expId;
            const data = experienceData[expId];
            
            if (data) {
                document.getElementById('experienceModalTitle').textContent = data.title;
                document.getElementById('experienceModalDesc').textContent = data.desc;
                
                const linksContainer = document.getElementById('experienceModalLinks');
                linksContainer.innerHTML = '';
                
                data.links.forEach(link => {
                    const linkEl = document.createElement('a');
                    linkEl.href = link.url;
                    linkEl.target = "_blank";
                    linkEl.innerHTML = `<i class="${link.icon}"></i> ${link.text}`;
                    linksContainer.appendChild(linkEl);
                });
                
                openModal('experienceModal');
            }
        });
    });

    // Triggers
    document.getElementById('logoClick').addEventListener('click', () => openModal('whatsappPopup'));
    document.getElementById('whatsappCta').addEventListener('click', function(e) {
        // Prevent triggering when clicking the button inside
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            return;
        }
        openModal('whatsappPopup');
    });
    
    document.getElementById('resumeBtn').addEventListener('click', () => openModal('resumePopup'));
    document.getElementById('viewProfileBtn').addEventListener('click', () => {
        document.getElementById('whatsappPopup').classList.remove('active');
        openModal('profilePhotoModal');
    });
    
    // Button inside WhatsApp contact item
    document.querySelector('#whatsappCta .btn').addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering parent click
        openModal('whatsappPopup');
    });
    
    // Location WhatsApp button
    document.getElementById('locationWhatsapp').addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent triggering parent click
        openModal('whatsappPopup');
    });
    
    // Location contact item click
    document.getElementById('locationContact').addEventListener('click', function(e) {
        // Prevent triggering when clicking the button inside
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            return;
        }
        openModal('whatsappPopup');
    });
    
    // Close on overlay click
    overlay.addEventListener('click', closeAllModals);

    // --- COPY EMAIL FUNCTIONALITY ---
    document.getElementById('emailContact').addEventListener('click', function(e) {
        // Prevent triggering when clicking the "Send Mail" button
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            return;
        }
        
        const email = document.getElementById('emailText').innerText;
        navigator.clipboard.writeText(email).then(() => {
            const toast = document.getElementById('toast');
            toast.style.opacity = '1';
            toast.textContent = 'Email copied to clipboard!';
            setTimeout(() => { toast.style.opacity = '0'; }, 2000);
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            const toast = document.getElementById('toast');
            toast.style.opacity = '1';
            toast.textContent = 'Failed to copy email';
            toast.style.background = 'var(--accent)';
            setTimeout(() => { 
                toast.style.opacity = '0';
                toast.style.background = 'var(--primary)';
            }, 2000);
        });
    });

    // --- SCROLL ANIMATIONS ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS animations
                entry.target.classList.add('visible');
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px' // Trigger when element is 50px from viewport bottom
    });

    // Observe all elements that should animate on scroll
    const elementsToAnimate = [
        '.timeline-item',
        '.skills-category', 
        '.project-card',
        '.contact-item',
        '.profile-card',
        '.stat-item'
    ];
    
    elementsToAnimate.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            observer.observe(el);
        });
    });

    // Back to Top Visibility
    window.addEventListener('scroll', () => {
        const backToTop = document.querySelector('.back-to-top');
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
});