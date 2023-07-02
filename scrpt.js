var productList = document.querySelectorAll(".pro");
productList = Array.from(productList);
productList.forEach(function(item){
    // add event listener for product details
    item.querySelector("img").addEventListener("click", ()=>{window.location.assign("Sproduct.html");});
    // add to cart with button
    var button = item.querySelector("button");
    button.classList.add("btn-flex-end");
    button.addEventListener("click", getUserSelection);
})
var product = productList[0]; 

// form submit
var searchForm = document.querySelector(".search-form");
searchForm.addEventListener("submit", function(){
    document.location.hash = "#Product1";
    var searchWord = document.querySelector(".search-box").value.toLowerCase();

    for (var i = 0; i < productList.length; i++) {
        var product = productList[i];
        var productName = product.querySelector(".pro-name").innerText.toLowerCase();
        if (!productName.includes("child")) {
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
        "id": `cartItem_${cartList.length}`,
        "img": event.target.parentNode.parentNode.childNodes[1].getAttribute("src"),
        "name": event.target.parentNode.childNodes[1].textContent,
        "price": event.target.previousElementSibling.textContent,
    }

    // TODO: add to cart list

    // cartList.forEach(function(item){
    //     if (!Object.values(item).includes(cartItem["img"]) || cartList.length == 0){
    //     }
    // });

    cartList.push(cartItem)
    window.sessionStorage.setItem("cartList", JSON.stringify(cartList));
}

// TODO: add to cart button
function addToCart() {
    var wrapper = document.querySelector(".cart-wrapper");

    // TODO: GET USER'S SELECTION LIST FROM LIST OF PRODUCTS
    var cartItems = JSON.parse(window.sessionStorage.getItem("cartList"));
    cartItems.forEach((item)=>{
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
        // 

        cartItem.appendChild(cartImg);
        cartItem.appendChild(cartName);
        cartItem.appendChild(cartPrice);
        cartItem.appendChild(btn);
        
        

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

    firstName.addEventListener("input", function () {inputValidation(firstName)})
    firstName.addEventListener("invalid", () => {
        if (firstName.value === "") {
            firstName.setCustomValidity("Enter your first name!");
        } else {
            firstName.setCustomValidity(
            "Names can only contain upper and lowercase letters. Try again!"
          );
        }
      });

      lastName.addEventListener("input", function() {inputValidation(lastName)});
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

function summary(){
    var totalAmt = 0;
    var subTotal = document.querySelector("#subtotal");
    var tax = document.querySelector("#tax");
    var shippingFee = document.querySelector("#shipping-fee").innerText.slice(1);
    var total = document.querySelector("#total");
    var cart = Array.from(JSON.parse(window.sessionStorage.getItem("cartList")));
    
    cart.forEach((cartItem)=>{
        totalAmt += parseFloat(cartItem.price.slice(1));
    });
    subTotal.innerText = totalAmt.toFixed(2);
    tax.innerText = (0.08 * totalAmt).toFixed(2);
    totalAmt = parseFloat(subTotal.innerText) + parseFloat(tax.innerText) + parseFloat(shippingFee)
    // format currency
    subTotal.innerText = '$'+subTotal.innerText;
    tax.innerText = '$'+tax.innerText;
    total.innerText = '$'+totalAmt.toFixed(2);

    // bag summary
    var bagSummary = document.querySelector(".bag-summary");
    cart.forEach
    var bagContainer = document.querySelector("adjustment").cloneNode(true);

}

// checkout bag summary
function getBAgSummary() {
    var subTotal
}
