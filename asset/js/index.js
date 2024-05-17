
// if (!localStorage.getItem('loginToken')) {
//     window.location.href = 'login.html';
// } else {
//     var category = localStorage.getItem('loginToken');
//     let key = JSON.parse(category);
//     if (key.user_id == 1) {
//         console.log('admin');
//     } else {
//         document.getElementById('product-form').style.display = 'none';
//         document.getElementById('product-category').style.display = 'none';
//     }
// }

document.getElementById('searchByName').addEventListener('keyup',function(){
                let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("searchByName");
    filter = input.value.toUpperCase();
    table = document.getElementById("myTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1];
        if (td) {
        txtValue = td.textContent || td.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            console.log(tr[i]);
            tr[i].style.display = "";
        } else {
            tr[i].style.display = "none";
        }
        }
    }
});
document.getElementById('searchByMaxPrice').addEventListener('keyup',function(){
    let input, filter, table, tr, td, i, txtValue;
input = document.getElementById("searchByMaxPrice").value;
filter = parseFloat(input); 
table = document.getElementById("myTable");
tr = table.getElementsByTagName("tr");

for (i = 1; i < tr.length; i++) {
td = tr[i].getElementsByTagName("td")[4]; 
if (td) {
    txtValue = td.textContent || td.innerText;
    if (parseFloat(txtValue) <= filter) {
        tr[i].style.display = ""; 
    } else {
        tr[i].style.display = "none"; 
    }
}
}
});

let products = localStorage.getItem('Products');
let res = products ? JSON.parse(products) : [];
let table = document.getElementById('data');
res.forEach(function (item) {
    const items = document.createElement('tr');
     items.innerHTML = `
    <tr>
    <td>${item.id}</td>
    <td>${item.name}</td>
    <td>${item.description}</td>
    <td>${item.category}</td>
    <td>${item.price}</td>
    <td>${item.quantity}</td>
    <td>${item.suk}</td>
    <td><button type="button" onclick="addToCart(${item.id})">Add to Cart</button></td>
    </tr>
    `;
    table.appendChild(items);
});

function addToCart(id) {
    console.log(id);
    let existingData = localStorage.getItem('Products');
    let product= JSON.parse(existingData);
    let data = localStorage.getItem('Product_categories');
    let update1 = JSON.parse(data);
   
    let index = product.findIndex(item => item.id == id.toString());
    var indexT = update1.findIndex(item => item.name === product[index].name);
    if(product[index].quantity == 0){
        alert('product is not available');
    }else if(product[index].quantity <= 3){
        alert('Low stock level of ' + product[index].name);
        update1[indexT].quantity -= 1;
        product[index].quantity -= 1;
    }else{
        alert('are you sure want to add to cart');
        update1[indexT].quantity -= 1;
        product[index].quantity -= 1;
    }

    localStorage.setItem('Products', JSON.stringify(product));
    localStorage.setItem('Product_categories', JSON.stringify(update1));
    location.reload();
    }
