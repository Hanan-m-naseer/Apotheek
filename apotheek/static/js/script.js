// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Product counter functionality
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    let cartCount = 0;
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            cartCount++;
            
            // Show a notification or update cart icon
            showCartNotification(this);
            
            // Get product details
            const productCard = this.closest('.product-card');
            const productName = productCard.querySelector('.product-title').innerText;
            const productPrice = productCard.querySelector('.current-price').innerText;
            
            console.log(`Added to cart: ${productName} - ${productPrice}`);
        });
    });
    
    function showCartNotification(button) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'cart-notification';
        notification.innerText = 'Added to cart!';
        
        // Style the notification
        notification.style.position = 'absolute';
        notification.style.backgroundColor = '#28a745';
        notification.style.color = '#fff';
        notification.style.padding = '8px 12px';
        notification.style.borderRadius = '4px';
        notification.style.fontSize = '0.8rem';
        notification.style.fontWeight = 'bold';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.3s ease';
        
        // Append to the button
        const productCard = button.closest('.product-card');
        productCard.style.position = 'relative';
        productCard.appendChild(notification);
        
        // Position the notification
        const buttonRect = button.getBoundingClientRect();
        const cardRect = productCard.getBoundingClientRect();
        notification.style.top = '10px';
        notification.style.right = '10px';
        
        // Show and then hide the notification
        setTimeout(() => {
            notification.style.opacity = '1';
            
            setTimeout(() => {
                notification.style.opacity = '0';
                
                setTimeout(() => {
                    productCard.removeChild(notification);
                }, 300);
            }, 2000);
        }, 10);
    }
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    const hero = document.querySelector('.hero');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    console.log(`Searching for: ${searchTerm}`);
                    // Here you would normally redirect to search results page or filter products
                    alert(`Searching for: ${searchTerm}`);
                }
            }
        });
    }
    
    // Color swatch hover effect
    const colorSwatches = document.querySelectorAll('.color-swatch');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('mouseenter', function() {
            const color = this.classList[1];
            this.style.transform = 'scale(1.1)';
            this.style.boxShadow = '0 8px 16px rgba(0, 0, 0, 0.2)';
        });
        
        swatch.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = 'none';
        });
    });
    
    // Initialize smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Simple image slider for testimonials (if present)
    setupImageSlider();
    
    function setupImageSlider() {
        const sliders = document.querySelectorAll('.testimonial-slider');
        
        sliders.forEach(slider => {
            if (!slider) return;
            
            const slides = slider.querySelectorAll('.testimonial-slide');
            const totalSlides = slides.length;
            let currentSlide = 0;
            
            // Create navigation dots if needed
            const dotsContainer = document.createElement('div');
            dotsContainer.className = 'slider-dots';
            
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.className = i === 0 ? 'dot active' : 'dot';
                dot.dataset.slide = i;
                
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.dataset.slide));
                });
                
                dotsContainer.appendChild(dot);
            }
            
            slider.appendChild(dotsContainer);
            
            // Create next/prev buttons
            const prevBtn = document.createElement('button');
            prevBtn.className = 'slider-btn prev-btn';
            prevBtn.innerHTML = '&lt;';
            prevBtn.addEventListener('click', prevSlide);
            
            const nextBtn = document.createElement('button');
            nextBtn.className = 'slider-btn next-btn';
            nextBtn.innerHTML = '&gt;';
            nextBtn.addEventListener('click', nextSlide);
            
            slider.appendChild(prevBtn);
            slider.appendChild(nextBtn);
            
            // Style the slider for basic functionality
            slider.style.position = 'relative';
            slider.style.overflow = 'hidden';
            
            const slideContainer = document.createElement('div');
            slideContainer.className = 'slides-container';
            slideContainer.style.display = 'flex';
            slideContainer.style.transition = 'transform 0.5s ease';
            
            // Move all slides into the container
            slides.forEach(slide => {
                slide.style.flex = '0 0 100%';
                slideContainer.appendChild(slide);
            });
            
            // Replace original slides with the container
            slider.insertBefore(slideContainer, dotsContainer);
            
            // Initialize the slider
            updateSlider();
            
            function nextSlide() {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            }
            
            function prevSlide() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlider();
            }
            
            function goToSlide(index) {
                currentSlide = index;
                updateSlider();
            }
            
            function updateSlider() {
                slideContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                // Update dots
                const dots = dotsContainer.querySelectorAll('.dot');
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
            
            // Auto-advance slides
            setInterval(nextSlide, 5000);
        });
    }
    
    // Add animations when elements come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.product-card, .category-card, .feature-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Set initial styles for animation elements
    document.querySelectorAll('.product-card, .category-card, .feature-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Call on load and scroll
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);
});


// Typewriter effect (looping forward and backward)
const typewriterText = "Comfortable & Stylish Medical Scrubs";
const heroHeading = document.querySelector('.hero h1');

if (heroHeading) {
    let index = 0;
    let forward = true;
    heroHeading.style.width = `${typewriterText.length}ch`;

    function typeEffect() {
        if (forward) {
            heroHeading.textContent = typewriterText.slice(0, index + 1);
            index++;
            if (index === typewriterText.length) {
                forward = false;
                setTimeout(typeEffect, 1000); // pause before erasing
                return;
            }
        } else {
            heroHeading.textContent = typewriterText.slice(0, index - 1);
            index--;
            if (index === 0) {
                forward = true;
                setTimeout(typeEffect, 500); // pause before typing again
                return;
            }
        }
        setTimeout(typeEffect, 100) ;
        
    }

    typeEffect();
}


// --- Counter Animation for Hero Stats ---
function animateCounter(element, endValue, duration = 2000) {
    let startValue = 0;
    const increment = endValue / (duration / 30);

    const counter = setInterval(() => {
        startValue += increment;
        if (startValue >= endValue) {
            startValue = endValue;
            clearInterval(counter);
        }
        element.textContent = Math.floor(startValue);
    }, 30);
}

// Run counters when the page loads
const statItems = document.querySelectorAll('.hero-stats .stat-item h3');
statItems.forEach((stat, index) => {
    let text = stat.textContent;
    if (text.includes('+')) {
        let number = parseInt(text);
        stat.textContent = '0';
        animateCounter(stat, number);
        stat.textContent += '+'; // Append + after animation ends
    } else if (text.includes('%')) {
        let number = parseInt(text);
        stat.textContent = '0';
        animateCounter(stat, number);
        stat.textContent += '%';
    } else if (text.includes('/')) {
        // e.g., 24/7, keep as it is
    }
});
