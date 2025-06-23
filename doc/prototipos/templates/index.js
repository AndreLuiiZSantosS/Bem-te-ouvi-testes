const carousels = document.querySelectorAll('.carousel');

carousels.forEach((carousel) => {
    let isDragging = false;
    let startX, scrollLeft;

    const stopDragging = () => {
        isDragging = false;
        carousel.classList.remove('dragging');
    };

    carousel.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.classList.add('dragging');
    });

    carousel.addEventListener('mouseleave', stopDragging);
    carousel.addEventListener('mouseup', stopDragging);
    document.addEventListener('mouseup', stopDragging); // <-- Aqui está a chave

    carousel.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 1.5;
        carousel.scrollLeft = scrollLeft - walk;
    });
});

const favoriteBtn = document.getElementById('favoriteBtn');
favoriteBtn.addEventListener('click', () => {
    favoriteBtn.classList.toggle('active');
});