/*
    Reference data
*/

let allProducts = undefined;

/*
    Variables reactivas
*/

let currentProducts = [];
let productChunks = [];
let currentPage = 0;
let basket = {};


/*
    Elementos
*/
const searchBarElement = document.getElementById('searchBar');
const numberOfProductsInBasketElement = document.getElementById('numberOfProductsInBasket');
const numberOfProductsInBasketTitleElement = document.getElementById('numberOfProductsInBasketTitle');
const productsRowsElement = document.getElementById('productsRows');
const productsPaginationElement = document.getElementById('productsPagination');
const productDetailsImageElement = document.getElementById("productDetailsImage");
const productDetailsTitleElement = document.getElementById("productDetailsTitle");
const productDetailsUnitsElement = document.getElementById("productDetailsUnits");
const productDetailsPriceElement = document.getElementById("productDetailsPrice");
const productDetailsDiscountElement = document.getElementById("productDetailsDiscount");
const productDetailsDescriptionElement = document.getElementById("productDetailsDescription");
const paginationButtonsElement = document.getElementById("paginationButtons");
const basketProductsElement = document.getElementById('basketProducts');
const subtotalBasketElement = document.getElementById('subtotalBasket');
const totalBasketElement = document.getElementById('totalBasket');
const filterMaxPriceValueRangeElement = document.getElementById('filterMaxPriceValueRange');
const filterMinPriceValueNumberElement = document.getElementById('filterMinPriceValueNumber');
const filterMaxPriceValueNumberElement = document.getElementById('filterMaxPriceValueNumber');

// Modales
const productDetailsModal = new bootstrap.Modal('#productDetailsModal');
const loginModal = new bootstrap.Modal('#loginModal');
const registrationModal = new bootstrap.Modal('#registrationModal');
const basketModal = new bootstrap.Modal('#basketModal');

// Reactivity functions

function doFilter() {
    const minValue = parseFloat(filterMinPriceValueNumberElement.value);
    const maxValue = parseFloat(filterMaxPriceValueNumberElement.value);
    const filtered = currentProducts.filter(function (product) {
        return minValue <= product.price && product.price <= maxValue;
    });
    renderProducts(filtered);
}

function resetFilters() {
    filterMaxPriceValueRangeElement.value = 0;
    filterMinPriceValueNumberElement.value = 0;
    filterMaxPriceValueNumberElement.value = 0;
}

function filterUpdateMinValue(applyFilter = undefined) {
    const minValue = parseFloat(filterMinPriceValueNumberElement.value);
    const maxValue = parseFloat(filterMaxPriceValueNumberElement.value);
    if (minValue > maxValue) {
        filterMaxPriceValueRangeElement.value = filterMaxPriceValueNumberElement.value = filterMinPriceValueNumberElement.value;
        filterUpdateMaxValue();
    }
}

function filterUpdateMaxValue(id, applyFilter = undefined) {
    const minValue = parseFloat(filterMinPriceValueNumberElement.value);
    if (id === 'filterMaxPriceValueRange') {
        const maxValue = parseFloat(filterMaxPriceValueRangeElement.value);
        if (minValue > maxValue) {
            filterMaxPriceValueNumberElement.value = filterMinPriceValueNumberElement.value = filterMaxPriceValueRangeElement.value;
            filterUpdateMinValue();
        } else {
            filterMaxPriceValueNumberElement.value = filterMaxPriceValueRangeElement.value;
        }
    } else {
        const maxValue = parseFloat(filterMaxPriceValueNumberElement.value);
        if (minValue > maxValue) {
            filterMaxPriceValueRangeElement.value = filterMinPriceValueNumberElement.value = filterMaxPriceValueNumberElement.value
            filterUpdateMinValue();
        } else {
            filterMaxPriceValueRangeElement.value = filterMaxPriceValueNumberElement.value;
        }
    }
}

function renderProductUnitsCounter(product, basketButton = undefined) {
    const amount = document.createElement("input");
    amount.classList.add("form-control")
    amount.type = "number";
    amount.max = "99";
    amount.min = "0";
    amount.value = basket[product.id] !== undefined ? basket[product.id].amount : 0;
    amount.onchange = (_) => {
        if (amount.value === '0' && basket[product.id] !== undefined) {
            delete basket[product.id]
        } else if (basket[product.id] === undefined) {
            addToBasket(product);
        } else {
            basket[product.id].amount = amount.value;
        }
        renderShoppingBasket();
        renderProductChunk(currentPage);
        if (basketButton === undefined) {
            return
        }
        if (basket[product.id] === undefined) {
            basketButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Anadir a la cesta`
            basketButton.onclick = productDetailsAddToBasket(product, basketButton.relatedButton, basketButton);
        } else {
            basketButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Remover de la cesta`
            basketButton.onclick = productDetailsRemoveFromBasket(product, basketButton.relatedButton, basketButton);
        }
    }
    amount.style.width = "75px";
    return amount;
}

