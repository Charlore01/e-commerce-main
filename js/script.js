// DOM Elements
const cart = document.querySelector('.cart'); // Cart icon element
const dropdown = document.querySelector('.dropdown'); // Dropdown menu for cart items
const overlay = document.querySelector('.overlay'); // Overlay for modals and lightbox
const notification = document.querySelector('.notification'); // Notification badge for cart
const modal = document.querySelector('.modal'); // Modal element for empty cart
const quantity = document.querySelector('.quantity'); // Element showing the quantity of items in the cart
const cartEmpty = document.querySelector('.empty'); // Element shown when cart is empty
const cartHasItem = document.querySelector('.has-item'); // Element shown when cart has items
const cardPrice = document.querySelector('.card__price'); // Element showing the price of the item in the cart
const cardQuantity = document.querySelector('.card__quantity'); // Element showing the quantity of the item in the cart
const cardTotal = document.querySelector('.card__total'); // Element showing the total price of the items in the cart
const divThumbnails = document.querySelectorAll('.thumb-wrapper'); // Container elements for product thumbnails
const thumbnails = document.querySelectorAll('#product__thumbnail'); // Product thumbnail images
const image = document.getElementById('product__image'); // Main product image
const lightbox = document.querySelector('.lightbox'); // Lightbox element for enlarged images
const lightboxImage = document.getElementById('lightbox__image'); // Image element within the lightbox
const lightBoxDivThumbnails = document.querySelectorAll('.lightbox__thumb-wrapper'); // Container elements for lightbox thumbnails
const lightboxThumbnail = document.querySelectorAll('#lightbox__thumbnail'); // Thumbnails within the lightbox
const sidebar = document.querySelector('.sidebar'); // Sidebar element for navigation
const sidebarLinks = document.querySelector('.navbar__group'); // Links within the sidebar
const plusBtn = document.querySelector('.btn-plus'); // Button to increase item quantity
const minusBtn = document.querySelector('.btn-minus'); // Button to decrease item quantity
const deleteBtn = document.querySelector('.delete-btn'); // Button to remove an item from the cart
const cartBtn = document.querySelector('.btn-cart'); // Button to open the cart
const closeBtn = document.querySelector('.close-lightbox'); // Button to close the lightbox
const modalBtn = document.querySelector('.modal__btn'); // Button to close the modal
const lightboxNextBtn = document.querySelector('.lightbox__next'); // Button to go to the next image in the lightbox
const lightboxPrevBtn = document.querySelector('.lightbox__previous'); // Button to go to the previous image in the lightbox
const prevBtn = document.querySelector('.previous'); // Button to go to the previous image in the gallery
const nextBtn = document.querySelector('.next'); // Button to go to the next image in the gallery
const openBtn = document.querySelector('.icon-menu'); // Button to open the sidebar menu
const closeMenuBtn = document.querySelector('.close-menu'); // Button to close the sidebar menu

let price = 125; // Price of a single item
let counter = 0; // Counter for the quantity of items in the cart

// Function to check if the cart is empty
const isCartEmpty = () => {
    if (counter === 0) {
        cartEmpty.classList.remove('hidden'); // Show empty cart message
    }
}

// Function to increase the quantity of items
const incrementQuantity = () => {
    if (counter < 5) { // Limit quantity to a maximum of 5
        counter++;
    }
    quantity.innerHTML = counter; // Update quantity display
}

// Function to decrease the quantity of items
const decrementQuantity = () => {
    if (counter > 0) { // Ensure quantity does not go below 0
        counter--;
    }
    quantity.innerHTML = counter; // Update quantity display
}

// Function to update the total price for checkout
const totalCheckout = () => {
    cardPrice.innerHTML = `$${price}.00`; // Set item price
    cardQuantity.innerHTML = `x ${counter}`; // Set quantity
    cardTotal.innerHTML = `$${price * counter}.00`; // Calculate and set total price
}

// Event listener to toggle the cart dropdown
cart.addEventListener('click', () => {
    dropdown.classList.toggle('hidden'); // Toggle dropdown visibility
    cart.classList.toggle('cart-hover'); // Add hover effect to cart
    isCartEmpty(); // Check if cart is empty
})

// Event listener to close the dropdown when image is clicked
image.addEventListener('click', () => {
    dropdown.classList.add('hidden'); // Hide dropdown
})

// Event listener to close the dropdown when clicking outside of it
window.addEventListener('click', (e) => {
    if (!cart.contains(e.target) && !deleteBtn.contains(e.target)) {
        dropdown.classList.add('hidden'); // Hide dropdown
        cart.classList.remove('cart-hover'); // Remove hover effect
    }
})

// Event listeners for quantity buttons
plusBtn.addEventListener('click', () => { incrementQuantity() })
minusBtn.addEventListener('click', () => { decrementQuantity() })

// Event listener to add item to cart
cartBtn.addEventListener('click', () => {
    if (quantity.innerHTML != 0) { // Check if quantity is not zero
        notification.innerHTML = counter; // Update notification badge
        notification.classList.remove('hidden'); // Show notification
        cartHasItem.classList.remove('hidden'); // Show cart items
        cartEmpty.classList.add('hidden'); // Hide empty cart message
        totalCheckout(); // Update checkout details
    } else {
        modal.classList.remove('hidden'); // Show modal if cart is empty
        overlay.classList.remove('hidden'); // Show overlay
    }
})

