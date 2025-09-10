document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.category-container');
  const slider = document.querySelector('.slider');
  const sliderWrapper = document.querySelector('.slider-wrapper');
  const leftArrow = document.querySelector('.slider-arrow-left');
  const rightArrow = document.querySelector('.slider-arrow-right');

  // CATEGORY SCROLLER
  if (container) {
    if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '0');

    container.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') container.scrollBy({ left: 120, behavior: 'smooth' });
      else if (e.key === 'ArrowLeft') container.scrollBy({ left: -120, behavior: 'smooth' });
    });

    // Convert vertical wheel to horizontal scroll (trackpads often set deltaX)
    container.addEventListener('wheel', (e) => {
      const delta = (e.deltaX !== 0) ? e.deltaX : e.deltaY;
      if (delta !== 0) {
        e.preventDefault();
        container.scrollLeft += delta;
      }
    }, { passive: false });
  } // <-- Important: close the container if-block here

  // SLIDER SCROLLER (separate)
  if (slider) {
    const wheelToHorizontal = (e) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (delta !== 0) {
        e.preventDefault();
        slider.scrollLeft += delta;
      }
    };

    if (sliderWrapper) sliderWrapper.addEventListener('wheel', wheelToHorizontal, { passive: false });
    slider.addEventListener('wheel', wheelToHorizontal, { passive: false });

    const slideWidth = () => slider.clientWidth;
    const scrollBySlide = (direction) => slider.scrollBy({ left: direction * slideWidth(), behavior: 'smooth' });

    if (leftArrow) leftArrow.addEventListener('click', () => scrollBySlide(-1));
    if (rightArrow) rightArrow.addEventListener('click', () => scrollBySlide(1));
  }
});
