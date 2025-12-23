const buttons = document.querySelectorAll(".buttons");
const images = document.querySelectorAll(".image");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightbox-img");
const close = document.getElementById("close");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let activeImages = [];

// Loop through each button
buttons.forEach((button) => {
    button.addEventListener("click",() => {
        buttons.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        // Category from data-filter
        const filter = button.getAttribute("data-filter");

        activeImages = [];

        // loop through all images
        images.forEach((image) => {
            if (filter === "all" || image.classList.contains(filter)){
                image.style.display = "block";
                activeImages.push(image);
            }
            else{
                image.style.display = "none";
            }
        });
    });
});

// Lightbox JS
let currentImageIndex = 0;
images.forEach((img) => {
    img.addEventListener("click", function(event) {
        event.preventDefault();
        lightbox.style.display = "flex";
        lightboxImage.src = img.href;
        currentImageIndex = activeImages.indexOf(img);
    });
});

// Next
next.addEventListener("click", function() {
    currentImageIndex++;
    if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    lightboxImage.src = activeImages[currentImageIndex].href;
});

// Previous
prev.addEventListener("click", function() {
    currentImageIndex--;
    if (currentImageIndex < 0){
        currentImageIndex = images.length - 1;
    }
    lightboxImage.src = activeImages[currentImageIndex].href;
})

// Close
close.addEventListener("click", function(){
    lightbox.style.display = "none";
});