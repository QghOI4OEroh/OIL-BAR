// Данные продуктов
const products = [
  { id: 1, name: "Моторное масло ЛУКОЙЛ", price: 8500, image: "images/photo_3_2024-12-13_22-10-37.jpg" },
  { id: 2, name: "Моторное масло Газпром нефть", price: 6500, image: "images/photo_7_2024-11-24_23-02-09.jpg" },
  { id: 3, name: "Моторное масло Afinol", price: 13600, image: "images/photo_2_2024-12-13_22-10-37.jpg" },
  { id: 4, name: "Моторное масло Titan", price: 13700, image: "images/photo_25_2024-12-15_21-37-16.jpg" },
  { id: 5, name: "Моторное масло Mobil", price: 21000, image: "images/photo_48_2024-12-13_23-09-05.jpg" },
  { id: 6, name: "Моторное масло Areca", price: 16500, image: "images/photo_26_2024-12-13_23-09-04.jpg" },
  { id: 7, name: "Моторное масло Sintek", price: 6000, image: "images/photo_38_2024-12-13_23-09-04.jpg" },
  { id: 8, name: "Моторное масло Afinol", price: 13600, image: "images/photo_2_2024-12-13_22-10-37.jpg" },
  { id: 9, name: "Моторное масло Afinol", price: 13600, image: "images/photo_2_2024-12-13_22-10-37.jpg" },
  { id: 10, name: "Моторное масло Kixx", price: 13000, image: "images/photo_24_2024-12-13_22-10-37.jpg" },
  { id: 11, name: "Моторное масло Zic", price: 13600, image: "images/photo_38_2024-11-24_23-02-10.jpg" },
  { id: 12, name: "Моторное масло Takayama", price: 11800, image: "images/photo_46_2024-11-24_23-02-10.jpg" },
  { id: 13, name: "Моторное масло Eneos", price: 15900, image: "images/photo_30_2024-12-13_22-10-37.jpg" },
  { id: 14, name: "Моторное масло Shell", price: 14200, image: "images/photo_32_2024-12-13_22-10-37.jpg" },
  { id: 15, name: "Моторное масло Роснефть", price: 10300, image: "images/photo_33_2024-12-13_22-10-37.jpg" },
  { id: 16, name: "Моторное масло Sintec", price: 7400, image: "images/photo_18_2024-12-13_22-10-37.jpg" },
  { id: 17, name: "Моторное масло Petro-Canada", price: 26500, image: "images/photo_47_2024-12-15_21-37-16.jpg" },
  { id: 18, name: "Моторное масло Rolf", price: 9500, image: "images/photo_50_2024-11-24_23-02-10.jpg" },
  { id: 19, name: "Моторное масло G-Energy", price: 9500, image: "images/photo_50_2024-12-13_23-09-05.jpg" },
  { id: 20, name: "Антифриз Felix", price: 9900, image: "images/photo_48_2024-12-15_21-37-16.jpg" },
  { id: 21, name: "Антифриз Sintek", price: 7500, image: "images/photo_41_2024-12-13_22-10-37.jpg" },
  { id: 22, name: "Антифриз Nord", price: 7800, image: "images/photo_49_2024-11-24_23-02-10.jpg" },
  { id: 23, name: "Антифриз Valesco", price: 7800, image: "images/photo_44_2024-12-13_22-10-37.jpg" },
  { id: 24, name: "Антифриз Teta", price: 7800, image: "images/photo_46_2024-12-13_22-10-37.jpg" },
  { id: 25, name: "Антифриз Полярник", price: 4300, image: "images/photo_49_2024-11-24_23-02-10.jpg" },
  { id: 26, name: "Моторное масло Magnum", price: 11500, image: "images/photo_47_2024-11-24_23-02-10.jpg" }
];


// Список стоимости доставки
const deliveryPrices = {
  "Алматы": 2000,
  "Астана": 1500,
  "Шымкент": 2500,
  "Павлодар": 1000,
  "Актобе": 1000,
  "Туркестан": 1400,
  "Уральск": 1200,
  "Усть-Каменногорск": 2000,
  "Актау": 1800,
  "Атырау": 1800,
  "Тараз": 2000,
  "Петропавловск": 700,
  "Кокшетау": 1000,
  "Семей": 1800
};

// Выбор элементов
const catalogItemsDiv = document.querySelector('.catalog-items');
const productSelect = document.getElementById('product');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('searchButton');
const orderForm = document.getElementById('orderForm');
const selectedProductImage = document.querySelector('.selected-product-image');

// Функция для отображения товаров
function displayProducts(filteredProducts) {
  catalogItemsDiv.innerHTML = '';
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'catalog-item';
    productCard.innerHTML = `
      <img src="${product.image}" class="product-image" alt="${product.name}">
      <h4>${product.name}</h4>
      <p>Цена: ${product.price} KZT</p>
    `;
    catalogItemsDiv.appendChild(productCard);
  });
}

// Изначально отображаем все продукты
displayProducts(products);

// Заполняем выпадающий список товаров
products.forEach(product => {
  const option = document.createElement('option');
  option.value = product.id;
  option.textContent = product.name;
  productSelect.appendChild(option);
});

// Поиск товаров
searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim().toLowerCase();
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(query)
  );
  catalogItemsDiv.innerHTML = filteredProducts.length
    ? displayProducts(filteredProducts)
    : '<p>Товар не найден</p>';
});

// Обработка выбора товара
productSelect.addEventListener('change', () => {
  const selectedProduct = products.find(p => p.id === parseInt(productSelect.value));
  if (selectedProduct) {
    selectedProductImage.src = selectedProduct.image;
    selectedProductImage.alt = selectedProduct.name;
  }
});

// Обработка формы заказа
orderForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = this.name.value.trim();
  const city = this.city.value;
  const productId = parseInt(this.product.value);
  const quantity = parseInt(this.quantity.value);

  if (!name || !city || !productId || !quantity || quantity < 1) {
    alert("Пожалуйста, заполните все поля корректно.");
    return;
  }

  const selectedProduct = products.find(p => p.id === productId);
  const basePrice = selectedProduct.price * quantity;
  const deliveryFee = deliveryPrices[city] || 0;
  const totalPrice = basePrice + deliveryFee;

  alert(`Итог заказа:
  Имя: ${name}
  Продукт: ${selectedProduct.name}
  Количество: ${quantity}
  Город: ${city}
  Стоимость доставки: ${deliveryFee} KZT
  Общая стоимость: ${totalPrice} KZT`);

  // Здесь можно отправить данные на сервер
});
