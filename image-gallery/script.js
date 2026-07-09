// ============================
// Select Elements
// ============================

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.querySelector(".lightbox");
const lightboxImg = document.querySelector(".lightbox-img");
const closeBtn = document.querySelector(".close-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const imageCount = document.querySelector(".image-count");

const filterBtns = document.querySelectorAll(".filter-btn");

let currentIndex = 0;

// ============================
// Update Lightbox
// ============================

function updateLightbox() {
    const img = galleryItems[currentIndex].querySelector("img");

    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;

    imageCount.textContent = `${currentIndex + 1} / ${galleryItems.length}`;
}

// ============================
// Open Lightbox
// ============================

galleryItems.forEach((item, index) => {

    item.addEventListener("click", () => {

        currentIndex = index;

        updateLightbox();

        lightbox.classList.remove("hidden");

        document.body.style.overflow = "hidden";

    });

});

// ============================
// Close Lightbox
// ============================

function closeLightbox() {

    lightbox.classList.add("hidden");

    document.body.style.overflow = "auto";

}

closeBtn.addEventListener("click", closeLightbox);

// ============================
// Next Image
// ============================

nextBtn.addEventListener("click", () => {

    currentIndex++;

    if (currentIndex >= galleryItems.length) {
        currentIndex = 0;
    }

    updateLightbox();

});

// ============================
// Previous Image
// ============================

prevBtn.addEventListener("click", () => {

    currentIndex--;

    if (currentIndex < 0) {
        currentIndex = galleryItems.length - 1;
    }

    updateLightbox();

});

// ============================
// Keyboard Controls
// ============================

document.addEventListener("keydown", (e) => {

    if (lightbox.classList.contains("hidden")) return;

    if (e.key === "Escape") {

        closeLightbox();

    }

    if (e.key === "ArrowRight") {

        nextBtn.click();

    }

    if (e.key === "ArrowLeft") {

        prevBtn.click();

    }

});

// ============================
// Close on Background Click
// ============================

lightbox.addEventListener("click", (e) => {

    if (e.target === lightbox) {

        closeLightbox();

    }

});

// ============================
// Filter Images
// ============================

filterBtns.forEach(button => {

    button.addEventListener("click", () => {

        // Active Button
        filterBtns.forEach(btn => btn.classList.remove("active"));

        button.classList.add("active");

        const filter = button.dataset.filter;

        galleryItems.forEach(item => {

            if (
                filter === "all" ||
                item.dataset.category === filter
            ) {

                item.style.display = "block";

            } else {

                item.style.display = "none";

            }

        });

    });

});

// ============================
// Image Effects
// ============================

const effectButtons = document.querySelectorAll(".effect-btn");

effectButtons.forEach(button => {

    button.addEventListener("click", () => {

        effectButtons.forEach(btn =>
            btn.classList.remove("active")
        );

        button.classList.add("active");

        const effect = button.dataset.effect;

        document.querySelectorAll(".gallery-item img").forEach(img => {

            img.style.filter = effect;

        });

    });

});