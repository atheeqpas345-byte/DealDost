const offers = [
    {
        name: "Mag Bites",
        category: "Cafe",
        area: "Bengaluru",
        icon: "☕",
        deal: "Special Cafe Offer",
        description: "Check out the cafe's latest food and beverage offers.",
        expiry: "Confirm with the vendor",
        phone: "",
        map: ""
    },
    {
        name: "Daily Tiffin Corner",
        category: "Tiffin",
        area: "Bengaluru",
        icon: "🍱",
        deal: "Lunch Specials",
        description: "Explore meal options and current tiffin deals.",
        expiry: "Confirm with the vendor",
        phone: "",
        map: ""
    },
    {
        name: "Fresh Basket",
        category: "Grocery",
        area: "Bengaluru",
        icon: "🛒",
        deal: "Weekly Store Offers",
        description: "Ask the store about its current grocery discounts.",
        expiry: "Confirm with the vendor",
        phone: "",
        map: ""
    },
    {
        name: "Style Street",
        category: "Clothing",
        area: "Bengaluru",
        icon: "👕",
        deal: "Fashion Specials",
        description: "Discover clothing and seasonal offers.",
        expiry: "Confirm with the vendor",
        phone: "",
        map: ""
    }
];

let selectedCategory = "All";

const offerContainer = document.getElementById("offers");
const searchInput = document.getElementById("search");

function displayOffers() {
    const searchText = searchInput.value.toLowerCase().trim();

    const filteredOffers = offers.filter(offer => {
        const matchesCategory =
            selectedCategory === "All" ||
            offer.category === selectedCategory;

        const searchableText = [
            offer.name,
            offer.category,
            offer.area,
            offer.deal,
            offer.description
        ].join(" ").toLowerCase();

        return matchesCategory &&
            searchableText.includes(searchText);
    });

    document.getElementById("resultCount").textContent =
        `${filteredOffers.length} listings`;

    if (filteredOffers.length === 0) {
        offerContainer.innerHTML =
            '<p class="empty">No matching offers found. Try another search.</p>';
        return;
    }

    offerContainer.innerHTML = filteredOffers.map(offer => `
        <article class="offer-card">
            <div class="offer-icon">${offer.icon}</div>
            <span class="offer-type">${offer.category}</span>
            <h3>${offer.name}</h3>
            <p>📍 ${offer.area}</p>
            <div class="deal-box">${offer.deal}</div>
            <p>${offer.description}</p>
            <p><small>Offer validity: ${offer.expiry}</small></p>
            <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(offer.name + " " + offer.area)}"
               target="_blank" rel="noopener noreferrer">
               Find this business ↗
            </a>
        </article>
    `).join("");
}

document.querySelectorAll(".category").forEach(button => {
    button.addEventListener("click", () => {
        selectedCategory = button.dataset.category;

        document.querySelectorAll(".category").forEach(item =>
            item.classList.remove("active")
        );

        button.classList.add("active");
        displayOffers();
    });
});

searchInput.addEventListener("input", displayOffers);

displayOffers();