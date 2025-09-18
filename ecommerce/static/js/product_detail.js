// Change main image when thumbnail clicked
    const mainImage = document.getElementById('mainImage');
    const thumbs = document.querySelectorAll('.product-image-thumb');

    thumbs.forEach(thumb => {
        thumb.addEventListener('click', function() {
            mainImage.src = this.src;       // change main image
            thumbs.forEach(t => t.classList.remove('selected'));
            this.classList.add('selected');  // highlight selected thumbnail
        });
    });
// thumbnial zoom
const container = document.querySelector('.position-relative-main');
const image = document.getElementById('mainImage');

container.addEventListener('mousemove', (e) => {
  const { left, top, width, height } = container.getBoundingClientRect();
  const x = ((e.pageX - left - window.scrollX) / width) * 100;
  const y = ((e.pageY - top - window.scrollY) / height) * 100;
  image.style.transformOrigin = `${x}% ${y}%`;
  image.style.transform = "scale(1.5)"; // zoom level
});

container.addEventListener('mouseleave', () => {
  image.style.transformOrigin = "center center";
  image.style.transform = "scale(1)";
});