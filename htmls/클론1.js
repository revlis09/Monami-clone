const scrollContainer = document.getElementById("scroll-container");

let isDown = false;
let startX;
let scrollLeft;

scrollContainer.addEventListener('mousedown', (e) => {
  isDown = true;
  scrollContainer.classList.add('active');
  startX = e.pageX - scrollContainer.offsetLeft;
  scrollLeft = scrollContainer.scrollLeft;
});

scrollContainer.addEventListener('mouseleave', () => {
  isDown = false;
});

scrollContainer.addEventListener('mouseup', () => {
  isDown = false;
});

scrollContainer.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - scrollContainer.offsetLeft;
  const walk = (x - startX) * 2; // 속도 조절
  scrollContainer.scrollLeft = scrollLeft - walk;
});

const video = document.getElementById('mainVideo');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      if (video.paused) video.play();
      video.muted = false;
    } else {
      video.pause();
      video.muted = true;
    }
  });
}, {
  threshold: 0.5,
});

observer.observe(video);

