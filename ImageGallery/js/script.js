
const filterButtons = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('closeBtn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;
let visibleItems = [...galleryItems];

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');
        visibleItems = [];

        galleryItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                visibleItems.push(item);
            } else {
                item.style.display = 'none';
            }
        });
    });
});

function openLightbox(index) {
    currentIndex = index;
    const imgSrc = visibleItems[currentIndex].querySelector('img').src;
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
}

galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const targetIndex = visibleItems.indexOf(item);
        if (targetIndex !== -1) openLightbox(targetIndex);
    });
});

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % visibleItems.length;
    lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
    lightboxImg.src = visibleItems[currentIndex].querySelector('img').src;
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});