var toggleBtn = document.querySelector(".toggle-btn");
// TODO: make navbar responsive
var navbar = document.querySelector("#mobile-navbar");
toggleBtn.addEventListener("click", function(){
    navbar.classList.toggle("responsive");
})

// todo: get all products and assign the right eventListeners
var tempProductList = Array.from(document.querySelectorAll(".pro"));

// todo: stringify productList and add to sessionStorage (not yet done...)
window.sessionStorage.setItem("productList", JSON.stringify(tempProductList));
var productList = JSON.parse(window.sessionStorage.getItem("productList"));

productList = tempProductList;
productList.forEach(function (item) {
    // add event listener to show product details
    item.querySelector("img").addEventListener("click", function (event) {
        getProductDetails(event);
    });
    // add to cart with button
    var button = item.querySelector("button");
    button.classList.add("btn-flex-end");
    button.addEventListener("click", getUserSelection);
})
var product = productList[0];

// form submit 
var searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", function () {
    // document.location.hash = "#Product1";
    var searchWord = document.querySelector(".search-box").value.toLowerCase();

    for (var i = 0; i < productList.length; i++) {
        var product = productList[i];
        var productName = product.querySelector(".pro-name").innerText.toLowerCase();
        if (!productName.includes(searchWord)) {
            product.style.display = "none";
        }
        else {
            product.style.display = "";
            product.style.border = "5px solid";
        }
    }
});

// GET USER'S SELECTION
function getUserSelection(event) {
    var cartList = JSON.parse(sessionStorage.getItem('cartList')) || [];
    var cartItem = {
        "id": `${event.target.getAttribute("data-id")}`,
        "img": event.target.parentNode.parentNode.childNodes[1].getAttribute("src"),
        "name": event.target.parentNode.childNodes[1].textContent,
        "price": event.target.previousElementSibling.textContent,
    }

    // TODO: add to cart list

    cartList.push(cartItem)
    window.sessionStorage.setItem("cartList", JSON.stringify(cartList));
}

// TODO: add to cart page
function addToCart() {
    var wrapper = document.querySelector(".cart-wrapper");
    // TODO: GET USER'S SELECTION LIST FROM LIST OF PRODUCTS
    var cartItems = JSON.parse(window.sessionStorage.getItem("cartList"));
    var priceElem = document.querySelector(".total-cost").querySelector("span")
    var totalPrice = 0;
    cartItems.forEach((item) => {
        var img = item.img;
        var name = item.name;
        var price = item.price;

        var cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        // add to container
        wrapper.appendChild(cartItem);
        var cartImg = document.createElement("img");
        cartImg.classList.add("image-cart");
        cartImg.setAttribute("src", img);
        var cartName = document.createElement("p");
        cartName.textContent = name;
        var cartPrice = document.createElement("h4");
        cartPrice.textContent = price;
        var btn = document.createElement("button");
        btn.classList.add("pro-btn");
        btn.textContent = "Remove";

        cartItem.appendChild(cartImg);
        cartItem.appendChild(cartName);
        cartItem.appendChild(cartPrice);
        cartItem.appendChild(btn);

        // get total cost of cart items
        totalPrice += price;
    })

}

// for search bar

// form validation
function validateForm() {
    var checkoutForm = document.querySelector("#checkout-form");
    var firstName = checkoutForm.elements["first-name"];
    var lastName = checkoutForm.elements["last-name"];
    var stAddr = checkoutForm.elements["st-addr"];
    var aptNo = checkoutForm.elements["apt-no"];
    var city = checkoutForm.elements["city"];
    var postalCode = checkoutForm.elements["postal-code"];

    firstName.addEventListener("input", function () { inputValidation(firstName) })
    firstName.addEventListener("invalid", () => {
        if (firstName.value === "") {
            firstName.setCustomValidity("Enter your first name!");
        } else {
            firstName.setCustomValidity(
                "Names can only contain upper and lowercase letters. Try again!"
            );
        }
    });

    lastName.addEventListener("input", function () { inputValidation(lastName) });
    lastName.addEventListener("invalid", () => {
        if (lastName.value === "") {
            lastName.setCustomValidity("Enter your last name!");
        } else {
            lastName.setCustomValidity(
                "Names can only contain upper and lowercase letters. Try again!"
            );
        }
    });
}
function inputValidation(elem) {
    elem.setCustomValidity("");
    elem.checkValidity();
}

