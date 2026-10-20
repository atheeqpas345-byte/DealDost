
let selectedCategory = "All";

const offerContainer = document.getElementById("offers");
const searchInput = document.getElementById("search");
const resultCount = document.getElementById("resultCount");

// Read offers saved by the admin panel
function getOffers() {
    return JSON.parse(
        localStorage.getItem("dealDostOffers") || "[]"
    ).map(offer => ({
        name: offer.shopName || offer.name || "",
        category: offer.category || "",
        area: offer.area || "",
        icon: offer.icon || getCategoryIcon(offer.category),
        deal: offer.offerTitle || offer.deal || "",
        description: offer.description || "",
        expiry: offer.validity || offer.expiry || "Confirm with vendor"
    }));
}

function getCategoryIcon(category) {
    const icons = {
        Cafe: "☕",
        Tiffin: "🍱",
        Restaurant: "🍽️",
        Grocery: "🛒",
        Clothing: "👕"
    };

    return icons[category] || "🏪";
}

function displayOffers() {
    // Reload saved offers each time the page renders
    const offers = getOffers();
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

    resultCount.textContent = `${filteredOffers.length} listings`;

    if (filteredOffers.length === 0) {
        offerContainer.innerHTML =
            '<p class="empty">No offers found. Add an offer in the admin panel or try another search.</p>';
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

// Category filters
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

// Search
searchInput.addEventListener("input", displayOffers);

// Refresh listings when returning from the admin page
window.addEventListener("pageshow", displayOffers);

// Update if another page in the same browser changes localStorage
window.addEventListener("storage", displayOffers);

displayOffers();
