let database = firebase.database();

async function addProduct(name, description, imageUrl) {
  return await database.ref().child("products").push({
    name: name,
    description: description,
    imageUrl: imageUrl,
  }).key;
}

function getProductData() {
  let productName = document.getElementById("product-name-input").value;
  let productDescription = document.getElementById(
    "product-description-textarea"
  ).value;
  let imageUrl = document.getElementById("image-url-input").value;

  return {
    name: productName,
    description: productDescription,
    imageUrl: imageUrl,
  };
}

let saveButton = document.getElementById("btn-save");

saveButton.addEventListener("click", async () => {
  let product_data = getProductData();

  let response = await addProduct(
    product_data.name,
    product_data.description,
    product_data.imageUrl
  );

  alert(response);
});
