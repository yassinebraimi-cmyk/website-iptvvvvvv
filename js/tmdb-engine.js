/* ==========================================================================
   AETHERIA IPTV - DYNAMIC TMDB API ENTERTAINMENT ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  initTMDBEntertainmentLibrary();
});

// Cache Expiration Time: 2 Hours (7200000 ms)
const CACHE_TTL = 7200000;

async function initTMDBEntertainmentLibrary() {
  const container = document.getElementById("tmdb-showcase-rows");
  if (!container) return;

  // Step 1: Render Skeleton Loader Rows immediately to prevent layout shifts
  renderSkeletonShowcase(container);

  // Step 2: Fetch or retrieve cached TMDB data for all categories
  const apiKey = (typeof TMDB_API_KEY !== "undefined" && TMDB_API_KEY !== "YOUR_API_KEY") 
    ? TMDB_API_KEY 
    : "a07e22bc18f5cb106bfe4cc1f83ad8ed";

  const categoryPromises = TMDB_CATEGORIES.map(cat => fetchCategoryContent(cat, apiKey));
  const categoryResults = await Promise.all(categoryPromises);

  // Step 3: Clear skeleton loaders and render real TMDB poster rows
  container.innerHTML = "";

  categoryResults.forEach((catData, index) => {
    if (!catData || !catData.items || catData.items.length === 0) return;
    renderTMDBCategoryRow(container, catData, index);
  });
}

// Render Animated Skeleton Loader Rows
function renderSkeletonShowcase(container) {
  container.innerHTML = "";

  TMDB_CATEGORIES.slice(0, 6).forEach(cat => {
    const rowSection = document.createElement("div");
    rowSection.className = "tmdb-row-section";

    let skeletonCards = "";
    for (let i = 0; i < 8; i++) {
      skeletonCards += `
        <div class="skeleton-card">
          <div class="skeleton-img"></div>
          <div class="skeleton-line short"></div>
          <div class="skeleton-line"></div>
        </div>
      `;
    }

    rowSection.innerHTML = `
      <div class="tmdb-row-header">
        <h3 class="tmdb-row-title">${cat.title}</h3>
      </div>
      <div class="skeleton-track-wrapper">
        ${skeletonCards}
      </div>
    `;

    container.appendChild(rowSection);
  });
}

// Fetch Content from TMDB API with LocalStorage Caching
async function fetchCategoryContent(cat, apiKey) {
  const cacheKey = `tmdb_cache_${cat.id}`;
  const cached = localStorage.getItem(cacheKey);

  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Date.now() - parsed.timestamp < CACHE_TTL) {
        return { category: cat, items: parsed.items };
      }
    } catch (e) {
      console.warn("Cache parse error, refetching...", e);
    }
  }

  const delimiter = cat.endpoint.includes("?") ? "&" : "?";
  const url = `${TMDB_BASE_URL}${cat.endpoint}${delimiter}api_key=${apiKey}&language=en-US&page=1`;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    const data = await res.json();

    const items = (data.results || []).filter(item => item.poster_path).map(item => ({
      id: item.id,
      title: item.title || item.name || "Untitled",
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      vote_average: item.vote_average ? item.vote_average.toFixed(1) : "8.5",
      release_date: (item.release_date || item.first_air_date || "").substring(0, 4) || "2026",
      overview: item.overview || "High-bitrate 4K Ultra HD stream available on Aetheria IPTV.",
      media_type: item.title ? "movie" : "tv"
    }));

    // Cache successful API results
    localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), items }));
    return { category: cat, items };

  } catch (error) {
    console.error(`Error fetching ${cat.title} from TMDB:`, error);
    return null;
  }
}

// Render TMDB Category Row with Alternating Infinite Scrolling & Touch Swipe
function renderTMDBCategoryRow(container, catData, index) {
  const cat = catData.category;
  const items = catData.items;

  const rowSection = document.createElement("div");
  rowSection.className = "tmdb-row-section reveal active";

  const isReverse = index % 2 === 1;
  const trackClass = isReverse ? "tmdb-track marquee-reverse" : "tmdb-track marquee-normal";

  // Duplicate items array to ensure seamless infinite looping
  const duplicatedItems = [...items, ...items];

  let cardsHTML = "";

  const fallbackPosters = [
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop"
  ];

  duplicatedItems.forEach((item, idx) => {
    const posterUrl = item.poster_path 
      ? `${TMDB_IMAGE_BASE_URL}${item.poster_path}` 
      : fallbackPosters[idx % fallbackPosters.length];

    cardsHTML += `
      <div class="tmdb-card" data-tmdb-id="${item.id}" data-media-type="${item.media_type}">
        <div class="tmdb-card-canvas">
          <div class="tmdb-card-badges">
            <span class="tmdb-badge-cat">${cat.badge}</span>
            <span class="tmdb-badge-rating">⭐ ${item.vote_average}</span>
          </div>

          <img src="${posterUrl}" alt="${item.title}" class="tmdb-card-img" loading="lazy" referrerpolicy="no-referrer" onError="this.onerror=null; this.src='${fallbackPosters[idx % fallbackPosters.length]}';">

          <div class="tmdb-card-overlay">
            <span class="tmdb-overlay-year">${item.release_date}</span>
            <h4 class="tmdb-overlay-title">${item.title}</h4>
            <p class="tmdb-overlay-desc">${item.overview}</p>
            <div class="tmdb-play-btn">
              <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
      </div>
    `;
  });

  rowSection.innerHTML = `
    <div class="tmdb-row-header">
      <h3 class="tmdb-row-title">${cat.title}</h3>
      <span class="tmdb-row-count">${items.length}+ Titles in 4K</span>
    </div>
    <div class="tmdb-marquee-container">
      <div class="${trackClass}">
        ${cardsHTML}
      </div>
    </div>
  `;

  // Attach click listener for preview modal
  const cards = rowSection.querySelectorAll(".tmdb-card");
  cards.forEach(card => {
    card.addEventListener("click", () => {
      const itemId = card.getAttribute("data-tmdb-id");
      const matched = items.find(i => String(i.id) === itemId);
      if (matched) {
        openTMDBPreviewModal(matched);
      }
    });
  });

  // Enable Touch Swipe Dragging for mobile devices
  enableTouchDrag(rowSection.querySelector(".tmdb-marquee-container"));

  container.appendChild(rowSection);
}

// Open Quick Preview Modal for TMDB Items
function openTMDBPreviewModal(item) {
  const modal = document.getElementById("trailer-modal");
  if (!modal) return;

  const titleEl = document.getElementById("modal-title");
  const genreEl = document.getElementById("modal-genre");
  const durationEl = document.getElementById("modal-duration");
  const synopsisEl = document.getElementById("modal-synopsis");
  const posterEl = document.getElementById("modal-poster");

  const backdropUrl = item.backdrop_path 
    ? `${TMDB_BACKDROP_BASE_URL}${item.backdrop_path}` 
    : `${TMDB_IMAGE_BASE_URL}${item.poster_path}`;

  if (titleEl) titleEl.textContent = item.title;
  if (genreEl) genreEl.textContent = `TMDB Rating: ⭐ ${item.vote_average} / 10`;
  if (durationEl) durationEl.textContent = `${item.release_date} • 4K Ultra HD • AntiFreeze 9.0`;
  if (synopsisEl) synopsisEl.textContent = item.overview;
  if (posterEl) {
    posterEl.referrerPolicy = "no-referrer";
    posterEl.src = backdropUrl;
    posterEl.onerror = function() {
      this.src = `${TMDB_IMAGE_BASE_URL}${item.poster_path}`;
    };
  }

  modal.classList.add("open");
}

// Enable Smooth Touch / Mouse Dragging on Mobile & Touch Screens
function enableTouchDrag(slider) {
  if (!slider) return;

  let isDown = false;
  let startX;
  let scrollLeft;

  slider.addEventListener("mousedown", (e) => {
    isDown = true;
    slider.classList.add("dragging");
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
  });

  slider.addEventListener("mouseleave", () => {
    isDown = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mouseup", () => {
    isDown = false;
    slider.classList.remove("dragging");
  });

  slider.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 2;
    slider.scrollLeft = scrollLeft - walk;
  });
}
