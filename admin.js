document.addEventListener("DOMContentLoaded", () => {
    const tableBody = document.querySelector("#productTable tbody");
    const addProductForm = document.getElementById("addProductForm");
  
    // Получение товаров с сервера
    function loadProducts() {
      fetch('/products')
        .then(response => response.json())
        .then(products => {
          tableBody.innerHTML = "";
          products.forEach(product => {
            const row = document.createElement("tr");
            row.innerHTML = `
              <td>${product.id}</td>
              <td><input type="text" value="${product.name}" data-id="${product.id}" class="edit-name"></td>
              <td><input type="number" value="${product.price}" data-id="${product.id}" class="edit-price"></td>
              <td><button class="delete-btn" data-id="${product.id}">Удалить</button></td>
            `;
            tableBody.appendChild(row);
          });
  
          attachEventListeners();
        });
    }
  
    // Добавление нового товара
    addProductForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("productName").value;
      const price = parseInt(document.getElementById("productPrice").value);
      const image = document.getElementById("productImage").value;
  
      fetch('/add-product', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, price, image })
      }).then(() => {
        loadProducts();
        addProductForm.reset();
      });
    });
  
    // Редактирование и удаление товаров
    function attachEventListeners() {
      document.querySelectorAll(".edit-name, .edit-price").forEach(input => {
        input.addEventListener("change", () => {
          const id = input.dataset.id;
          const field = input.classList.contains("edit-name") ? "name" : "price";
          const value = input.value;
  
          fetch('/update-product', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, field, value })
          });
        });
      });
  
      document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const id = btn.dataset.id;
          fetch('/delete-product', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id })
          }).then(() => loadProducts());
        });
      });
    }
  
    loadProducts();
  });
  