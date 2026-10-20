
const form = document.getElementById("offerForm");
const message = document.getElementById("adminMessage");
const offerList = document.getElementById("adminOffers");

let offers = JSON.parse(localStorage.getItem("dealDostOffers") || "[]");

function saveOffers() {
    localStorage.setItem("dealDostOffers", JSON.stringify(offers));
}

function displayOffers() {
    offerList.innerHTML = "";

    offers.forEach((offer, index) => {
        const card = document.createElement("div");
        card.className = "admin-offer";

        const title = document.createElement("h3");
        title.textContent = offer.shopName + " — " + offer.offerTitle;

        const details = document.createElement("p");
        details.textContent =
            offer.category + " | " + offer.area +
            " | Valid until: " + offer.validity;

        const description = document.createElement("p");
        description.textContent = offer.description;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete Offer";

        deleteButton.addEventListener("click", () => {
            offers.splice(index, 1);
            saveOffers();
            displayOffers();
        });

        card.append(title, details, description, deleteButton);
        offerList.appendChild(card);
    });
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const offer = {
        shopName: document.getElementById("shopName").value.trim(),
        category: document.getElementById("category").value,
        area: document.getElementById("area").value.trim(),
        offerTitle: document.getElementById("offerTitle").value.trim(),
        description: document.getElementById("description").value.trim(),
        validity: document.getElementById("validity").value
    };

    offers.push(offer);
    saveOffers();
    displayOffers();
    form.reset();

    message.textContent = "Offer added successfully!";
});

displayOffers();
