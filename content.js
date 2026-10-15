// Site content: edit this file to swap photos, reels, brands and copy.
// Layout lives in "Sunali Talwar Site v2.dc.html"; nothing here affects styling.
window.SITE_CONTENT = {
  hero: {
    image: 'assets/home.jpg',
    imageAlt: 'Sunali Talwar in an emerald gown on a hillside balcony',
    reel: 'isntree' // id from reels below
  },
  portrait: 'assets/portrait.jpeg',

  // Contact form. Paste your Formspree (or Basin / Web3Forms) endpoint to receive inquiries by email,
  // e.g. 'https://formspree.io/f/xxxxxxx'. Left empty, the form opens the visitor's email app instead.
  contact: { email: 'sunalitalwar80@gmail.com', formEndpoint: 'https://formspree.io/f/xzdpppeg' },

  // Photos by slot. Drop a file in assets/photos/ and set its path here.
  // 'store-home' is a TEMPORARY stand-in on the home page: replace with a real store / café photo (portrait 4:5, 1600px+).
  // case-<brand> entries (e.g. 'case-amazon') show a photo in that brand's case study; empty shows a typeset brand card.
  photos: {
    'store-home': 'assets/lifestyle_cover.jpeg',
    'case-amazon': '', 'case-flipkart': '', 'case-myntra': '', 'case-sugar': '', 'case-faces-canada': '', 'case-swiss-beauty': '',
    'case-bblunt': '', 'case-pyunkang-yul': '', 'case-louenhide': ''
  },

  // Reels: put the mp4 in assets/reels/, add an optional poster jpg, paste the Instagram link.
  reels: [
    { id: 'maybelline', brand: 'Maybelline', cat: 'Beauty', src: 'assets/reels/maybelline.mp4', ig: 'https://www.instagram.com/reel/DLkcXV_JvIv/', format: 'Instagram Reel · makeup demo' },
    { id: 'zeiss', brand: 'Zeiss', cat: 'Lifestyle', src: 'assets/reels/zeiss.mp4', ig: 'https://www.instagram.com/reel/DNPwZ-chmXQ/', format: 'Instagram Reel · eyewear' },
    { id: 'zara', brand: 'Zara', cat: 'Fashion', src: 'assets/reels/zara.mp4', ig: 'https://www.instagram.com/reel/DVTgWisCQOJ/', format: 'Instagram Reel · styling' },
    { id: 'rexona', brand: 'Rexona', cat: 'Beauty', src: 'assets/reels/rexona.mp4', ig: 'https://www.instagram.com/reel/DQ9dGlTibxB/', format: 'Instagram Reel · product review' },
    { id: 'suratikart', brand: 'Surati Kart', cat: 'Fashion', src: 'assets/reels/suratikart.mp4', ig: 'https://www.instagram.com/reel/DOvZV2eCXjL/', format: 'Instagram Reel · ethnic wear', featured: true },
    { id: 'seranatural', brand: 'Sera Natural', cat: 'Lifestyle', src: 'assets/reels/seranatural.mp4', ig: 'https://www.instagram.com/reel/DUkYHHsEfBV/', format: 'Instagram Reel · UGC', featured: true },
    { id: 'isntree', brand: 'Isntree', cat: 'Beauty', src: 'assets/reels/isntree.mp4', ig: 'https://www.instagram.com/reel/DRmrhycie-g/', format: 'Instagram Reel', featured: true },
    { id: 'goodscity', brand: 'Goods City', cat: 'Lifestyle', src: 'assets/reels/goodscity.mp4', ig: 'https://www.instagram.com/reel/DVGtxbSCYsL/', format: 'Instagram Reel · UGC' },
    { id: 'suratikart2', brand: 'Surati Kart', cat: 'Fashion', src: 'assets/reels/suratikart2.mp4', ig: 'https://www.instagram.com/reel/DQzMi8tiR5G/', format: 'Instagram Reel · try-on' },
    { id: 'amazon', brand: 'Amazon', cat: 'Lifestyle', src: 'assets/reels/amazon.mp4', ig: '', format: 'Instagram Reel' },
    { id: 'flipkart', brand: 'Flipkart', cat: 'Lifestyle', src: 'assets/reels/flipkart.mp4', ig: '', format: 'Instagram Reel' },
    { id: 'sugar', brand: 'SUGAR', cat: 'Beauty', src: 'assets/reels/sugar.mp4', ig: '', format: 'Instagram Reel' },
    { id: 'facescanada', brand: 'Faces Canada', cat: 'Beauty', src: 'assets/reels/facescanada.mp4', ig: '', format: 'Instagram Reel' },
    { id: 'swissbeauty', brand: 'Swiss Beauty', cat: 'Beauty', src: 'assets/reels/swissbeauty.mp4', ig: '', format: 'Instagram Reel' },
    { id: 'bblunt', brand: 'BBlunt', cat: 'Beauty', src: 'assets/reels/bblunt.mp4', ig: '', format: 'Instagram Reel' },
    { id: 'pyunkangyul', brand: 'Pyunkang Yul', cat: 'Beauty', src: 'assets/reels/pyunkang-yul.mp4', ig: '', format: 'Instagram Reel' },
    { id: 'louenhide', brand: 'Louenhide', cat: 'Fashion', src: 'assets/reels/louenhide.mp4', ig: '', format: 'Instagram Reel' }
  ],

  // Brands: leave logo empty to show the typeset wordmark.
  // To use an official logo, drop an SVG/PNG in assets/brands/ and set logo: 'assets/brands/name.svg'.
  brands: [
    { name: 'Amazon', logo: 'assets/brands/amazon.svg' },
    { name: 'Flipkart', logo: 'assets/brands/flipkart.svg' },
    { name: 'Myntra', logo: '' },
    { name: 'SUGAR', logo: '' },
    { name: 'Faces Canada', logo: '' },
    { name: 'Swiss Beauty', logo: '' },
    { name: 'BBlunt', logo: '' },
    { name: 'Pyunkang Yul', logo: '' },
    { name: 'Louenhide', logo: '' },
    { name: 'Surati Kart', logo: '' },
    { name: 'Sera Natural', logo: '' },
    { name: 'Isntree', logo: '' },
    { name: 'Maybelline', logo: '' },
    { name: 'Blue Heaven', logo: '' },
    { name: 'Pond\u2019s', logo: 'assets/brands/ponds.svg' },
    { name: 'Sunsilk', logo: 'assets/brands/sunsilk.svg' },
    { name: 'TRESemm\u00e9', logo: 'assets/brands/tresemme.svg' },
    { name: 'Dot & Key', logo: 'assets/brands/dotandkey.svg' },
    { name: 'Rexona', logo: '' },
    { name: 'Zara', logo: '' },
    { name: 'Zeiss', logo: '' },
    { name: 'SHEIN', logo: 'assets/brands/shein.svg' },
    { name: 'Hilary Rhoda', logo: 'assets/brands/hilaryrhoda.svg' }
  ],

  // Store & café visit reels (Store visits page). Same fields as reels above; run `node tools/optimize-media.mjs` after adding mp4s.
  storeReels: [
    { id: 'california-burrito', brand: 'California Burrito', cat: 'Dining', src: 'assets/reels/stores-and-cafes/california_burrito.mp4', ig: '', format: 'Store & café visit' },
    { id: 'drink-and-dine', brand: 'Drink & Dine', cat: 'Dining', src: 'assets/reels/stores-and-cafes/drink-and-dine.mp4', ig: '', format: 'Store & café visit' },
    { id: 'kishan-lal-da-dhaba', brand: 'Kishan Lal Da Dhaba', cat: 'Dining', src: 'assets/reels/stores-and-cafes/kishan-lal-da-dhaba.mp4', ig: '', format: 'Store & café visit' },
    { id: 'namaste-punjab', brand: 'Namaste Punjab', cat: 'Dining', src: 'assets/reels/stores-and-cafes/namaste-punjab.mp4', ig: '', format: 'Store & café visit' },
    { id: 'punjabi-adda', brand: 'Punjabi Adda', cat: 'Dining', src: 'assets/reels/stores-and-cafes/punjabi-adda.mp4', ig: '', format: 'Store & café visit' }
  ],

  // Case studies (ordered by popularity). Set reel: '<reel id>' to show a video; otherwise a drop-in image slot is shown.
  // format: optional, e.g. 'Instagram Reel · unboxing'. results: optional, e.g. '1.2M views · 14K saves' (hidden when empty).
  caseStudies: [
    { brand: 'Amazon', cat: 'Marketplace', reel: 'amazon', format: '', results: '' },
    { brand: 'Flipkart', cat: 'Marketplace', reel: 'flipkart', format: '', results: '' },
    { brand: 'Myntra', cat: 'Fashion', reel: '', format: '', results: '' },
    { brand: 'SUGAR', cat: 'Beauty', reel: 'sugar', format: '', results: '' },
    { brand: 'Faces Canada', cat: 'Beauty', reel: 'facescanada', format: '', results: '' },
    { brand: 'Swiss Beauty', cat: 'Beauty', reel: 'swissbeauty', format: '', results: '' },
    { brand: 'BBlunt', cat: 'Haircare', reel: 'bblunt', format: '', results: '' },
    { brand: 'Pyunkang Yul', cat: 'Skincare', reel: 'pyunkangyul', format: '', results: '' },
    { brand: 'Louenhide', cat: 'Fashion accessories', reel: 'louenhide', format: '', results: '' },
    { brand: 'Surati Kart', cat: 'Fashion', reel: 'suratikart', format: '', results: '' },
    { brand: 'Sera Natural', cat: 'Lifestyle', reel: 'seranatural', format: '', results: '' },
    { brand: 'Isntree', cat: 'Skincare', reel: 'isntree', format: '', results: '' }
  ],

  categories: [
    { name: 'Beauty', img: 'assets/beauty.jpeg', line: 'Skin first, shade second, confidence always.' },
    { name: 'Fashion', img: 'assets/fashion.jpg', line: 'Outfits with a point of view.' },
    { name: 'Lifestyle', img: 'assets/lifestyle_cover.jpeg', line: 'Cafés, counters and everything in between.' }
  ],

  // Audience numbers (update monthly). Shown on Home and the Media Kit.
  stats: [
    { value: '53.3K', label: 'Instagram followers' },
    { value: '90K', label: 'Avg. reel views' },
    { value: '4.9%', label: 'Engagement rate' },
    { value: '18–24', label: 'Top audience age' }
  ],

  // Extra audience numbers shown only on the Media Kit (Home uses "stats" above).
  kitStats: [
    { value: '53.3K', label: 'Instagram followers' },
    { value: '90K', label: 'Avg. reel views' },
    { value: '4.9%', label: 'Engagement rate' },
    { value: '18–24', label: 'Top audience age' },
    { value: '62% women', label: 'Audience gender' },
    { value: 'Delhi NCR', label: 'Top city' },
    { value: '1.6M', label: 'Monthly reach' }
  ]
};
