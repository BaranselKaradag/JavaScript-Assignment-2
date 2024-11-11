// Array containing all image data, including full image, thumbnail, caption, credit, and source link
const images = [
    { 
        full: 'images/flowers-pink-large.jpg', 
        thumb: 'images/flowers-pink-small.jpg', 
        caption: 'Pink Flowers', 
        credit: 'Market in Münster, North Rhine-Westphalia, Germany.', 
        link: 'https://commons.wikimedia.org/w/index.php?curid=62071586' 
    },
    { 
        full: 'images/flowers-purple-large.jpg', 
        thumb: 'images/flowers-purple-small.jpg', 
        caption: 'Purple Flowers', 
        credit: 'Sentmaring Park, Münster, North Rhine-Westphalia, Germany.', 
        link: 'https://commons.wikimedia.org/w/index.php?curid=48576226' 
    },
    { 
        full: 'images/flowers-red-large.jpg', 
        thumb: 'images/flowers-red-small.jpg', 
        caption: 'Red Flowers', 
        credit: 'Poppies in cornfield, Dülmen, North Rhine-Westphalia, Germany.', 
        link: 'https://commons.wikimedia.org/w/index.php?curid=40957238' 
    },
    { 
        full: 'images/flowers-white-large.jpg', 
        thumb: 'images/flowers-white-small.jpg', 
        caption: 'White Flowers', 
        credit: 'Daffodils in Sentmaring park, Münster, North Rhine-Westfalia, Germany.', 
        link: 'https://commons.wikimedia.org/w/index.php?curid=48211466' 
    },
    { 
        full: 'images/flowers-yellow-large.jpg', 
        thumb: 'images/flowers-yellow-small.jpg', 
        caption: 'Yellow Flowers', 
        credit: 'Sunflowers in the hamlet Dernekamp, Kirchspiel, Dülmen, North Rhine-Westphalia, Germany.', 
        link: 'https://commons.wikimedia.org/w/index.php?curid=61514522' 
    }
];

// Current image index (starts at 0)
let currentIndex = 0;

// References to HTML elements for featured image, caption, thumbnails, and buttons
const featuredImage = document.querySelector('figure img');
const figcaption = document.querySelector('figure figcaption');
const thumbnailImages = document.querySelectorAll('ul li img');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Function to display the current image with smooth transition effects
function displayImage(index) {
    // Fade out the current image, then update the source and fade it back in
    featuredImage.style.opacity = 0;
    setTimeout(() => {
        featuredImage.src = images[index].full; // Update the full image
        featuredImage.style.transition = 'opacity 1s ease-in-out'; // Add transition for fade-in effect
        featuredImage.style.opacity = 1; // Fade in the new image
    }, 500);

    // Fade out the caption, then update it and fade it in
    figcaption.style.opacity = 0;
    setTimeout(() => {
        figcaption.innerHTML = ` 
            <strong>${images[index].caption}</strong><br>
            ${images[index].credit}<br>
            <a href="${images[index].link}" target="_blank">View Image Source</a>
        `;
        figcaption.style.transition = 'opacity 1s ease-in-out'; // Add transition for fade-in effect
        figcaption.style.opacity = 1; // Fade in the new caption
    }, 500);

    // Update the active thumbnail (add active class and apply effect)
    document.querySelectorAll('.active').forEach(img => img.classList.remove('active'));
    thumbnailImages[index].classList.add('active');
}

// Initialize the gallery by displaying the first image
displayImage(currentIndex);

// Event listeners for slideshow controls (previous and next buttons) with animation
prevBtn.addEventListener('click', () => {
    // Move to the previous image, or loop to the last image if at the first
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : images.length - 1;
    displayImage(currentIndex); // Display the new image
});

nextBtn.addEventListener('click', () => {
    // Move to the next image, or loop to the first image if at the last
    currentIndex = (currentIndex < images.length - 1) ? currentIndex + 1 : 0;
    displayImage(currentIndex); // Display the new image
});

// Click event for each thumbnail to update the featured image
thumbnailImages.forEach((thumbImg, index) => {
    thumbImg.addEventListener('click', () => {
        currentIndex = index; // Update the current index based on the clicked thumbnail
        displayImage(currentIndex); // Display the selected image
    });

    // Hover effect to zoom in on thumbnail
    thumbImg.addEventListener('mouseover', () => {
        thumbImg.style.transform = 'scale(1.2)'; // Zoom in on thumbnail
        thumbImg.style.transition = 'transform 0.3s ease'; // Smooth zoom-in transition
    });

    // Hover out effect to return the thumbnail to its original size
    thumbImg.addEventListener('mouseout', () => {
        thumbImg.style.transform = 'scale(1)'; // Return to original size
    });
});