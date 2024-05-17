
document.getElementById('createProduct').addEventListener('click', function () {
    let element = document.getElementById("add-product");
    element.classList.remove("hide");
    element.classList.add("show");
})
document.getElementById('close1').addEventListener('click', function () {
    let element = document.getElementById("add-product");
    element.classList.remove("show");
    element.classList.add("hide");
})


//get categories
let product_category = localStorage.getItem('Product_categories');
let category = product_category ? JSON.parse(product_category) : [];
category.forEach(function (categories) {
    const option = document.createElement('option');
    option.innerHTML = `
                  ${categories.name}
              `;
    document.getElementById('product_category').appendChild(option);
})
//get products data
let products = localStorage.getItem('Products');
let product = products ? JSON.parse(products) : [];
let table = document.getElementById('data');
product.forEach(function (item) {
    const proitem = document.createElement('tr');
    proitem.innerHTML = `
              <tr>
              <td>${item.id}</td>
              <td>${item.name}</td>
              <td>${item.description}</td>
              <td>${item.category}</td>
              <td>${item.price}</td>
              <td>${item.quantity}</td>
              <td>${item.suk}</td>
              <td><button type="button" class="customBtn" onclick="deleteItem(${item.id})">Delete</button></td>
              </tr>
              `;
    table.appendChild(proitem);
});

// add product 
var formSubmitted = false;
function validateField(fieldName) {
    const product_name = document.getElementById('product_name').value;
    const product_price = document.getElementById('product_price').value;
    const product_category = document.getElementById('product_category').value;
    const product_description = document.getElementById('product_description').value;
    const product_quantity = document.getElementById('product_quantity').value;
    const suk = document.getElementById('suk').value;
    var digit = /^[0-9]{1,4}$/;

    var fieldValue = document.getElementById(fieldName).value;
    var isValid = true;
    if (fieldName === 'product_name') {
        if (product_name === '') {
            document.getElementById('nameError').innerText = "Enter a product name.";
            isValid = false;
        } else if (digit.test(fieldValue)) {
            document.getElementById('nameError').innerText = "Enter a valid product name.";
            isValid = false;
        } else {
            document.getElementById('nameError').innerText = "";
        }
    } else if (fieldName === 'product_category') {
        if (product_category === '') {
            document.getElementById('categoryError').innerText = "Select product category .";
            isValid = false;
        } else {
            document.getElementById('categoryError').innerText = "";
        }
    } else if (fieldName === 'product_description') {
        if (product_description === '') {
            document.getElementById('desError').innerText = "Enter product descrption.";
            isValid = false;
        } else {
            document.getElementById('desError').innerText = "";
        }
    }
    else if (fieldName === 'product_price') {
        if (product_price === '') {
            document.getElementById('priceError').innerText = "Enter product price";
            isValid = false;
        } else if (!digit.test(fieldValue)) {
            document.getElementById('priceError').innerText = "Enter valid product price.";
            isValid = false;
        } else {
            document.getElementById('priceError').innerText = "";
        }
    }
    else if (fieldName === 'product_quantity') {
        if (product_quantity === '') {
            document.getElementById('quantityError').innerText = "Enter product quantity.";
            isValid = false;
        } else if (!digit.test(fieldValue)) {
            document.getElementById('quantityError').innerText = "Enter valid product quantity and max 4 digit allow.";
            isValid = false;
        } else {
            document.getElementById('quantityError').innerText = "";
        }
    }
    else if (fieldName === 'suk') {
        if (suk === '') {
            document.getElementById('sukError').innerText = "SUK number is required.";
            isValid = false;
        } else {
            document.getElementById('sukError').innerText = "";
        }
    }
    return isValid;
}

document.getElementById('submit-product').addEventListener('submit', function (event) {
    validateForm(event);
})
function validateForm(event) {
    event.preventDefault();
    var isValid = true;
    isValid &= validateField('product_name');
    isValid &= validateField('product_category');
    isValid &= validateField('product_description');
    isValid &= validateField('product_price');
    isValid &= validateField('product_quantity');
    isValid &= validateField('suk');
    if (isValid) {
        let existingData = localStorage.getItem('Products');
        let users = existingData ? JSON.parse(existingData) : [];
        let newId = users.length > 0 ? parseInt(users[users.length - 1].id) + 1 : 1;
        let newProduct = {
            id: newId.toString(),
            name: document.getElementById('product_name').value,
            description: document.getElementById('product_description').value,
            category: document.getElementById('product_category').value,
            price: document.getElementById('product_price').value,
            quantity: document.getElementById('product_quantity').value,
            suk: document.getElementById('suk').value,
        };
        users.push(newProduct);
        let updatedData = JSON.stringify(users);
        localStorage.setItem('Products', updatedData);
        let data = localStorage.getItem('Product_categories');
        let update1 = JSON.parse(data);
        var indexT = update1.findIndex(item => item.name === document.getElementById('product_category').value);
        let newNum =document.getElementById('product_quantity').value
        update1[indexT].products_quantity += parseInt(newNum);
        localStorage.setItem('Product_categories', JSON.stringify(update1));
        let element = document.getElementById("add-product");
        element.classList.remove("show");
        element.classList.add("hide");
        location.reload();
    }
    formSubmitted = true;
    return isValid ? true : false;
}
document.getElementById('product_name').addEventListener('keyup', function () {
    if (formSubmitted) {
        validateField('product_name');
    }
});
document.getElementById('product_category').addEventListener('change', function () {
    if (formSubmitted) {
        validateField('product_category');
    }
});
document.getElementById('product_description').addEventListener('keyup', function () {
    if (formSubmitted) {
        validateField('product_description');
    }
});
document.getElementById('product_price').addEventListener('keyup', function () {
    if (formSubmitted) {
        validateField('product_price');
    }
});
document.getElementById('suk').addEventListener('keyup', function () {
    if (formSubmitted) {
        validateField('suk');
    }
});
document.getElementById('product_quantity').addEventListener('keyup', function () {
    if (formSubmitted) {
        validateField('product_quantity');
    }
});

function deleteItem(id){
    let existingData = localStorage.getItem('Products');
    let users = existingData ? JSON.parse(existingData) : [];
    let indexToDelete = users.findIndex(item => item.id === id.toString());
        users.splice(indexToDelete, 1);
        localStorage.setItem('Products', JSON.stringify(users));
        location.reload();
}

