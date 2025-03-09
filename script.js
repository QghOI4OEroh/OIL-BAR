// Данные продуктов
const products = [
  { "id": 1, "name": "Моторное масло ЛУКОЙЛ", "price": 8500, "image": '<img src="images/photo_3_2024-12-13_22-10-37.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 2, "name": "Моторное масло Газпром нефть", "price": 6500, "image": '<img src="images/photo_7_2024-11-24_23-02-09.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 3, "name": "Моторное масло Afinol", "price": 13600, "image": '<img src="images/photo_2_2024-12-13_22-10-37.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 4, "name": "Моторное масло Titan", "price": 13700, "image": '<img src="images/photo_25_2024-12-15_21-37-16.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 5, "name": "Моторное масло Mobil", "price": 21000, "image": '<img src="images/photo_48_2024-12-13_23-09-05.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 6, "name": "Моторное масло Areca", "price": 16500, "image": '<img src="images/photo_26_2024-12-13_23-09-04.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 7, "name": "Моторное масло Sintek", "price": 6000, "image": '<img src="images/photo_38_2024-12-13_23-09-04.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 8, "name": "Моторное масло Kixx", "price": 13000, "image": '<img src="images/photo_24_2024-12-13_22-10-37.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 9, "name": "Моторное масло Zic", "price": 13600, "image": '<img src="images/photo_38_2024-11-24_23-02-10.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 10, "name": "Моторное масло Takayama", "price": 11800, "image": '<img src="images/photo_46_2024-11-24_23-02-10.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 11, "name": "Моторное масло Eneos", "price": 15900, "image": '<img src="images/photo_30_2024-12-13_22-10-37.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 12, "name": "Моторное масло Shell", "price": 14200, "image": '<img src="images/photo_32_2024-12-13_22-10-37.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 13, "name": "Антифриз Felix", "price": 9900, "image": '<img src="images/photo_48_2024-12-15_21-37-16.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 14, "name": "Антифриз Sintek", "price": 7500, "image": '<img src="images/photo_41_2024-12-13_22-10-37.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 15, "name": "Антифриз Nord", "price": 7800, "image": '<img src="images/photo_49_2024-11-24_23-02-10.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 16, "name": "Антифриз Valesco", "price": 7800, "image": '<img src="images/photo_44_2024-12-13_22-10-37.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 17, "name": "Антифриз Teta", "price": 7800, "image": '<img src="images/photo_46_2024-12-13_22-10-37.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 18, "name": "Антифриз Полярник", "price": 4300, "image": '<img src="images/photo_49_2024-11-24_23-02-10.jpg" class="selected-product-image" alt="Выбранный продукт">' },
  { "id": 19, "name": "Моторное масло Magnum", "price": 11500, "image": '<img src="images/photo_47_2024-11-24_23-02-10.jpg" class="selected-product-image" alt="Выбранный продукт">' }
];

// Функция отображения товаров
function displayProducts(filteredProducts) {
  const catalogItemsDiv = document.querySelector('.catalog-items');
  catalogItemsDiv.innerHTML = '';
  
  filteredProducts.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'catalog-item';
    productCard.innerHTML = `
      ${product.image}
      <h4>${product.name}</h4>
      <p>Цена: ${product.price} KZT</p>
    `;
    catalogItemsDiv.appendChild(productCard);
  });
}

// Отображаем все товары изначально
displayProducts(products);

// Обработка поиска
document.getElementById('searchButton').addEventListener('click', () => {
  const query = document.getElementById('search').value.toLowerCase();
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts.length ? filteredProducts : []);
});

// Обработка выбора товара
document.getElementById('product').addEventListener('change', function () {
  const selectedProduct = products.find(p => p.id === parseInt(this.value));
  document.querySelector('.selected-product-image').outerHTML = selectedProduct.image;
});

