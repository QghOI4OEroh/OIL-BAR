// Данные продуктов
const products = [
  { "id": 1, "name": "Моторное масло ЛУКОЙЛ", "price": 8500, "image": "images/photo_3_2024-12-13_22-10-37.jpg" },
  { "id": 2, "name": "Моторное масло Газпром нефть", "price": 6500, "image": "images/photo_7_2024-11-24_23-02-09.jpg" },
  { "id": 3, "name": "Моторное масло Afinol", "price": 13600, "image": "images/photo_2_2024-12-13_22-10-37.jpg" },
  { "id": 4, "name": "Моторное масло Titan", "price": 13700, "image": "images/photo_25_2024-12-15_21-37-16.jpg" },
  { "id": 5, "name": "Моторное масло Mobil", "price": 21000, "image": "images/photo_48_2024-12-13_23-09-05.jpg" },
  { "id": 6, "name": "Моторное масло Areca", "price": 16500, "image": "images/photo_26_2024-12-13_23-09-04.jpg" },
  { "id": 7, "name": "Моторное масло Sintek", "price": 6000, "image": "images/photo_38_2024-12-13_23-09-04.jpg" },
  { "id": 8, "name": "Моторное масло Afinol", "price": 13600, "image": "images/photo_2_2024-12-13_22-10-37.jpg" },
  { "id": 9, "name": "Моторное масло Afinol", "price": 13600, "image": "images/photo_2_2024-12-13_22-10-37.jpg" },
  { "id": 10, "name": "Моторное масло Kixx", "price": 13000, "image": "images/photo_24_2024-12-13_22-10-37.jpg" },
  { "id": 11, "name": "Моторное масло Zic", "price": 13600, "image": "images/photo_38_2024-11-24_23-02-10.jpg" },
  { "id": 12, "name": "Моторное масло Takayama", "price": 11800, "image": "images/photo_46_2024-11-24_23-02-10.jpg" },
  { "id": 13, "name": "Моторное масло Eneos", "price": 15900, "image": "images/photo_30_2024-12-13_22-10-37.jpg" },
  { "id": 14, "name": "Моторное масло Shell", "price": 14200, "image": "images/photo_32_2024-12-13_22-10-37.jpg" },
  { "id": 15, "name": "Моторное масло Роснефть", "price": 10300, "image": "images/photo_33_2024-12-13_22-10-37.jpg" },
  { "id": 16, "name": "Моторное масло Sintec", "price": 7400, "image": "images/photo_18_2024-12-13_22-10-37.jpg" },
  { "id": 17, "name": "Моторное масло Petro-Canada", "price": 26500, "image": "images/photo_47_2024-12-15_21-37-16.jpg" },
  { "id": 18, "name": "Моторное масло Rolf", "price": 9500, "image": "images/photo_50_2024-11-24_23-02-10.jpg" },
  { "id": 19, "name": "Моторное масло G-Energy", "price": 9500, "image": "images/photo_50_2024-12-13_23-09-05.jpg" },
  { "id": 20, "name": "Антифриз Felix", "price": 9900, "image": "images/photo_48_2024-12-15_21-37-16.jpg" },
  { "id": 21, "name": "Антифриз Sintek", "price": 7500, "image": "images/photo_41_2024-12-13_22-10-37.jpg" },
  { "id": 22, "name": "Антифриз Nord", "price": 7800, "image": "images/photo_49_2024-11-24_23-02-10.jpg" },
  { "id": 23, "name": "Антифриз Valesco", "price": 7800, "image": "images/photo_44_2024-12-13_22-10-37.jpg" },
  { "id": 24, "name": "Антифриз Teta", "price": 7800, "image": "images/photo_46_2024-12-13_22-10-37.jpg" },
  { "id": 25, "name": "Антифриз Полярник", "price": 4300, "image": "images/photo_49_2024-11-24_23-02-10.jpg" },
  { "id": 26, "name": "Моторное масло Magnum", "price": 11500, "image": "images/photo_47_2024-11-24_23-02-10.jpg" }
]
  
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
  
    const totalPrice = basePrice + deliveryFee;
  
    alert(`Итог заказа:
    Продукт: ${selectedProduct.name}
    Количество: ${quantity}
    Город: ${city}
    Стоимость доставки: ${deliveryFee} KZT
    Общая стоимость: ${totalPrice} KZT`);
  
    // Здесь можно отправить данные на сервер
  });
  