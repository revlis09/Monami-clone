
function changeImage(src) {
  document.getElementById("main-image").src = src;
}
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}


// 메인 이미지 변경 함수
function changeImage(src) {
  document.getElementById("main-image").src = src;
}

// 썸네일 슬라이드 기능
let scrollIndex = 0;
const track = document.getElementById("thumbnail-list");
const scrollStep = 100;

function slide(direction) {
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

// 탭 기능
function showTab(id) {
  document.querySelectorAll('.tab-content').forEach(tab => tab.style.display = 'none');
  document.getElementById(id).style.display = 'block';
}


let scrollAmount = 0;
const container = document.getElementById("thumbnail-list");

function slide(direction) {
  const scrollStep = 100;
  scrollAmount += direction * scrollStep;
  container.scrollLeft += direction * scrollStep;
}

function changeImage(src) {
  document.getElementById("main-image").src = src;
}