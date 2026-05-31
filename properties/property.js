let __photoCount = 0;
let __photoIdx = 0;

function initGallery(count) {
  __photoCount = count;
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      __photoIdx = parseInt(item.getAttribute('data-idx'), 10);
      openLightbox();
    });
  });
  document.addEventListener('keydown', e => {
    if (!document.getElementById('lightbox').classList.contains('open')) return;
    if (e.key === 'Escape') closeLightbox();
    else if (e.key === 'ArrowRight') nextPhoto();
    else if (e.key === 'ArrowLeft') prevPhoto();
  });
}

function __photoFile(i) {
  return String(i + 1).padStart(2, '0') + '.jpeg';
}

function openLightbox() {
  document.getElementById('lightboxImg').src = __photoFile(__photoIdx);
  document.getElementById('lightboxCounter').textContent = (__photoIdx + 1) + ' / ' + __photoCount;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
function nextPhoto() {
  __photoIdx = (__photoIdx + 1) % __photoCount;
  openLightbox();
}
function prevPhoto() {
  __photoIdx = (__photoIdx - 1 + __photoCount) % __photoCount;
  openLightbox();
}