function renderShoppingBasketEntry(basketEntry) {
    const entry = document.createElement("div");
    entry.classList.add("d-flex");
    // Image
    const image = document.createElement("img");
    entry.appendChild(image);
    image.classList.add("w-25");
    image.src = `/static/images/${basketEntry.product.id}.jpg`
    // Contents
    const contents = document.createElement("div");
    entry.appendChild(contents);
    contents.classList.add("container")

    // First row
    const firstRow = document.createElement("div");
    contents.appendChild(firstRow);
    firstRow.classList.add("row");
    // Title
    const titleDiv = document.createElement("div");
    firstRow.appendChild(titleDiv);
    titleDiv.classList.add("col", "col-8")
    const title = document.createElement("h3");
    titleDiv.appendChild(title);
    title.classList.add('text-left');
    title.innerText = basketEntry.product.name;
    // Remove button
    // <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
    const removeButtonDiv = document.createElement("div");
    firstRow.appendChild(removeButtonDiv);
    removeButtonDiv.classList.add("col", "col-4")
    const removeButton = document.createElement("button");
    removeButtonDiv.appendChild(removeButton);
    removeButton.type = 'button';
    removeButton.classList.add("col-2", "btn-close");
    removeButton.onclick = () => {
        removeFromBasket(basketEntry.product);
        renderShoppingBasket();
        renderProductChunk(currentPage);
    }
    // Units
    const units = document.createElement("h6");
    contents.appendChild(units);
    units.innerText = `${basketEntry.product.contents.amount} ${basketEntry.product.contents.metric}`

    // Third row
    const thirdRow = document.createElement("div");
    contents.appendChild(thirdRow);
    thirdRow.classList.add("d-flex", "justify-content-between");


    const thirdRowTitle = document.createElement('h6');
    thirdRow.appendChild(thirdRowTitle);
    thirdRowTitle.innerText = "Cantidad:";

    thirdRow.appendChild(renderProductUnitsCounter(basketEntry.product, undefined));

    const price = document.createElement("h5");
    thirdRow.appendChild(price);
    price.innerHTML = `${basketEntry.product.price} &euro;`

    return entry;
}

function renderShoppingBasket() {
    const keys = Object.keys(basket);
    const numberOfProducts = keys.length;
    numberOfProductsInBasketElement.innerText = numberOfProducts;
    numberOfProductsInBasketTitleElement.innerText = numberOfProducts;

    basketProductsElement.innerHTML = '';

    let totalPrice = 0;
    for (let index = 0; index < keys.length; index++) {
        const key = keys[index];
        const basketEntry = basket[key];
        totalPrice += basketEntry.amount * basketEntry.product.price;
        basketProductsElement.appendChild(renderShoppingBasketEntry(basketEntry));
    }
    subtotalBasketElement.innerText = totalPrice.toFixed(2);
    totalBasketElement.innerText = (totalPrice * 1.19).toFixed(2);
}

function openLoginModal() {
    loginModal.show();
}

function openRegistrationModal() {
    registrationModal.show();
}

function openBasketModal() {
    basketModal.show();
}

function searchProducts() {
    const pattern = searchBarElement.value;
    if (pattern.length === 0) {
        results = allProducts;
    } else {
        results = allProducts.filter(
            function (product) {
                return product.name.indexOf(pattern) >= 0
            }
        );
    }
    renderProducts(results);
    resetFilters();
    return false;
}

function addToBasket(product) {
    basket[product.id] = {
        "amount": 1,
        "product": product
    };
    return;
}

function removeFromBasket(product) {
    if (basket[product.id] === undefined) {
        return;
    }
    delete basket[product.id];
}

function productCardAddToBasket(product, shopOperationButton) {
    return () => {
        addToBasket(product);

        // Update button
        shopOperationButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>Remover de la cesta`
        shopOperationButton.onclick = productCardRemoveFromBasket(product, shopOperationButton);

        // Propagate
        renderShoppingBasket();
    };
};

function productCardRemoveFromBasket(product, shopOperationButton) {
    return () => {
        removeFromBasket(product);

        // Update button
        shopOperationButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>Anadir a la cesta`
        shopOperationButton.onclick = productCardAddToBasket(product, shopOperationButton);

        // Propagate
        renderShoppingBasket();
    };
};

