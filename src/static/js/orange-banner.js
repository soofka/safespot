document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById('orange-banner');
  if (!banner) return; 

  const closeBtn = banner.querySelector('.close-banner');
  if (!closeBtn) return; 

  closeBtn.addEventListener('click', () => {
    banner.style.transition = "opacity 0.3s ease, max-height 0.3s ease, padding 0.3s ease";
    banner.style.opacity = 0;
    banner.style.maxHeight = "0";
    banner.style.padding = "0 24px"; 

    setTimeout(() => {
      banner.style.display = "none";
    }, 300);
  });
});

