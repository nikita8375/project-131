const products = [
    { 
        id: 1, 
        name: "Пенная Пушка", 
        category: "элемент развлечения", 
        price: 10000, 
        image: './image/orig.png'     
    }, 

    { 
        id: 3, 
        name: "Кресла", 
        category: "Элемент декора", 
        price: 12000,
        image: './image/kreslo.jpg'      
    },
    { 
        id: 4, 
        name: "песковая покраска", 
        category: "услуга", 
        price: 7000,
        image: './image/pokraska.jpg'      
    },
    { 
        id: 5, 
        name: "различные мелкие детали", 
        category: "предмет", 
        price: "договорная",
        image: './image/rezka.png'      
    },
    { 
        id: 6, 
        name: "перилла", 
        category: "декор двора", 
        price: 18000,
        image: './image/perila.jpg'      
    },
        { 
        id: 7, 
        name: "забор", 
        category: "декор двора", 
        price: 4000,
        image: './image/zabor.jpg'      
    },
        { 
        id: 8, 
        name: "ворота", 
        category: "декор двора", 
        price: 20000,
        image: './image/im.jpg'      
    },
        { 
        id: 9, 
        name: "фонари", 
        category: "элемент освещения двора", 
        price: 7000,
        image: './image/fonar.jpg'      
    },
        { 
        id: 10, 
        name: "люстры", 
        category: "элемент освещения дома", 
        price: 10000,
        image: './image/lustra.jpg'      
    }
]
let filteredProducts = [...products];




function updateProductsDisplay() {

  const searchValue = document.getElementById('search-input').value.toLowerCase();


  const sortValue = document.getElementById('sort-select').value;


  filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchValue) ||
    product.category.toLowerCase().includes(searchValue)
  );


  if (sortValue === 'price-asc') {
    filteredProducts.sort((a, b) => a.price - b.price);  // по возрастанию цены
  } else if (sortValue === 'price-desc') {
    filteredProducts.sort((a, b) => b.price - a.price);  // по убыванию цены
  } else if (sortValue === 'name-asc') {
    filteredProducts.sort((a, b) => a.name.localeCompare(b.name));  // по названию A→Я
  } else if (sortValue === 'name-desc') {
    filteredProducts.sort((a, b) => b.name.localeCompare(a.name));  // по названию Я→A
  }

  renderProducts(filteredProducts);
}



function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-count').textContent = count;
}

function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}


function createProductCard(product) { 
    return `
    <div class="product-card" data-id="${product.id}">
      <div class="product-image-container">
        <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      </div>
      <div class="product-info">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-category">${product.category}</p>
        <p class="product-price">${product.price.toLocaleString()} ₽</p>

        <div class="buttons">
          <button class="add-to-cart">Добавить в корзину</button>
          <a href="products/product${product.id}.html" class="more-info">Подробнее</a>
        </div>
      </div>
    </div>
    `;
}

function renderProducts(productsToRender) { 
  const productList = document.querySelector('.product-list');
  productList.innerHTML = "";  // очищаем старый список товаров

  // Для каждого товара создаём карточку и добавляем её в продукт-лист
  productsToRender.forEach(product => { 
    productList.innerHTML += createProductCard(product);
  });

  // Добавляем обработчики клика для кнопок "Добавить в корзину"
  document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', (e) => {
      // Получаем id товара из карточки, в которой нажали кнопку
      const productId = parseInt(e.target.closest('.product-card').dataset.id);
      addToCart(productId);
    });
  });
}

// Отслеживаем ввод текста в поле поиска и вызываем обновление отображения
document.getElementById('search-input').addEventListener('input', updateProductsDisplay);

// Отслеживаем изменение в списке сортировки
document.getElementById('sort-select').addEventListener('change', updateProductsDisplay);
document.querySelector('.cart').addEventListener('click', () => { 
    window.location.href="cart.html"
})


document.addEventListener("DOMContentLoaded", () => {
  // При загрузке показываем все товары (без фильтрации)
  renderProducts(products);
  // Обновляем счётчик корзины
  updateCartCount();
});





