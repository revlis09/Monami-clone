const products = [
  { id: 1, name: '볼펜', price: 1000 },
  { id: 2, name: '연필', price: 500 },
  { id: 3, name: '지우개', price: 700 },
];

const cart = {};

const productList = document.getElementById('product-list');
const cartList = document.getElementById('cart-list');
const totalPrice = document.getElementById('total');

// 상품 목록 출력
products.forEach(product => {
  const div = document.createElement('div');
  div.className = 'product';
  div.innerHTML = `
    <p>${product.name} - ${product.price}원</p>
    <button onclick="addToCart(${product.id})">장바구니에 담기</button>
  `;
  productList.appendChild(div);
});

// 장바구니에 담기
function addToCart(id) {
  const product = products.find(p => p.id === id);
  if (cart[id]) {
    cart[id].quantity++;
  } else {
    cart[id] = { ...product, quantity: 1 };
  }
  renderCart(); // 🟡 장바구니 UI 즉시 갱신
}

// 장바구니 출력
function renderCart() {
  cartList.innerHTML = '';
  let total = 0;

  for (const key in cart) {
    const item = cart[key];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement('div');
    div.innerHTML = `
      <strong>${item.name}</strong> 
      - ${item.quantity}개 
      - ${itemTotal}원 
      <button onclick="changeQuantity(${item.id}, 1)">+</button>
      <button onclick="changeQuantity(${item.id}, -1)">-</button>
    `;
    cartList.appendChild(div);
  }

  totalPrice.textContent = total;
}

// 수량 조절
function changeQuantity(id, delta) {
  if (!cart[id]) return;

  cart[id].quantity += delta;
  if (cart[id].quantity <= 0) {
    delete cart[id]; // 수량 0이면 제거
  }
  renderCart(); // UI 갱신
}