function summary() {
    var totalAmt = 0;
    var subTotal = document.querySelector("#subtotal");
    var tax = document.querySelector("#tax");
    var shippingFee = document.querySelector("#shipping-fee").innerText.slice(1);
    var total = document.querySelector("#total");
    var cart = Array.from(JSON.parse(window.sessionStorage.getItem("cartList")));

    cart.forEach((cartItem) => {
        totalAmt += parseFloat(cartItem.price.slice(1));
    });
    subTotal.innerText = totalAmt.toFixed(2);
    tax.innerText = (0.08 * totalAmt).toFixed(2);
    totalAmt = parseFloat(subTotal.innerText) + parseFloat(tax.innerText) + parseFloat(shippingFee)
    // format currency
    subTotal.innerText = '$' + subTotal.innerText;
    tax.innerText = '$' + tax.innerText;
    total.innerText = '$' + totalAmt.toFixed(2);

    // bag summary
    var bagSummary = document.querySelector(".bag-summary");
    cart.forEach((item) => {
        var bagContainer = document.querySelector(".adjustment").cloneNode(true);
        bagContainer.classList.remove("hidden");
        bagContainer.querySelector(".summary-img").setAttribute("src", item.img);
        bagContainer.querySelector(".summary-name").innerText = item.name;
        bagContainer.querySelector(".summary-price").innerText = parseFloat(item.price.slice(1)).toFixed(2);
        bagSummary.appendChild(bagContainer);
    })
}

// checkout bag summary
function getProductDetails(event) {
    
    var tempProItem;
    var targetBtn = event.target.parentNode.childNodes[3].childNodes[7];
    var targetId = targetBtn.getAttribute("data-id");
    productList.forEach(function(item){
        var tempBtn = item.childNodes[3].childNodes[7];
        if (tempBtn.getAttribute("data-id") == targetBtn.getAttribute("data-id")){
            tempProItem = item;
        }
    })
    var proItem = {
        "id": targetId,
        "name": tempProItem.childNodes[3].querySelector(".pro-name").textContent,
        "img": tempProItem.childNodes[1].getAttribute("src"),
        "price": tempProItem.childNodes[3].querySelector(".pro-cost").textContent,
    }; 
    window.sessionStorage.setItem("detailProduct", JSON.stringify(proItem));
    console.log(proItem);
    window.location.assign("Sproduct.html");
}

function showProductDetails() {
    var proDetailItem = JSON.parse(window.sessionStorage.getItem("detailProduct"));
    var proDetail = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    var detailsSection = document.querySelector("#prodetails-section");
    // set img
    detailsSection.querySelector(".single-pro-image").querySelector("img").setAttribute("src", proDetailItem.img);
    // name
    var singleProDetails = detailsSection.querySelector(".single-pro-details");
    singleProDetails.querySelector(".details-name").innerText = proDetailItem.name;
    singleProDetails.querySelector(".details-price").innerText = proDetailItem.price;
    singleProDetails.querySelector(".details-para").innerText = proDetail;

    var detailsBtn = singleProDetails.querySelector(".cart-btn")
    detailsBtn.setAttribute("data-id", proDetailItem.id);
    detailsBtn.addEventListener("click", function(){
        var cart = JSON.parse(window.sessionStorage.getItem("cartList"));
        cart.push(proDetailItem);
        window.sessionStorage.setItem("cartList", JSON.stringify(cart));
    });
}