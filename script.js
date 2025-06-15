// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Hamburger menu
    document.querySelector('.hamburger').addEventListener('click', () => {
        document.querySelector('.nav-links').classList.toggle('active');
    });

    // Hero slideshow
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);

    // Quick view modal
    window.openModal = function(title, image) {
        document.getElementById('modal').style.display = 'flex';
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-image').src = image;
    };

    window.closeModal = function() {
        document.getElementById('modal').style.display = 'none';
    };

    // Shopping cart
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();

    window.addToCart = function(item) {
        cart.push(item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    window.toggleCart = function() {
        document.getElementById('cart').classList.toggle('active');
    };

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        const cartCount = document.getElementById('cart-count');
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'cart-item';
            div.innerHTML = `<span>${item}</span><button onclick="removeFromCart('${item}')">Remove</button>`;
            cartItems.appendChild(div);
        });
        cartCount.textContent = cart.length;
    }

    window.removeFromCart = function(item) {
        cart = cart.filter(i => i !== item);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    };

    // Testimonials carousel
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial');
    setInterval(() => {
        testimonials[currentTestimonial].classList.remove('active');
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        testimonials[currentTestimonial].classList.add('active');
    }, 4000);

    // Newsletter form
    document.querySelector('.newsletter-section form').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        alert('Thank you for subscribing!');
        this.reset();
    });

    // Footer newsletter form
    document.getElementById('footer-newsletter').addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email.');
            return;
        }
        alert('Thank you for subscribing!');
        this.reset();
    });

    // Contact form validation
    document.getElementById('contact-form').addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const nameError = document.getElementById('name-error');
        const emailError = document.getElementById('email-error');
        const messageError = document.getElementById('message-error');

        nameError.style.display = 'none';
        emailError.style.display = 'none';
        messageError.style.display = 'none';

        let valid = true;
        if (!name) {
            nameError.style.display = 'block';
            document.getElementById('name').classList.add('error');
            valid = false;
        } else {
            document.getElementById('name').classList.remove('error');
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
            emailError.style.display = 'block';
            document.getElementById('email').classList.add('error');
            valid = false;
        } else {
            document.getElementById('email').classList.remove('error');
        }
        if (!message) {
            messageError.style.display = 'block';
            document.getElementById('message').classList.add('error');
            valid = false;
        } else {
            document.getElementById('message').classList.remove('error');
        }

        if (valid) {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        }
    });

    // FAQ accordion
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            content.classList.toggle('active');
        });
    });
});