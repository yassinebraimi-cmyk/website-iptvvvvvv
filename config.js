/* ==========================================================================
   AETHERIA IPTV - TMDB API CONFIGURATION
   ========================================================================== */

// Insert your TMDB API Key below
const TMDB_API_KEY = "a07e22bc18f5cb106bfe4cc1f83ad8ed";

// TMDB Base Endpoints
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500/";
const TMDB_BACKDROP_BASE_URL = "https://image.tmdb.org/t/p/original/";

// Category Definitions
const TMDB_CATEGORIES = [
  { id: "trending-movies", title: "🔥 Trending Movies", endpoint: "/trending/movie/week", badge: "🔥 TRENDING" },
  { id: "top-rated", title: "⭐ Top Rated", endpoint: "/movie/top_rated", badge: "⭐ TOP RATED" },
  { id: "tv-series", title: "📺 TV Series", endpoint: "/tv/popular", badge: "HD SERIES" },
  { id: "anime", title: "🍥 Anime", endpoint: "/discover/tv?with_genres=16", badge: "ANIME 4K" },
  { id: "horror", title: "👻 Horror", endpoint: "/discover/movie?with_genres=27", badge: "HORROR" }
];
