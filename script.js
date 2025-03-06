// Loader
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        document.querySelector('.loader').classList.add('fade-out');
        
        // Enable scrolling after loader disappears
        setTimeout(() => {
            document.body.style.overflow = 'auto';
        }, 500);
    }, 1500);
});

// Initialize variables
let header = document.querySelector('header');
let menuToggle = document.querySelector('.menu-toggle');
let menu = document.querySelector('.menu');
let cursor = document.querySelector('.cursor');
let cursorFollower = document.querySelector('.cursor-follower');
let isMenuOpen = false;

// Header scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Menu toggle
menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    menu.classList.toggle('active');
    
    if (isMenuOpen) {
        menuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
});

// Custom cursor
document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    }, 100);
    
    // Make cursor visible after first mouse movement
    if (cursor.style.opacity === '0') {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    }
});

// Cursor effects on interactive elements
const cursorTargets = document.querySelectorAll('a, button, .featured-item, .gallery-item, .menu-toggle');

cursorTargets.forEach(target => {
    target.addEventListener('mouseenter', () => {
        cursor.style.width = '0px';
        cursor.style.height = '0px';
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
        cursorFollower.style.backgroundColor = 'rgba(184, 134, 11, 0.2)';
    });
    
    target.addEventListener('mouseleave', () => {
        cursor.style.width = '20px';
        cursor.style.height = '20px';
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
        cursorFollower.style.backgroundColor = 'rgba(184, 134, 11, 0.2)';
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Close mobile menu if open
        if (isMenuOpen) {
            menu.classList.remove('active');
            menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
            isMenuOpen = false;
        }
        
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

// Active menu item based on scroll position
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    document.querySelectorAll('.menu a').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.classList.add('active');
        }
    });
});

// Form submission handling
const newsletterForm = document.getElementById('newsletter-form');
const contactForm = document.getElementById('contact-form');

if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        
        if (validateEmail(email)) {
            // Here you would typically send the data to your server
            showAlert('Cảm ơn bạn đã đăng ký!', 'success');
            newsletterForm.reset();
        } else {
            showAlert('Vui lòng nhập email hợp lệ.', 'error');
        }
    });
}

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Here you would typically send the data to your server
        showAlert('Cảm ơn bạn đã liên hệ với chúng tôi! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.', 'success');
        contactForm.reset();
    });
}

// Email validation helper
function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Alert helper
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert ${type}`;
    alertDiv.innerHTML = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        alertDiv.classList.remove('show');
        setTimeout(() => {
            alertDiv.remove();
        }, 300);
    }, 3000);
}

// Add animation on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('[data-aos]');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementPosition < windowHeight * 0.9) {
            element.classList.add('aos-animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Make initial animations smoother
setTimeout(() => {
    document.querySelector('.hero-content').classList.add('loaded');
}, 2000);

// Add style tag for alert animation
const style = document.createElement('style');
style.innerHTML = `
    .alert {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 25px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 1000;
        transform: translateY(100px);
        opacity: 0;
        transition: transform 0.3s ease, opacity 0.3s ease;
    }
    
    .alert.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .alert.success {
        background-color: #4CAF50;
    }
    
    .alert.error {
        background-color: #F44336;
    }
    
    [data-aos] {
        opacity: 0;
        transform: translateY(50px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    [data-aos].aos-animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    [data-aos-delay="100"].aos-animate {
        transition-delay: 0.1s;
    }
    
    [data-aos-delay="200"].aos-animate {
        transition-delay: 0.2s;
    }
    
    .hero-content.loaded .animate-text {
        animation: none;
        opacity: 1;
        transform: translateY(0);
    }
    
    .hero-content.loaded .animate-image {
        animation: none;
        opacity: 1;
        transform: translateX(0);
    }
`;

document.head.appendChild(style);