function productDetailsAddToBasket(product, originalOperationButton, newOperationButton) {
    return () => {
        addToBasket(product);

        // Update button
        originalOperationButton.innerHTML = newOperationButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>Remover de la cesta`
        originalOperationButton.onclick = productCardRemoveFromBasket(product, originalOperationButton);
        newOperationButton.onclick = productDetailsRemoveFromBasket(product, originalOperationButton, newOperationButton);

        // Propagate
        renderShoppingBasket();
    }
}

function productDetailsRemoveFromBasket(product, originalOperationButton, newOperationButton) {
    return () => {
        removeFromBasket(product);

        // Update button
        originalOperationButton.innerHTML = newOperationButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>Anadir a la cesta`
        originalOperationButton.onclick = productCardAddToBasket(product, originalOperationButton);
        newOperationButton.onclick = productDetailsAddToBasket(product, originalOperationButton, newOperationButton);

        // Propagate
        renderShoppingBasket();
    }
}

function renderProductDetails(basketOperationButton, product) {
    productDetailsImageElement.src = `/static/images/${product.id}.jpg`;
    productDetailsTitleElement.innerText = product.name;
    productDetailsUnitsElement.innerText = `${product.contents.amount} ${product.contents.metric}`;
    productDetailsPriceElement.innerHTML = `${product.price} &euro;`;
    productDetailsDiscountElement.innerHTML = `Sale a: ${product.sale.amount} &euro;/${product.sale.metric}`;
    productDetailsDescriptionElement.innerText = product.description;
    productDetailsBasketOperations.innerHTML = '';

    // Units controller
    // Add to basket
    const productDetailsOperationButton = renderBasketOperationButton(product);
    if (basket[product.id] === undefined) {
        productDetailsOperationButton.onclick = productDetailsAddToBasket(product, basketOperationButton, productDetailsOperationButton);
    } else {
        productDetailsOperationButton.onclick = productDetailsRemoveFromBasket(product, basketOperationButton, productDetailsOperationButton);
    }
    productDetailsBasketOperations.appendChild(renderProductUnitsCounter(product, productDetailsOperationButton));
    productDetailsOperationButton.relatedButton = basketOperationButton;
    productDetailsBasketOperations.appendChild(productDetailsOperationButton);
}

function renderBasketOperationButton(product) {
    const shopOperationButton = document.createElement("button");
    shopOperationButton.classList.add("btn", "orange-button");
    shopOperationButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i>`
    if (basket[product.id] === undefined) {
        shopOperationButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Anadir a la cesta`
        shopOperationButton.onclick = productCardAddToBasket(product, shopOperationButton)
    } else {
        shopOperationButton.innerHTML = `<i class="fa-solid fa-basket-shopping"></i> Remover de la cesta`
        shopOperationButton.onclick = productCardRemoveFromBasket(product, shopOperationButton)
    }
    return shopOperationButton;
}

function renderProduct(product) {
    const columnElement = document.createElement("div");
    columnElement.classList.add("col")
    // Card
    const productElement = document.createElement("div");
    columnElement.appendChild(productElement);
    productElement.classList.add("card", "product-card", "position-relative");
    // Favorite button
    const favoriteAElement = document.createElement("a");
    productElement.appendChild(favoriteAElement);
    favoriteAElement.classList.add("position-absolute", "translate-middle", "badge", "rounded-pill", "favorite-button")
    favoriteAElement.style.top = "5%";
    favoriteAElement.style.left = "90%"
    favoriteAElement.innerHTML = `<i class="fa-solid fa-heart"></i>`
    // Favorite button
    /*
    <span class="position-absolute translate-middle badge rounded-pill bg-secondary"
        style="top: 10%;" id="numberOfProductsInBasket">
        0
        <span class="visually-hidden">unread messages</span>
    </span>
    */
    // Anadir al carrito
    const shopOperationButton = renderBasketOperationButton(product);
    // Image button
    const productImageButton = document.createElement("a");
    productElement.appendChild(productImageButton);
    productImageButton.href = "#"
    productImageButton.onclick = () => {
        renderProductDetails(shopOperationButton, product);
        productDetailsModal.show();
    };
    // Image
    const productImage = document.createElement("img");
    productImageButton.appendChild(productImage);
    productImage.classList.add("card-img-top", "position-relative");
    productImage.src = `/static/images/${product.id}.jpg`;
    // Body
    const productBody = document.createElement('div');
    productElement.appendChild(productBody);
    productBody.classList.add("card-body", "text-center");
    // Nombre
    const productName = document.createElement("h4");
    productBody.appendChild(productName);
    productName.classList.add("card-title");
    productName.innerText = product.name;
    // Cantidad por unidad
    const contents = document.createElement("h6");
    productBody.appendChild(contents);
    contents.classList.add("card-text");
    contents.innerText = `${product.contents.amount} ${product.contents.metric}`;
    // Precio
    const price = document.createElement("h5");
    productBody.appendChild(price);
    price.classList.add("text-success");
    price.innerHTML = `${product.price} &euro;`;
    productBody.appendChild(shopOperationButton);
    //
    return columnElement;
}

