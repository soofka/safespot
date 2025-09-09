document.addEventListener("DOMContentLoaded", function() {
  const banner = document.getElementById('orange-banner');
  if (!banner) return;

  const closeBtn = banner.querySelector('.close-banner');
  if (!closeBtn) return;

  closeBtn.addEventListener('click', () => {
    banner.style.display = "none"; // immediately hides the banner
  });
});

