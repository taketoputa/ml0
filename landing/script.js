// Shop
function redirectToShop() {
    window.location.href = "../shop/index.html";
}

// Open Cart Popup
function openPopup() {
    var popup = document.getElementById('popup2');
    popup.style.display = 'block';
}

// Tutup Popup
function closePopup() {
    var popup = document.getElementById('popup2');
    popup.style.display = 'none';
}

///////////////////////////////////////////////////////////////////////////////////

// Icon Cart di Klik
var cartIcon = document.querySelector('.nav-cart-button');
cartIcon.addEventListener('click', openPopup);

// Message di Sentuh
var triggerImage = document.querySelector('.popup-imagefix');
var popup = document.getElementById('popup');
        
triggerImage.addEventListener('mouseover', function() {
popup.style.display = 'block';
});// Mouse In

triggerImage.addEventListener('mouseout', function() {
popup.style.display = 'none';
});// Mouse Out

//////////////////////////////////////////////////////////////////////////////////

// Sliders
var currentSlide = 0;
var slides = document.querySelectorAll('.slide'); // ambil gambarnya

function showSlide(n) {
    slides[currentSlide].style.display = 'none'; // hide gambar
    currentSlide = (n + slides.length) % slides.length; // hitung index
    slides[currentSlide].style.display = 'block'; // show gambar yg baru
}

// Panah Kanan
    document.getElementById('next').addEventListener('click', function() {
    showSlide(currentSlide + 1);
});

// Panah Kri
    document.getElementById('prev').addEventListener('click', function() {
    showSlide(currentSlide - 1);
});