function renderProductsRow(row) {
    const rowElement = document.createElement('div');
    rowElement.classList.add("row", "row-cols-1", "row-cols-md-4", "mt-3")
    for (let index = 0; index < row.length; index++) {
        rowElement.appendChild(renderProduct(row[index]));
    }
    return rowElement;
}

function renderProductPagination(chunkIndex) {
    currentPage = chunkIndex;
    paginationButtonsElement.innerHTML = "";
    /*
        <button class="btn" onclick="(() => alert('<'))()">&lt</button>
        <button class="btn btn-secondary" onclick="(() => alert('1'))()">1</button>
    */
    if (productChunks.length < 5) {
        for (let index = 0; index < productChunks.length; index++) {
            const buttonElement = document.createElement("button");
            buttonElement.innerText = index + 1;
            if (index === currentPage) {
                buttonElement.classList.add("btn", "border-5", "btn-secondary", "pagination-button");
            } else {
                buttonElement.classList.add("btn", "border-5", "pagination-button");
            }
            buttonElement.onclick = () => {
                renderProductChunk(index);
            }
            // 
            paginationButtonsElement.appendChild(buttonElement);
        }
    }
}

function renderProductChunk(chunkIndex) {
    // Reset component
    productsRowsElement.innerHTML = '';
    // Prepare data
    const chunk = productChunks[chunkIndex];
    // Render Component
    // Render rows
    for (let index = 0; index < chunk.length; index++) {
        productsRowsElement.appendChild(renderProductsRow(chunk[index]));
    }
    // Render pagination
    renderProductPagination(chunkIndex);
}

function renderProducts(products) {
    currentProducts = products;
    resetFilters();
    // Reset component
    currentPage = 0;
    productChunks = [];
    // Prepare data
    const numberOfChunks = parseInt(products.length / 12) < products.length / 12 ? parseInt(products.length / 12) + 1 : parseInt(products.length / 12);
    for (let index = 0; index < numberOfChunks; index++) {
        // Prepare chunk data
        const rawChunk = products.slice(12 * index, 12 * (index + 1));
        const numberOfRows = parseInt(products.length / 4) < products.length / 4 ? parseInt(products.length / 4) + 1 : parseInt(products.length / 4);
        let chunk = [];
        for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
            chunk.push(rawChunk.slice(4 * rowIndex, 4 * (rowIndex + 1)));
        }
        // Load chunk
        productChunks.push(chunk);
    }

    // Render component

    // Render products in page 0
    if (productChunks.length > 0) {
        renderProductChunk(0);
    } else {
        alert("No se encontraron resultados")
        productsRowsElement.innerHTML = '';
    }

    // Update filter
    let minimum = 0;
    let maximum = 0;
    for (let index = 0; index < products.length; index++) {
        const price = products[index].price;
        if (index === 0) {
            minimum = price
            maximum = price
            continue
        }
        if (price < minimum) {
            minimum = price
        }
        if (price > maximum) {
            maximum = price
        }
    }
    minimum = parseInt(minimum) - 1
    maximum = parseInt(maximum) + 1

    filterMinPriceValueNumberElement.value = filterMinPriceValueNumberElement.min = minimum
    filterMinPriceValueNumberElement.max = maximum

    filterMaxPriceValueNumberElement.min = minimum
    filterMaxPriceValueNumberElement.value = filterMaxPriceValueNumberElement.max = maximum

    filterMaxPriceValueRangeElement.min = minimum
    filterMaxPriceValueRangeElement.value = filterMaxPriceValueRangeElement.max = maximum
}

fetch('/static/json/data.json')
    .then(response => response.json())
    .then(
        products => {
            allProducts = products;
            renderProducts(products);
        }
    );