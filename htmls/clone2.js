// clone2.js 파일 내용 - 이전에 있었던 모든 내용을 지우고 이 코드를 붙여넣으세요.

// 1. 메인 이미지 변경 함수
function changeImage(src) {
  document.getElementById("main-image").src = src;
}

// 2. 썸네일 슬라이드 기능
let scrollIndex = 0;
const track = document.getElementById("thumbnail-list");
const scrollStep = 100;

function slide(direction) {
  if (!track) {
    console.warn("Element with ID 'thumbnail-list' not found for slide function.");
    return;
  }
  scrollIndex += direction;
  const maxScroll = track.scrollWidth - track.clientWidth;
  const nextScroll = scrollIndex * scrollStep;

  if (nextScroll < 0) {
    scrollIndex = 0;
  } else if (nextScroll > maxScroll) {
    scrollIndex--;
  }

  track.scrollTo({
    left: scrollIndex * scrollStep,
    behavior: 'smooth'
  });
}

// 3. 탭 기능
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}


// --- 4. 장바구니 관련 기능 (핵심 변경 부분: 두 가지 함수 사용) ---

// 페이지 로드 시 localStorage에서 'cartCount' 값을 가져와 cartTotal 초기화
// 값이 없으면 0으로 초기화됩니다.
let cartTotal = localStorage.getItem('cartCount') ? parseInt(localStorage.getItem('cartCount')) : 0;

// DOM이 완전히 로드된 후, 초기 cartTotal 값을 화면의 뱃지에 표시하고 이벤트 리스너 추가
document.addEventListener('DOMContentLoaded', () => {
  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = cartTotal;
  }

  // 장바구니 아이콘(이미지)에 클릭 이벤트 리스너 추가: 클릭 시 초기화
  const cartImageLink = document.querySelector('header nav li a[style*="position: relative"]');
  if (cartImageLink) {
    cartImageLink.addEventListener('click', function (event) {
      event.preventDefault(); // 기본 링크 이동 동작 방지
      resetCartCount(); // 장바구니 초기화 함수 호출
    });
  }
});

// 함수 1: 'Cart' 버튼 클릭 시 장바구니 개수 1 증가
function increaseCartCount() {
  cartTotal++;
  localStorage.setItem('cartCount', cartTotal); // localStorage에 업데이트된 값 저장

  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = cartTotal; // 화면에 업데이트된 값으로 표시
  }
  console.log("장바구니 개수 증가:", cartTotal); // 디버깅을 위한 로그
}

// 함수 2: 장바구니 아이콘 클릭 시 장바구니 개수 0으로 초기화
function resetCartCount() {
  cartTotal = 0;
  localStorage.setItem('cartCount', cartTotal); // localStorage에 0 저장

  const badge = document.getElementById('cart-count');
  if (badge) {
    badge.textContent = cartTotal; // 화면에 0으로 업데이트
  }
  console.log("장바구니가 초기화되었습니다. 현재 개수:", cartTotal); // 디버깅을 위한 로그
}


// --- 5. 드래그 스크롤 기능 (이 HTML에는 'scroll-container' 요소가 없음) ---
const scrollContainer = document.getElementById("scroll-container");

if (scrollContainer) {
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
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mouseup', () => {
    isDown = false;
    scrollContainer.classList.remove('active');
  });

  scrollContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - scrollContainer.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainer.scrollLeft = scrollLeft - walk;
  });
}


// --- 6. 비디오 자동 재생/정지 기능 (이 HTML에는 'mainVideo' 요소가 없음) ---
const video = document.getElementById('mainVideo');

if (video) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        video.play();
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
}