const GALLERY_LIST = document.getElementById("galleryList");
const LIGHTBOX_DIALOG = document.getElementById("lightboxDialog");
const LIGHTBOX_IMAGE = document.getElementById("lightboxImage");
const IMAGE_TITLE = document.getElementById("imageTitle");
const LIGHTBOX_COUNTER = document.getElementById("lightboxCounter");

const NAVIGATE_PREVIOUS = -1;
const NAVIGATE_NEXT = 1;

const IMAGES_DATA = [
  { src: "/images/wrangellStElias.jpg", alt: "A scenic mountain and glacier view of Wrangell-St. Elias National Park in Alaska.", caption: "Wrangell-St. Elias (Alaska)" },
  { src: "/images/gatesOfTheArctic.jpg", alt: "Untouched wilderness with grand rivers and dramatic mountain peaks in Gates of the Arctic National Park in Alaska.", caption: "Gates of the Arctic (Alaska)" },
  { src: "/images/denali.jpg", alt: "The snow-covered peak of Mount Denali rising above the vast autumn tundra in Denali National Park in Alaska.", caption: "Denali (Alaska)" },
  { src: "/images/katmai.jpg", alt: "Wild brown bears catching salmon at a rushing waterfall in Katmai National Park in Alaska.", caption: "Katmai (Alaska)" },
  { src: "/images/lakeClark.jpg", alt: "Turquoise alpine waters reflecting rugged mountain crags and glaciers in Lake Clark National Park in Alaska.", caption: "Lake Clark (Alaska)" },
  { src: "/images/deathValley.jpg", alt: "Cracked salt flats stretching across the desert floor under a harsh sun in Death Valley National Park in California and Nevada.", caption: "Death Valley (Kalifornien, Nevada)" },
  { src: "/images/glacierBay.jpg", alt: "Massive tidewater glaciers calving icebergs into the deep blue ocean waters of Glacier Bay National Park in Alaska.", caption: "Glacier Bay (Alaska)" },
  { src: "/images/yellowstone.jpg", alt: "The brilliant rainbow-colored thermal rings of the Grand Prismatic Spring in Yellowstone National Park spanning Wyoming, Montana, and Idaho.", caption: "Yellowstone (Wyoming, Montana, Idaho)" },
  { src: "/images/kobukValley.jpg", alt: "Surreal golden sand dunes framed by dark green boreal forests in Kobuk Valley National Park in Alaska.", caption: "Kobuk Valley (Alaska)" },
  { src: "/images/everglades.jpg", alt: "Lush green sawgrass marshes and swamp mangroves stretching out under a clear sky in the Everglades National Park in Florida.", caption: "Everglades (Florida)" },
  { src: "/images/grandCanyon.jpg", alt: "Layered deep red rock canyons carved by the winding river below during a golden sunset in Grand Canyon National Park in Arizona.", caption: "Grand Canyon (Arizona)" },
  { src: "/images/glacier.jpg", alt: "A sharp alpine valley path lined with vibrant wildflowers leading up to steep glacial peaks in Glacier National Park in Montana.", caption: "Glacier (Montana)" }
];

let currentImageIndex = 0;

function renderGalleryItem(image, index) {
  return `
    <li class="galleryItem">
      <figure class="galleryCard" onclick="openLightbox(${index})">
        <img class="galleryThumbnail" src="${image.src}" alt="${image.alt}">
      </figure>
    </li>
  `;
}

function renderAllThumbnails() {
  IMAGES_DATA.forEach((image, index) => {
    GALLERY_LIST.innerHTML += renderGalleryItem(image, index);
  });
}

function updateLightboxContent() {
  const img = IMAGES_DATA[currentImageIndex];

  LIGHTBOX_IMAGE.src = img.src;
  LIGHTBOX_IMAGE.alt = img.alt;
  IMAGE_TITLE.textContent = img.caption;
  LIGHTBOX_COUNTER.textContent = `${currentImageIndex + 1} / ${IMAGES_DATA.length}`;
}

function openLightbox(index) {
  currentImageIndex = index;
  updateLightboxContent();
  LIGHTBOX_DIALOG.showModal();
  document.addEventListener("keydown", handleGlobalKeyDown);
  LIGHTBOX_DIALOG.addEventListener("click", handleLightboxClick);
  document.getElementById("closeButton").focus();
}

function closeLightbox() {
  LIGHTBOX_DIALOG.close();
  document.removeEventListener("keydown", handleGlobalKeyDown);
  LIGHTBOX_DIALOG.removeEventListener("click", handleLightboxClick);
}

function handleLightboxClick(event) {
  if (event.target === LIGHTBOX_DIALOG) {
    closeLightbox();
  }
}

function navigateLightbox(direction) {
  currentImageIndex += direction;
  if (currentImageIndex >= IMAGES_DATA.length) {
    currentImageIndex = 0;
  }
  if (currentImageIndex < 0) {
    currentImageIndex = IMAGES_DATA.length - 1;
  }
  updateLightboxContent();
}

function handleGlobalKeyDown(event) {
  if (event.key === "ArrowLeft") {
    event.preventDefault(); 
    event.stopPropagation(); 
    navigateLightbox(NAVIGATE_PREVIOUS);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault(); 
    event.stopPropagation(); 
    navigateLightbox(NAVIGATE_NEXT);
  }
}

function init() {
  renderAllThumbnails();
}

init();
