const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Путь к файлу с товарами
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// Получение всех товаров
app.get('/products', async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(data);
    res.json(products);
  } catch (error) {
    console.error('Ошибка при чтении товаров:', error);
    res.status(500).json({ message: 'Не удалось получить список товаров.' });
  }
});

// Добавление нового товара
app.post('/add-product', async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(data);

    const newProduct = {
      id: products.length ? products[products.length - 1].id + 1 : 1,
      name: req.body.name,
      price: req.body.price,
      image: req.body.image
    };

    products.push(newProduct);
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.status(200).json({ message: 'Товар успешно добавлен.', product: newProduct });
  } catch (error) {
    console.error('Ошибка при добавлении товара:', error);
    res.status(500).json({ message: 'Не удалось добавить товар.' });
  }
});

// Обновление товара
app.post('/update-product', async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    const products = JSON.parse(data);

    const product = products.find(p => p.id == req.body.id);
    if (product) {
      product[req.body.field] = req.body.value;
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
      res.status(200).json({ message: 'Товар успешно обновлён.', product });
    } else {
      res.status(404).json({ message: 'Товар не найден.' });
    }
  } catch (error) {
    console.error('Ошибка при обновлении товара:', error);
    res.status(500).json({ message: 'Не удалось обновить товар.' });
  }
});

// Удаление товара
app.post('/delete-product', async (req, res) => {
  try {
    const data = await fs.readFile(PRODUCTS_FILE, 'utf8');
    let products = JSON.parse(data);

    const productIndex = products.findIndex(p => p.id == req.body.id);
    if (productIndex !== -1) {
      const [deletedProduct] = products.splice(productIndex, 1);
      await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
      res.status(200).json({ message: 'Товар успешно удалён.', deletedProduct });
    } else {
      res.status(404).json({ message: 'Товар не найден.' });
    }
  } catch (error) {
    console.error('Ошибка при удалении товара:', error);
    res.status(500).json({ message: 'Не удалось удалить товар.' });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}/`);
});
