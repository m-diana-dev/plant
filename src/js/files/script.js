// Подключение функционала "Чертогов Фрилансера"
import { isMobile } from "./functions.js";
// Подключение списка активных модулей
import { flsModules } from "./modules.js";

window.onload = function () {
    document.addEventListener("click", documentActions);

    function documentActions(e) {
        const targetElement = e.target;
        if (targetElement.classList.contains('products__more')) {
            getProducts(targetElement);
            e.preventDefault();
        }
    }
}

async function getProducts(button) {
    if (!button.classList.contains('_hold')) {
        button.classList.add('_hold');
        const file = "json/products.json";
        let response = await fetch(file, {
            method: "GET"
        });
        console.log(response);
        if (response.ok) {
            let result = await response.json();
            loadProducts(result);
            button.classList.remove('_hold');
            button.remove();
        } else {
            alert("error");
        }
    }
}

function loadProducts(data) {
    const productsItems = document.querySelector(".products-tabs__body-wrapp");

    data.products.forEach(item => {
        const productId = item.id;
        const productUrl = item.url;
        const productImage = item.image;
        const productTitle = item.title;
        const productValue = item.value;
        const productPrice = item.price;

        let productTemplate = `
		<article data-pid="${productId}" class="products__item item-products">
			<a href="${productUrl}" class="item-products__image">
				<img src="img/products/${productImage}" alt="${productTitle}">
			</a>
			<div class="item-products__info">
				<a href="${productUrl}" class="item-products__title">${productTitle}</a>
				<div class="rating rating_set">
					<div class="rating__body">
						<div class="rating__active"></div>
						<div class="rating__items">
							<input type="radio" class="rating__item" value="1"
								name="rating">
							<input type="radio" class="rating__item" value="2"
								name="rating">
							<input type="radio" class="rating__item" value="3"
								name="rating">
							<input type="radio" class="rating__item" value="4"
								name="rating">
							<input type="radio" class="rating__item" value="5"
								name="rating">
						</div>
					</div>
					<div class="rating__value">${productValue}</div>
				</div>
				<div class="item-products__price">${productPrice} <span>р.</span></div>
			</div>
		</article>
		`
        productsItems.insertAdjacentHTML('beforeend', productTemplate);

    });
}
