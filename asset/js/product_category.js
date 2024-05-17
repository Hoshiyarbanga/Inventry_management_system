document.getElementById('addNewCategory').addEventListener('click', function () {
    let element = document.getElementById("add-category");
    element.classList.remove("hide");
    element.classList.add("show");
})
document.getElementById('close').addEventListener('click', function () {
    let element = document.getElementById("add-category");
    element.classList.remove("show");
    element.classList.add("hide");
})
// 
let product_category = localStorage.getItem('Product_categories');
let category = product_category ? JSON.parse(product_category) : [];
let table = document.getElementById('data');
category.forEach(function (item) {
    const items = document.createElement('tr');
    items.innerHTML = `
      <tr>
      <td>${item.id}</td>
      <td>${item.name}</td>
      <td>${item.description}</td>
      <td>${item.products_quantity}</td>
      <td><button type="button" class="customBtn" onclick="deleteItem(${item.id})">Delete</button></td>
      </tr>
      `;
    table.appendChild(items);
});

var formSubmitted = false;
function validateField(fieldName) {
    const category_name = document.getElementById('category_name').value;
    const category_description = document.getElementById('category_description').value;
    var digit = /^[0-9]{1,4}$/;
    let fieldValue = document.getElementById(fieldName).value;
    var isValid = true;
    if (fieldName === 'category_name') {
        if (category_name === '') {
            document.getElementById('nameError').innerText = "Enter category name.";
            isValid = false;
        } else if (digit.test(fieldName)) {
            document.getElementById('nameError').innerText = "Enter category name.";
            isValid = false;
        } else {
            document.getElementById('nameError').innerText = "";
        }
    } else if (fieldName === 'category_description') {
        if (category_description === '') {
            document.getElementById('desError').innerText = "Enter description.";
            isValid = false;
        } else {
            document.getElementById('desError').innerText = "";
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
    isValid &= validateField('category_name');
    isValid &= validateField('category_description');
    if (isValid) {
        let existingData = localStorage.getItem('Product_categories');
        let category = existingData ? JSON.parse(existingData) : [];
        let newId = category.length > 0 ? parseInt(category[category.length - 1].id) + 1 : 1;
        let newCategory = {
            id: newId.toString(),
            name: document.getElementById('category_name').value,
            description: document.getElementById('category_description').value,
            products_quantity:0,
        };
        category.push(newCategory);
        var updatedData = JSON.stringify(category);
        localStorage.setItem('Product_categories', updatedData);
        var element = document.getElementById("add-category");
        element.classList.remove("show");
        element.classList.add("hide");
        location.reload();
    }
    formSubmitted = true;
    return isValid ? true : false;
}
document.getElementById('category_name').addEventListener('keyup', function () {
    if (formSubmitted) {
        validateField('category_name');
    }
});
document.getElementById('category_description').addEventListener('keyup', function () {
    if (formSubmitted) {
        validateField('category_description');
    }
});

function deleteItem(id){
    console.log(id);
    var existingData = localStorage.getItem('Product_categories');
    var users = existingData ? JSON.parse(existingData) : [];
    var indexToDelete = users.findIndex(item => item.id === id.toString());
        users.splice(indexToDelete, 1);
        localStorage.setItem('Product_categories', JSON.stringify(users));
        location.reload();
}