// Форма заказа
document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();
  
  const city = this.city.value;
  const productId = parseInt(this.product.value);
  const quantity = parseInt(this.quantity.value);
  
  const selectedProduct = products.find(p => p.id === productId);
  const basePrice = selectedProduct.price * quantity;
  
  let deliveryFee = 0;
  if (city === 'Алматы') deliveryFee = 2000;
  if (city === 'Астана') deliveryFee = 1500;
  if (city === 'Шымкент') deliveryFee = 2500;

  const totalPrice = basePrice + deliveryFee;

  alert(`Итог заказа:
  Продукт: ${selectedProduct.name}
  Количество: ${quantity}
  Город: ${city}
  Стоимость доставки: ${deliveryFee} KZT
  Общая стоимость: ${totalPrice} KZT`);
});

  
  // Отображение продуктов в каталоге
  const catalogItemsDiv = document.querySelector('.catalog-items');
  const productSelect = document.getElementById('product');
  const searchInput = document.getElementById('search');
  const searchButton = document.getElementById('searchButton');
  
  // Функция для отображения продуктов
  function displayProducts(filteredProducts) {
    catalogItemsDiv.innerHTML = ''; // Очистка каталога
    filteredProducts.forEach(product => {
      const productCard = document.createElement('div');
      productCard.className = 'catalog-item';
      productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h4>${product.name}</h4>
        <p>Цена: ${product.price} KZT</p>
      `;
      catalogItemsDiv.appendChild(productCard);
    });
  }
  
  // Изначально отображаем все продукты
  displayProducts(products);
  
  // Заполняем выпадающий список
  products.forEach(product => {
    const option = document.createElement('option');
    option.value = product.id;

option.textContent = product.name;
    productSelect.appendChild(option);
  });
  
  // Поиск продуктов
  searchButton.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product =>
      product.name.toLowerCase().includes(query)
    );
    if (filteredProducts.length === 0) {
      catalogItemsDiv.innerHTML = '<p>Товар не найден</p>';
    } else {
      displayProducts(filteredProducts);
    }
  });
  
  productSelect.addEventListener('change', () => {
    const selectedProduct = products.find(p => p.id === parseInt(productSelect.value));
    document.querySelector('.selected-product-image').src = selectedProduct.image;
  });
  
  // В HTML рядом с формой
  <img> src="images/default.jpg" class="selected-product-image" alt="Выбранный продукт"</img>
  
  
  // Обработка формы заказа
  const form = document.getElementById('orderForm');
  form.addEventListener('submit', function(e) {
    e.preventDefault();
  
    const name = form.name.value;
    const city = form.city.value;
    const productId = parseInt(form.product.value);
    const quantity = parseInt(form.quantity.value);
  
    const selectedProduct = products.find(p => p.id === productId);
    const basePrice = selectedProduct.price * quantity;
  
    // Определение стоимости доставки
    let deliveryFee = 0;
    if (city === 'Алматы') deliveryFee = 2000;
    if (city === 'Астана') deliveryFee = 1500;
    if (city === 'Шымкент') deliveryFee = 2500;
    if (city === 'Павлодар') deliveryFee = 1000;
    if (city === 'Актобе') deliveryFee = 1000;
    if (city === 'Туркестан') deliveryFee = 1400;
    if (city === 'Уральск') deliveryFee = 1200;
    if (city === 'Усть-Каменногорск') deliveryFee = 2000;
    if (city === 'Актау') deliveryFee = 1800;
    if (city === 'Атырау') deliveryFee = 1800;
    if (city === 'Тараз') deliveryFee = 2000;
    if (city === 'Петропавловск') deliveryFee = 700;
    if (city === 'Кокшетау') deliveryFee = 1000;
    if (city === 'Семей') deliveryFee = 1800;
  
    const totalPrice = basePrice + deliveryFee;
  
    alert(`Итог заказа:
    Продукт: ${selectedProduct.name}
    Количество: ${quantity}
    Город: ${city}
    Стоимость доставки: ${deliveryFee} KZT
    Общая стоимость: ${totalPrice} KZT`);
  
    // Здесь можно отправить данные на сервер
  });
