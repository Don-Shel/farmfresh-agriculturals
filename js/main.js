(function ($) {
    "use strict";

    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Product carousel
    $(".product-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            },
            1200:{
                items:4
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });
    
})(jQuery);


(function() {
    // https://dashboard.emailjs.com/admin/account
    emailjs.init('-7puQ9w9wja02eQTu');
})();
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;

    // Send email using EmailJS
    emailjs.send("service_h3o76q3", "template_2ujvk4d", {
        name: name,
        email: email,
        subject: subject,
        message: message
    }).then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        document.getElementById('status-message').textContent = 'Message sent successfully!';
        document.getElementById('status-message').style.color = 'green';
        // Clear form fields
        document.getElementById('contact-form').reset();
    }, function(error) {
        console.log('FAILED...', error);
        document.getElementById('status-message').textContent = 'Failed to send message. Please try again.';
        document.getElementById('status-message').style.color = 'red';
    });
});

//!PAGINATION SECTION
// Sample book data
const books = [
    { title: "The Benefits of Organic Farming: Why Choosing Organic Matters" },
    { title: "Modern Farming Techniques: How Technology is Revolutionizing Agriculture" },
    { title: "1984", author: "George Orwell" },
    { title: "Pride and Prejudice", author: "Jane Austen" },
    { title: "The Catcher in the Rye", author: "J.D. Salinger" },
    { title: "The Hobbit", author: "J.R.R. Tolkien" },
    { title: "Brave New World", author: "Aldous Huxley" },
    { title: "The Lord of the Rings", author: "J.R.R. Tolkien" },
    { title: "Animal Farm", author: "George Orwell" },
    { title: "The Da Vinci Code", author: "Dan Brown" },
    { title: "The Alchemist", author: "Paulo Coelho" },
    { title: "The Hunger Games", author: "Suzanne Collins" },
    { title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling" },
    { title: "The Girl with the Dragon Tattoo", author: "Stieg Larsson" },
    { title: "The Kite Runner", author: "Khaled Hosseini" }
];

const itemsPerPage = 5;
let currentPage = 1;

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const htmlElement = document.documentElement;

darkModeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
});

// Pagination functionality
function displayBooks(page) {
    const bookList = document.getElementById('bookList');
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const booksToDisplay = books.slice(startIndex, endIndex);

    bookList.innerHTML = booksToDisplay.map(book => `
        <div class="neumorphic-inset p-4 mb-4 hover:scale-105 transition duration-300">
            <h2 class="text-xl font-semibold text-gray-800 dark:text-gray-200">${book.title}</h2>
            <p class="text-gray-600 dark:text-gray-400">${book.author}</p>
        </div>
    `).join('');

    // Animate new items
    gsap.from('.neumorphic-inset', {
        y: 50,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: 'power2.out'
    });
}

function setupPagination() {
    const pageCount = Math.ceil(books.length / itemsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = '';

    for (let i = 1; i <= pageCount; i++) {
        const button = document.createElement('button');
        button.innerText = i;
        button.classList.add('neumorphic', 'pagination-button', 'px-4', 'py-2', 'text-gray-800', 'dark:text-gray-200');
        if (i === currentPage) {
            button.classList.add('bg-blue-500', 'text-white');
        }
        button.addEventListener('click', () => {
            currentPage = i;
            displayBooks(currentPage);
            updatePaginationButtons();
        });
        paginationContainer.appendChild(button);
    }
}

function updatePaginationButtons() {
    const buttons = document.querySelectorAll('.pagination-button');
    buttons.forEach((button, index) => {
        if (index + 1 === currentPage) {
            button.classList.add('bg-blue-500', 'text-white');
        } else {
            button.classList.remove('bg-blue-500', 'text-white');
        }
    });
}

// Initial setup
displayBooks(currentPage);
setupPagination();

// Add a floating animation to the header
gsap.to('header', {
    y: -10,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: 'power1.inOut'
});