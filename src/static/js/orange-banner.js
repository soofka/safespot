document.addEventListener("DOMContentLoaded", function () {
  const banner = document.getElementById('orange-banner');
  if (banner) {
    const closeBtn = banner.querySelector('.close-banner');
    closeBtn.addEventListener('click', () => {
      banner.classList.add('hidden');
      setTimeout(() => {
        banner.style.display = 'none';
      }, 600);
    });
  }
});
