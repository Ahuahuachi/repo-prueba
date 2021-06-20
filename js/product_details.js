const database = firebase.database();

const params = new URLSearchParams(window.location.search);

const productId = params.get("id");

async function retrieveProduct(id) {
  let product = {};

  await database
    .ref()
    .child("products")
    .child(id)
    .get()
    .then((result) => {
      if (result.exists()) {
        product = result.val();
      } else {
        console.log(`Product ${id} not found`);
      }
    });

  return product;
}

async function showProductDetails() {
  let productTitle = document.getElementById("product-title");
  let productImage = document.getElementById("product-image");
  let productDescription = document.getElementById("product-description");

  let productData = await retrieveProduct(productId);

  productTitle.innerText = productData.name;
  productImage.setAttribute("src", productData.imageUrl);
  productDescription.innerText = productData.description;
}

let deleteBtn = document.getElementById("btn-delete");
deleteBtn.addEventListener("click", async () => {
  await database.ref().child("products").child(productId).remove();

  window.location.href = "/";
});

showProductDetails();
