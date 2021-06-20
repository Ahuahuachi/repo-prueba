function addNewCard(title, description, imgUrl, databaseId) {
  let mainContainer = document.getElementById("main-container");
  let card = document.createElement("div");
  let image = document.createElement("img");
  let cardBody = document.createElement("div");
  let cardLink = document.createElement("a");
  let cardTitle = document.createElement("h4");
  let cardText = document.createElement("p");

  card.classList.add("card", "product-card", "mx-2");
  image.classList.add("card-img-top");
  image.src = imgUrl;
  cardTitle.classList.add("card-title");
  cardTitle.appendChild(cardLink);
  cardLink.href = `./product_details.html?id=${databaseId}`;
  cardLink.innerText = title;
  cardText.classList.add("card-text");
  cardText.innerText = description;
  cardBody.classList.add("card-body");

  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);
  card.appendChild(image);
  card.appendChild(cardBody);
  mainContainer.appendChild(card);
}

let database = firebase.database();

async function retrieveAllProducts() {
  let products = {};

  await database
    .ref()
    .child("products")
    .get()
    .then((result) => {
      if (result.exists()) {
        products = result.val();
      } else {
        console.log("Items not found");
      }
    });

  return products;
}

async function showAllProducts() {
  let allProducts = await retrieveAllProducts();

  let listOfIds = Object.keys(allProducts);

  listOfIds.forEach((id) => {
    let product = allProducts[id];

    addNewCard(product.name, product.description, product.imageUrl, id);
  });
}

showAllProducts();

// product_list.forEach((element) => {
//   addNewCard(element.title, element.description, element.imgUrl, element.id);
// });
