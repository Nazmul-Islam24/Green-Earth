let allPlantsCache = {};
let cart = [];



const manageSpinner = (status) => {
    if (status == true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("cards-container").classList.add("hidden");
    } else {
        document.getElementById("cards-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const removeActiveCategory = () => {
    const categoryButtons = document.querySelectorAll(".category-btn");
    categoryButtons.forEach(btn => btn.classList.remove("bg-[#15803D]", "text-white", "font-semibold"));
}

const cachePlants = (plants) => {
    plants.forEach(plant => allPlantsCache[plant.id] = plant);
}

// categories sidebar
const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/categories")
        .then(res => res.json())
        .then((json) => {
            displayCategories(json.categories);
        })
}

const displayCategories = (categories) => {
    const categoryContainer = document.getElementById("categories-container");
    categoryContainer.innerHTML = "";

    const wrapper = document.createElement("div");
    wrapper.classList = "flex flex-row lg:flex-col items-start gap-2 lg:gap-0 lg:space-y-2 px-2 pb-2 lg:pb-0 overflow-x-auto lg:overflow-visible whitespace-nowrap w-full lg:w-auto";



    wrapper.innerHTML += `
        <button id="category-btn-0" onclick="loadAllPlants()"
            class="category-btn shrink-0 text-left w-auto lg:w-full px-3 py-1 rounded-md hover:bg-[#15803D] hover:text-white bg-[#15803D] text-white font-semibold">
            All Trees
        </button>
    `;

    categories.forEach(category => {
        wrapper.innerHTML += `
            <button id="category-btn-${category.id}" onclick="loadCategoryPlants(${category.id})"
                class="category-btn shrink-0 text-left w-auto lg:w-full px-3 py-1 rounded-md hover:bg-[#15803D] hover:text-white">
                ${category.category_name}
            </button>
        `;
    });

    categoryContainer.append(wrapper);
}



const loadAllPlants = () => {
    manageSpinner(true);
    removeActiveCategory();
    document.getElementById("category-btn-0").classList.add("bg-[#15803D]", "text-white", "font-semibold");

    fetch("https://openapi.programming-hero.com/api/plants")
        .then(res => res.json())
        .then((json) => {
            cachePlants(json.plants);
            displayPlants(json.plants);
        })
}

const loadCategoryPlants = (id) => {
    manageSpinner(true);
    removeActiveCategory();
    document.getElementById(`category-btn-${id}`).classList.add("bg-[#15803D]", "text-white", "font-semibold");

    fetch(`https://openapi.programming-hero.com/api/category/${id}`)
        .then(res => res.json())
        .then((json) => {
            const plants = json.plants ? json.plants : [];
            cachePlants(plants);
            displayPlants(plants);
        })
}

const displayPlants = (plants) => {
    const cardsContainer = document.getElementById("cards-container");
    cardsContainer.innerHTML = "";

    if (plants.length == 0) {
        cardsContainer.innerHTML = `
            <div class="text-center py-16 col-span-full">
                <p class="text-gray-500 text-lg">এই ক্যাটাগরিতে এখনো কোনো গাছ যুক্ত করা হয়নি।</p>
            </div>
        `;
        manageSpinner(false);
        return;
    }

    plants.forEach((plant) => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="p-[16px] bg-white rounded-xl h-full cursor-pointer flex flex-col"
                onclick="showPlantDetails(${plant.id})">
                <img src="${plant.image}" alt="${plant.name}"
                class="h-[190px] w-full object-cover rounded-xl bg-gray-200">
                <div class="space-y-3 flex flex-col flex-1">
                    <h3 class="font-semibold">${plant.name}</h3>
                    <p class="text-[#1f2937cb]">${plant.description}</p>
                    <div class="flex justify-between font-semibold">
                        <button class="text-[#15803D] bg-[#DCFCE7] px-[10px] py-[4px] rounded-full">
                            ${plant.category}
                        </button>
                        <p>৳${plant.price}</p>
                    </div>
                    <button onclick="event.stopPropagation(); addToCart(${plant.id})"
                    class="mt-auto text-white font-medium bg-[#15803D] text-center w-full py-2 rounded-full">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
        cardsContainer.append(card);
    })

    manageSpinner(false);
}

// modal 
const showPlantDetails = (id) => {
    const plant = allPlantsCache[id];
    if (!plant) return;

    const detailsBox = document.getElementById("modal-details");
    detailsBox.innerHTML = `
        <h2 class="text-2xl font-bold">${plant.name}</h2>
        <img src="${plant.image}" alt="${plant.name}" class="w-full h-[220px] object-cover rounded-xl">
        <p class="text-[#15803D] bg-[#DCFCE7] inline-block px-3 py-1 rounded-full font-semibold">${plant.category}</p>
        <p class="font-semibold">Price: ৳${plant.price}</p>
        <p class="text-[#1f2937cb]">${plant.description}</p>
    `;

    document.getElementById("plant_modal").showModal();
}

// cart listed
const addToCart = (id) => {
    const plant = allPlantsCache[id];
    if (!plant) return;

    const existing = cart.find(item => item.id === id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ id: plant.id, name: plant.name, price: plant.price, qty: 1 });
    }

    renderCart();
}

const removeFromCart = (id) => {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

const renderCart = () => {
    const cartContainer = document.getElementById("cart-container");
    cartContainer.innerHTML = `<h3 class="text-2xl font-bold whitespace-nowrap">Your Cart</h3>`;

    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;
        cartContainer.innerHTML += `
            <div class="space-y-1 whitespace-nowrap bg-[#eafff1ea] rounded-md flex justify-between items-center gap-10 p-2 mx-auto">
                <div class="text-[15px] space-y-2">
                    <p class="font-bold">${item.name}</p>
                    <p class="text-[#1F293750]">৳${item.price} x ${item.qty}</p>
                </div>
                <img src="./assets/Vector.png" class="pr-2 cursor-pointer" alt="remove"
                    onclick="removeFromCart(${item.id})">
            </div>
        `;
    })

    document.getElementById("cart-total").innerText = total;
}

loadCategories();
loadAllPlants();