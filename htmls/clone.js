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

// --- 여기부터 장바구니 관련 수정 부분 ---

// 1. 페이지 로드 시 localStorage에서 'cartCount' 값을 가져와 cartTotal 초기화
//    만약 localStorage에 값이 없다면 0으로 초기화합니다.
let cartTotal = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

// 2. DOM이 완전히 로드된 후, 초기 cartTotal 값을 화면의 뱃지에 표시
document.addEventListener('DOMContentLoaded', () => {
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = cartTotal;
  }
});

// 3. 'Cart' 버튼이 클릭될 때 호출될 함수: 장바구니 개수를 0으로 초기화
function resetCartCount() {
  cartTotal = 0; // 장바구니 총 개수를 0으로 설정
  localStorage.setItem('cartCount', cartTotal); // localStorage에도 0으로 저장

  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = cartTotal; // 화면에 0으로 업데이트
  }
}
// --- 장바구니 관련 수정 부분 끝 ---