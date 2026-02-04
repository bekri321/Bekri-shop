let products = [
 {name:"Bread", price:40, stock:200},
 {name:"Rusk", price:90, stock:150},
 {name:"Namkeen", price:160, stock:100},
 {name:"Plain Cake", price:200, stock:50}
];

let cart = [];

function showCustomer(){
 document.getElementById("customer-view").style.display="block";
 document.getElementById("admin-view").style.display="none";
 loadProducts();
}

function showAdmin(){
 document.getElementById("customer-view").style.display="none";
 document.getElementById("admin-view").style.display="block";
 loadAdmin();
}

function loadProducts(){
 const list = document.getElementById("product-list");
 list.innerHTML = "";
 products.forEach((p,i)=>{
  list.innerHTML += `
   <div class="product-card">
    <b>${p.name}</b><br>
    ₹${p.price} / KG<br>
    Stock: ${p.stock} KG<br>
    <select id="w${i}">
     <option value="0.25">250 gm</option>
     <option value="0.5">500 gm</option>
     <option value="1">1 KG</option>
     <option value="2">2 KG</option>
     <option value="5">5 KG</option>
    </select><br>
    <button onclick="addToCart(${i})">Add</button>
   </div>`;
 });
}

function addToCart(i){
 let w = parseFloat(document.getElementById("w"+i).value);
 if(w > products[i].stock){alert("Stock कम है"); return;}
 let price = w * products[i].price;
 cart.push({name:products[i].name, weight:w, price});
 updateCart();
}

function updateCart(){
 const c = document.getElementById("cart-items");
 c.innerHTML = "";
 let total = 0;
 cart.forEach(x=>{
  total += x.price;
  c.innerHTML += `${x.name} - ${x.weight} KG = ₹${x.price}<br>`;
 });
 document.getElementById("cart-total").innerText = "Total: ₹"+total;
}

function checkout(){
 if(cart.length === 0){alert("Cart empty"); return;}
 let msg="🧾 Rashmi Bakery Bill\n";
 let total = 0;
 cart.forEach(x=>{
  total += x.price;
  msg += `${x.name} ${x.weight} KG = ₹${x.price}\n`;
 });
 msg += `Total ₹${total}\nPayment: Cash / Online`;
 window.open("https://wa.me/917647071356?text="+encodeURIComponent(msg));
}

function addProduct(){
 products.push({
  name: document.getElementById("pname").value,
  price: +document.getElementById("pprice").value,
  stock: +document.getElementById("pstock").value
 });
 loadAdmin();
}

function loadAdmin(){
 const box = document.getElementById("admin-stock");
 box.innerHTML = "";
 products.forEach(p=>{
  box.innerHTML += `${p.name} ₹${p.price} Stock:${p.stock}KG<br>`;
 });
}