// Event listener to delete item from cart
deleteBtn.addEventListener('click', () => {
    cartHasItem.classList.add('hidden'); // Hide cart items
    cartEmpty.classList.remove('hidden'); // Show empty cart message
    notification.classList.add('hidden'); // Hide notification
})

// Function to close the modal
const closeModal = () => {
    overlay.classList.add('hidden'); // Hide overlay
    modal.classList.add('hidden'); // Hide modal
}

// Event listener to close the modal
modalBtn.addEventListener('click', () => {
    closeModal(); // Call function to close modal
})

// Function to switch images in lightbox and gallery
const switchImg = (index) => {
    const selectedImg = thumbnails[index]; // Selected thumbnail image
    const selectedDiv = divThumbnails[index]; // Container for selected thumbnail
    const selectedLightboxImg = lightboxThumbnail[index]; // Lightbox thumbnail image
    const selectedLightboxDiv = lightBoxDivThumbnails[index]; // Container for lightbox thumbnail

    // Remove 'selected' class from all thumbnails
    thumbnails.forEach(thumb => thumb.classList.remove('selected'));
    divThumbnails.forEach(thumb => thumb.classList.remove('selected-div'));
    lightBoxDivThumbnails.forEach(thumb => thumb.classList.remove('selected-div'));
    lightboxThumbnail.forEach(thumb => thumb.classList.remove('selected'));

    // Add 'selected' class to the chosen thumbnail
    selectedImg.classList.add('selected');
    selectedDiv.classList.add('selected-div');
    selectedLightboxDiv.classList.add('selected-div');
    selectedLightboxImg.classList.add('selected');

    // Update the main image and lightbox image source
    const imgPath = selectedImg.src.replace('-thumbnail', '');
    image.src = imgPath;
    lightboxImage.src = imgPath;
}

// Event listeners for switching images in gallery and lightbox
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        switchImg(index); // Switch image when thumbnail is clicked
    })
});

lightboxThumbnail.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        switchImg(index); // Switch image when lightbox thumbnail is clicked
    })
});

// Function to open the lightbox
const openLightbox = () => {
    lightbox.classList.remove('hidden'); // Show lightbox
    overlay.classList.remove('hidden'); // Show overlay
}

// Event listener to open the lightbox when the main image is clicked
image.addEventListener('click', () => {
    if (window.outerWidth > 480) { // Open lightbox only if window width is greater than 480px
        openLightbox()
    }
})

// Function to close the lightbox
const closeLightbox = () => {
    lightbox.classList.add('hidden'); // Hide lightbox
    overlay.classList.add('hidden'); // Hide overlay
}

// Event listener to close the lightbox
closeBtn.addEventListener('click', () => { closeLightbox() })

// Event listener to close the lightbox when clicking on the overlay
overlay.addEventListener('click', () => {
    closeLightbox(); // Close lightbox
    closeModal(); // Close modal if open
    closeSidebar(); // Close sidebar if open
})

// Function to handle slider arrow clicks
const arrowClick = (direction) => {
    const indexImg = Array.from(thumbnails).findIndex(thumb => thumb.classList.contains('selected')); // Find index of the currently selected thumbnail
    const newIndexImg = (indexImg + direction + thumbnails.length) % thumbnails.length; // Calculate new index with wrap-around
    switchImg(newIndexImg) // Switch to the new image
}

// Event listeners for lightbox and gallery slider arrows
lightboxPrevBtn.addEventListener('click', () => {
    arrowClick(-1) // Show previous image in lightbox
})

lightboxNextBtn.addEventListener('click', () => {
    arrowClick(1); // Show next image in lightbox
})

prevBtn.addEventListener('click', () => {
    arrowClick(-1); // Show previous image in gallery
})

nextBtn.addEventListener('click', () => {
    arrowClick(1); // Show next image in gallery
})

// Sidebar Events

// Function to open the sidebar
const openSidebar = () => {
    openBtn.classList.add('hidden'); // Hide open button
    sidebar.classList.add('open'); // Show sidebar
    sidebarLinks.style.display = 'flex'; // Display sidebar links
    overlay.classList.remove('hidden'); // Show overlay
    closeMenuBtn.classList.remove('hidden'); // Show close menu button
}

// Event listener to open the sidebar menu
openBtn.addEventListener('click', () => {
    openSidebar(); // Call function to open sidebar
})

// Function to close the sidebar
const closeSidebar = () => {
    if (window.innerWidth < 768) { // Only close the sidebar on smaller screens
        sidebar.classList.remove('open'); // Hide sidebar
        sidebarLinks.style.display = 'none'; // Hide sidebar links
        openBtn.classList.remove('hidden'); // Show open button
        closeMenuBtn.classList.add('hidden'); // Hide close menu button
        overlay.classList.add('hidden'); // Hide overlay
    }
}

// Event listener to close the sidebar menu
closeMenuBtn.addEventListener('click', () => {
    closeSidebar(); // Call function to close sidebar
})
