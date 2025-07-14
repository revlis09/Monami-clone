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
      video.play();
      video.muted = false; // 보이면 소리 켬
    } else {
      video.pause();       // 화면에서 안 보이면 정지
      video.muted = true;  // 음소거
    }
  });
}, {
  threshold: 0.5, // 화면에 절반 이상 보여야 "보임"으로 간주
});

observer.observe(video);
