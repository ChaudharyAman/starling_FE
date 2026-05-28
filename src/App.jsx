import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'

const PRODUCTS = [
  {
    id: 1,
    name: 'Benny Dog',
    tagline: 'The quiet little dreamer with a heart full of wonder.',
    price: 1299,
    originalPrice: 1599,
    image: '16.jpeg',
    gallery: ['16.jpeg', '9.jpeg'],
    category: 'Dolls',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 124,
    inStock: true,
    description:
      'Lovingly handcrafted with soft fabrics and calming details. Dreamer Doll is made for bedtime cuddles, storytelling moments, and comforting little rituals. Each doll is stitched with care and attention to every tiny detail.',
    details: [
      'Height: approx 30cm',
      'Material: 100% cotton outer, hypoallergenic filling',
      'Hand wash only, cold water',
      'Suitable for ages 0+',
      'CE certified & safety tested',
    ],
    tags: ['doll', 'handmade', 'gift'],
    variants: [
      { label: 'Small (25cm)', sku: 'DD-SM' },
      { label: 'Standard (30cm)', sku: 'DD-ST' },
      { label: 'Large (38cm)', sku: 'DD-LG' },
    ],
  },
  {
    id: 2,
    name: 'Dreamer Doll ',
    tagline: 'Gentle, wise, and endlessly comforting.',
    price: 1099,
    originalPrice: null,
    image: '3.jpeg',
    gallery: ['3.jpeg', '5.jpeg'],
    category: 'Soft Toys',
    badge: 'New',
    rating: 4.8,
    reviews: 87,
    inStock: true,
    description:
      'Ellie brings calm energy, soft hugs, and timeless nursery charm. Made with the gentlest fabrics for little hands to hold tight.',
    details: [
      'Height: approx 28cm',
      'Material: plush velvet outer, PP cotton fill',
      'Surface wash only',
      'Suitable for ages 0+',
      'CE certified',
    ],
    tags: ['elephant', 'soft toy', 'nursery'],
    variants: [
      { label: 'Grey', sku: 'EE-GR' },
      { label: 'Blue', sku: 'EE-BL' },
    ],
  },
  {
    id: 3,
    name: 'MILO MONKEY',
    tagline: 'Playful, cheerful, and always ready for tiny adventures.',
    price: 1199,
    originalPrice: 1499,
    image: '2.jpeg',
    gallery: ['2.jpeg'],
    category: 'Soft Toys',
    badge: 'Bestseller',
    rating: 4.9,
    reviews: 203,
    inStock: true,
    description:
      'Kiki reminds little ones that love is the safest place to land. Her front pocket holds surprises - a tiny joey, a note, or whatever the day brings.',
    details: [
      'Height: approx 32cm',
      'Material: knitted cotton',
      'Hand wash only',
      'Suitable for ages 1+',
      'CE certified',
    ],
    tags: ['kangaroo', 'knitted', 'gift'],
    variants: [{ label: 'Natural Cream', sku: 'KK-NC' }],
  },
  {
    id: 4,
    name: 'Kiki Kangaroo  ',
    tagline: 'Loyal, lovable, and made for everyday companionship.',
    price: 999,
    originalPrice: null,
    image: '1.jpeg',
    gallery: ['1.jpeg'],
    category: 'Soft Toys',
    badge: null,
    rating: 4.7,
    reviews: 56,
    inStock: true,
    description:
      'Benny is the soft friend for sleepy afternoons and treasured memories. Complete with a cosy polka-dot blanket in every set.',
    details: [
      'Includes matching blanket',
      'Height: approx 26cm',
      'Material: crocheted cotton',
      'Spot clean only',
      'Suitable for ages 0+',
    ],
    tags: ['dog', 'crochet', 'bundle'],
    variants: [
      { label: 'With Blanket', sku: 'BD-BL' },
      { label: 'Without Blanket', sku: 'BD-NB' },
    ],
  },
  {
    id: 5,
    name: 'Buttercup Lamb',
    tagline: 'A little lamb, a lot of love.',
    price: 1399,
    originalPrice: null,
    image: '11.jpeg',
    gallery: ['11.jpeg'],
    category: 'Soft Toys',
    badge: 'New',
    rating: 5,
    reviews: 34,
    inStock: true,
    description:
      'Soft cuddles. Pure comfort. Buttercup wears her pink bow proudly and comes with a tiny golden bell - a gentle jingle for every cuddle.',
    details: [
      'Height: approx 22cm',
      'Material: boucle fabric & corduroy trim',
      'Spot clean',
      'Suitable for ages 0+',
      'CE certified',
    ],
    tags: ['lamb', 'white', 'pink', 'soft'],
    variants: [{ label: 'White/Pink', sku: 'BL-WP' }],
  },
  {
    id: 6,
    name: 'Cowgirl Doll',
    tagline: 'Handmade with love, dressed for adventure.',
    price: 1599,
    originalPrice: 1899,
    image: '13.jpeg',
    gallery: ['13.jpeg'],
    category: 'Dolls',
    badge: 'Sale',
    rating: 4.8,
    reviews: 91,
    inStock: true,
    description:
      'With her denim plaid dress, braided yarn hair, and matching cowgirl hat, this doll is as charming as they come. Fully handcrafted, every stitch placed with intention.',
    details: [
      'Height: approx 34cm',
      'Material: cotton fabric, yarn hair',
      'Hand wash cold',
      'Suitable for ages 3+',
      'Handmade - slight variations are part of the charm',
    ],
    tags: ['doll', 'cowgirl', 'blue', 'handmade'],
    variants: [
      { label: 'Blue Plaid', sku: 'CG-BP' },
      { label: 'Pink Plaid', sku: 'CG-PP' },
    ],
  },
  {
    id: 7,
    name: 'Bunny Backpack',
    tagline: "Your little one's adventure companion.",
    price: 1799,
    originalPrice: null,
    image: '8.jpeg',
    gallery: ['8.jpeg', '7.jpeg'],
    category: 'Accessories',
    badge: 'Personalised',
    rating: 4.9,
    reviews: 178,
    inStock: true,
    description:
      'A waffle-knit toddler backpack with a plush bunny friend tucked in the front pocket. Available with personalised embroidered name on the pocket.',
    details: [
      'Dimensions: 28cm x 22cm x 10cm',
      'Material: waffle cotton, plush bunny',
      'Wipe clean',
      'Suitable for ages 2+',
      'Custom name embroidery available',
    ],
    tags: ['backpack', 'bunny', 'personalised', 'toddler'],
    variants: [
      { label: 'Sage Green', sku: 'BB-SG' },
      { label: 'Dusty Pink', sku: 'BB-DP' },
    ],
  },
  {
    id: 8,
    name: 'Unicorn Quilt',
    tagline: 'A magical quilt for little dreamers.',
    price: 2499,
    originalPrice: 2999,
    image: '4.jpeg',
    gallery: ['4.jpeg'],
    category: 'Nursery',
    badge: 'Sale',
    rating: 4.7,
    reviews: 62,
    inStock: true,
    description:
      'Pastel unicorns, rainbows, and wildflowers quilt-stitched onto the softest cotton. Reversible plaid backing. A forever piece for every nursery.',
    details: [
      'Size: 100cm x 130cm',
      'Material: 100% cotton muslin',
      'Machine wash gentle, cold',
      'Suitable for ages 0+',
      'Reversible design',
    ],
    tags: ['quilt', 'nursery', 'unicorn', 'pastel'],
    variants: [{ label: 'Pastel Multi', sku: 'UQ-PM' }],
  },
  {
    id: 9,
    name: 'Bunny Family Basket',
    tagline: 'Three best friends in their cosy home.',
    price: 3499,
    originalPrice: null,
    image: '14.jpeg',
    gallery: ['14.jpeg'],
    category: 'Gift Hampers',
    badge: 'Gift Set',
    rating: 5,
    reviews: 47,
    inStock: true,
    description:
      'Three handcrafted linen bunnies - each uniquely dressed - nestled in a personalised rope basket. Perfect as a nursery gift or sibling set.',
    details: [
      'Includes 3 bunnies + rope basket',
      'Bunnies: approx 25cm each',
      'Basket: 22cm diameter',
      'Personalised letter patch available',
      'Handmade - each set unique',
    ],
    tags: ['bunny', 'gift set', 'basket', 'personalised'],
    variants: [{ label: 'Set of 3', sku: 'BFB-3' }],
  },
  {
    id: 10,
    name: 'Toy Storage Unicorn',
    tagline: 'From gift hamper to toy storage - grows with the child.',
    price: 2199,
    originalPrice: null,
    image: '6.jpeg',
    gallery: ['6.jpeg', '10.jpeg', '12.jpeg'],
    category: 'Nursery',
    badge: null,
    rating: 4.6,
    reviews: 29,
    inStock: true,
    description:
      'A striped fabric unicorn that doubles as a toy storage basket. Fill it with gifts, then use it as a beloved nursery storage piece for years.',
    details: [
      'Dimensions: 40cm wide x 30cm tall',
      'Material: ticking stripe cotton',
      'Wipe clean',
      'Suitable from birth',
      'Can hold up to 3kg',
    ],
    tags: ['storage', 'unicorn', 'nursery', 'dual-use'],
    variants: [{ label: 'Natural Stripe', sku: 'TSU-NS' }],
  },
]

const navLinks = [
  'Home',
  'Our Residents',
  'Gift Hampers',
  'Nursery Collection',
  'Personalisation',
  'About Us',
]

const pillars = [
  {
    title: 'Thoughtful Materials',
    text: 'Made with gentle fabrics and safe, high quality fillings',
    icon: 'leaf',
  },
  {
    title: 'Made With Love',
    text: 'Handcrafted with care in every little detail',
    icon: 'heart',
  },
  {
    title: 'Perfect For Gifting',
    text: 'Beautifully packaged for meaningful moments',
    icon: 'gift',
  },
  {
    title: 'Timeless Keepsakes',
    text: 'Created to be loved today and treasured always',
    icon: 'star',
  },
]

const FREE_SHIPPING_THRESHOLD = 1000

function formatPrice(price) {
  return `₹${price.toLocaleString('en-IN')}`
}

function readStorage(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback))
  } catch {
    return fallback
  }
}

function badgeClass(badge) {
  return badge ? `badge-${badge.toLowerCase().replace(/\s+/g, '-')}` : ''
}

function Icon({ name, className = '' }) {
  const iconProps = {
    className,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: '1.7',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': 'true',
  }

  const paths = {
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.2-3.2" />
      </>
    ),
    user: (
      <>
        <path d="M19 21a7 7 0 0 0-14 0" />
        <circle cx="12" cy="8" r="4" />
      </>
    ),
    bag: (
      <>
        <path d="M6 8h12l-1 13H7L6 8Z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </>
    ),
    heart: (
      <path d="M20.8 5.9c-1.5-2-4.5-2.3-6.3-.5L12 7.9 9.5 5.4C7.7 3.6 4.7 3.9 3.2 5.9c-1.4 1.9-1 4.7.7 6.3L12 20l8.1-7.8c1.7-1.6 2.1-4.4.7-6.3Z" />
    ),
    leaf: (
      <>
        <path d="M5 21c8-2 13-8 14-18-9 1-15 6-16 14 0 2 1 4 2 4Z" />
        <path d="M4 20c3-5 7-8 13-11" />
      </>
    ),
    gift: (
      <>
        <path d="M20 12v9H4v-9" />
        <path d="M2 7h20v5H2z" />
        <path d="M12 22V7" />
        <path d="M12 7H8.5A2.5 2.5 0 1 1 12 3.5V7Z" />
        <path d="M12 7h3.5A2.5 2.5 0 1 0 12 3.5V7Z" />
      </>
    ),
    star: (
      <path d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8-5.2-2.7L6.8 19l1-5.8-4.2-4.1 5.8-.8L12 3Z" />
    ),
    bird: (
      <>
        <path d="M4 16c5.8.4 10.3-2.1 13.5-7.5" />
        <path d="M7 15c.9 2.4 3 4 6 4 3.6 0 6.5-2.9 6.5-6.5 0-1.4-.4-2.6-1.1-3.7" />
        <path d="M14 8c-1.4-2.1-3.4-3.3-6-3.5 1.1 1.8 2.1 3.4 3 4.8" />
        <path d="m18 8 3-1.5-2.4 3.2" />
      </>
    ),
    eye: (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ),
    x: (
      <>
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </>
    ),
    minus: <path d="M5 12h14" />,
    plus: (
      <>
        <path d="M12 5v14" />
        <path d="M5 12h14" />
      </>
    ),
    trash: (
      <>
        <path d="M3 6h18" />
        <path d="M8 6V4h8v2" />
        <path d="M19 6l-1 15H6L5 6" />
        <path d="M10 11v6" />
        <path d="M14 11v6" />
      </>
    ),
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m13 6 6 6-6 6" />
      </>
    ),
    shield: (
      <>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="m9 12 2 2 4-5" />
      </>
    ),
    truck: (
      <>
        <path d="M10 17H5V6h11v11h-2" />
        <path d="M16 9h3l3 4v4h-3" />
        <circle cx="7.5" cy="17.5" r="1.8" />
        <circle cx="17.5" cy="17.5" r="1.8" />
      </>
    ),
    refresh: (
      <>
        <path d="M20 11a8 8 0 0 0-14.2-4.8L4 8" />
        <path d="M4 4v4h4" />
        <path d="M4 13a8 8 0 0 0 14.2 4.8L20 16" />
        <path d="M20 20v-4h-4" />
      </>
    ),
    box: (
      <>
        <path d="M21 8 12 3 3 8l9 5 9-5Z" />
        <path d="M3 8v8l9 5 9-5V8" />
        <path d="M12 13v8" />
      </>
    ),
  }

  return <svg {...iconProps}>{paths[name]}</svg>
}

function Botanical({ className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 180 180"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M32 150C70 117 98 77 118 28" />
      <path d="M61 120C45 117 35 106 29 88c18 2 30 12 36 28" />
      <path d="M82 93C68 86 62 73 62 55c18 7 26 20 24 38" />
      <path d="M101 62c-9-12-9-26 0-43 13 13 16 27 5 43" />
      <path d="M102 82c17 0 31-7 43-22-18-4-32 1-43 22" />
      <path d="M78 116c19 5 36 1 51-12-18-8-35-4-51 12" />
    </svg>
  )
}

function HeartDivider({ centered = true }) {
  return (
    <div className={`heart-divider ${centered ? 'mx-auto' : ''}`} aria-hidden="true">
      <span />
      <Icon name="heart" className="h-5 w-5" />
      <span />
    </div>
  )
}

function ButtonLink({ children, href = '#collection' }) {
  return (
    <a className="story-button group" href={href} aria-label={children}>
      <span>{children}</span>
      <Icon name="heart" className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
    </a>
  )
}

function ProductCard({ product, isWishlisted, onWishlist, onQuickView, onAddToCart }) {
  return (
    <article className="product-card" data-product-id={product.id}>
      <div className="card-image-wrap">
        <button
          className="h-full w-full text-left"
          type="button"
          onClick={() => onQuickView(product.id)}
          aria-label={`View details of ${product.name}`}
        >
          <img src={product.image} alt={product.name} loading="lazy" decoding="async" />
        </button>

        {product.badge ? (
          <span className={`card-badge ${badgeClass(product.badge)}`} aria-label={product.badge}>
            {product.badge}
          </span>
        ) : null}

        <div className="card-overlay" role="group" aria-label={`Quick actions for ${product.name}`}>
          <div className="flex flex-col items-end">
            <button
              className={`overlay-btn wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
              type="button"
              data-product-id={product.id}
              aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
              title="Save to Wishlist"
              onClick={(event) => {
                event.stopPropagation()
                onWishlist(product.id)
              }}
            >
              <Icon name="heart" className="icon-heart h-5 w-5" />
            </button>
            <button
              className="overlay-btn quickview-btn"
              type="button"
              aria-label={`Quick view ${product.name}`}
              title="Quick View"
              onClick={(event) => {
                event.stopPropagation()
                onQuickView(product.id)
              }}
            >
              <Icon name="eye" className="h-5 w-5" />
            </button>
          </div>

          <button
            className="overlay-addcart-btn"
            type="button"
            aria-label={`Add ${product.name} to cart`}
            onClick={(event) => {
              event.stopPropagation()
              onAddToCart(product.id, product.variants[0]?.sku, 1)
            }}
          >
            <Icon name="bag" className="h-4 w-4" />
            Add to Cart
          </button>
        </div>
      </div>

      <div className="card-body">
        <p className="card-category">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>
        <p className="card-tagline">{product.tagline}</p>

        <div className="card-rating" aria-label={`Rated ${product.rating} out of 5`}>
          <span className="stars" aria-hidden="true">
            ★★★★★
          </span>
          <span className="rating-num">{product.rating.toFixed(1)}</span>
          <span className="review-count">({product.reviews})</span>
        </div>

        <div className="card-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.originalPrice ? (
            <span className="price-original">{formatPrice(product.originalPrice)}</span>
          ) : null}
        </div>

        <div className="card-actions">
          <button
            className="btn-view-detail"
            type="button"
            onClick={() => onQuickView(product.id)}
            aria-label={`View details of ${product.name}`}
          >
            View Details
          </button>
          <button
            className={`btn-wishlist-icon ${isWishlisted ? 'wishlisted' : ''}`}
            type="button"
            data-product-id={product.id}
            onClick={() => onWishlist(product.id)}
            aria-label={`Toggle wishlist for ${product.name}`}
          >
            <Icon name="heart" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </article>
  )
}

function ProductModal({
  product,
  isWishlisted,
  onClose,
  onWishlist,
  onAddToCart,
}) {
  const drawerRef = useRef(null)
  const [mainImage, setMainImage] = useState(product?.image || '')
  const [selectedVariant, setSelectedVariant] = useState(product?.variants[0] || null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!product) return
    setMainImage(product.image)
    setSelectedVariant(product.variants[0] || null)
    setQuantity(1)
  }, [product])

  useEffect(() => {
    if (!product) return undefined
    const drawer = drawerRef.current
    const focusable = drawer?.querySelectorAll(
      'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])',
    )
    const first = focusable?.[0]
    const last = focusable?.[focusable.length - 1]
    first?.focus()

    function trapFocus(event) {
      if (event.key !== 'Tab' || !first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    drawer?.addEventListener('keydown', trapFocus)
    return () => drawer?.removeEventListener('keydown', trapFocus)
  }, [product])

  if (!product) return null

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-product-name">
      <button className="modal-backdrop" type="button" onClick={onClose} aria-label="Close product detail" />

      <div className="modal-drawer" ref={drawerRef}>
        <button className="modal-close" type="button" onClick={onClose} aria-label="Close product detail">
          <Icon name="x" className="h-5 w-5" />
        </button>

        <div className="modal-content">
          <div className="modal-gallery">
            <div className="gallery-main">
              <img src={mainImage} alt={product.name} loading="eager" decoding="async" />
              <button
                className={`gallery-wishlist-btn ${isWishlisted ? 'wishlisted' : ''}`}
                type="button"
                onClick={() => onWishlist(product.id)}
                aria-label={`Toggle wishlist for ${product.name}`}
              >
                <Icon name="heart" className="h-5 w-5" />
              </button>
            </div>
            <div className="gallery-thumbs" role="list" aria-label="Product images">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  className={`gallery-thumb ${mainImage === image ? 'active' : ''}`}
                  type="button"
                  role="listitem"
                  onClick={() => setMainImage(image)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          <div className="modal-info">
            <div className="modal-meta">
              <span className="modal-cat-label">{product.category}</span>
              {product.badge ? (
                <span className={`card-badge static ${badgeClass(product.badge)}`}>{product.badge}</span>
              ) : null}
            </div>

            <h2 id="modal-product-name" className="modal-name">
              {product.name}
            </h2>

            <div className="modal-rating">
              <span className="stars" aria-hidden="true">
                ★★★★★
              </span>
              <span className="rating-num">{product.rating.toFixed(1)}</span>
              <span className="review-count">({product.reviews} reviews)</span>
              <span className="rating-divider">·</span>
              <a href="#reviews-section" className="read-reviews-link">
                Read reviews
              </a>
            </div>

            <div className="modal-price">
              <span className="modal-price-main">{formatPrice(product.price)}</span>
              {product.originalPrice ? (
                <span className="modal-price-strike">{formatPrice(product.originalPrice)}</span>
              ) : null}
              {discount ? <span className="modal-discount-tag">{discount}% OFF</span> : null}
            </div>

            <hr className="modal-divider" />
            <p className="modal-tagline">{product.tagline}</p>

            <div className="modal-variants">
              <p className="variant-label">
                Select Option: <span className="selected-variant">{selectedVariant?.label}</span>
              </p>
              <div className="variant-btn-group" role="radiogroup" aria-label="Product variants">
                {product.variants.map((variant) => (
                  <button
                    key={variant.sku}
                    className={`variant-pill ${selectedVariant?.sku === variant.sku ? 'selected' : ''}`}
                    type="button"
                    role="radio"
                    aria-checked={selectedVariant?.sku === variant.sku}
                    onClick={() => setSelectedVariant(variant)}
                  >
                    {variant.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-qty">
              <p className="variant-label">Quantity</p>
              <div className="qty-control" role="group" aria-label="Quantity selector">
                <button
                  className="qty-btn"
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  <Icon name="minus" className="h-4 w-4" />
                </button>
                <span className="qty-display" aria-live="polite">
                  {quantity}
                </span>
                <button
                  className="qty-btn"
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  <Icon name="plus" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="modal-cta-group">
              <button
                className="btn-add-to-cart-primary"
                type="button"
                onClick={() => onAddToCart(product.id, selectedVariant?.sku, quantity)}
                aria-label={`Add ${product.name} to cart`}
              >
                <Icon name="bag" className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                className={`btn-wishlist-secondary ${isWishlisted ? 'wishlisted' : ''}`}
                type="button"
                onClick={() => onWishlist(product.id)}
                aria-label={`Save ${product.name} to wishlist`}
              >
                <Icon name="heart" className="h-5 w-5" />
                <span>{isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>

            <div className="modal-trust-row">
              {[
                ['shield', 'Safety Tested'],
                ['truck', 'Free Shipping ₹1000+'],
                ['refresh', 'Easy Returns'],
              ].map(([icon, label]) => (
                <div className="trust-badge" key={label}>
                  <Icon name={icon} className="h-[18px] w-[18px]" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="modal-accordion">
              <details className="accordion-item" open>
                <summary className="accordion-header">
                  Description
                  <Icon name="arrowRight" className="acc-icon h-4 w-4 rotate-90" />
                </summary>
                <div className="accordion-body">
                  <p className="acc-text">{product.description}</p>
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-header">
                  Product Details
                  <Icon name="arrowRight" className="acc-icon h-4 w-4 rotate-90" />
                </summary>
                <div className="accordion-body">
                  <ul className="acc-list">
                    {product.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="accordion-item">
                <summary className="accordion-header">
                  Gifting & Packaging
                  <Icon name="arrowRight" className="acc-icon h-4 w-4 rotate-90" />
                </summary>
                <div className="accordion-body">
                  <p className="acc-text">
                    Every Starling Tales piece is lovingly packaged in a keepsake box with tissue
                    paper and a handwritten gift note, ready to gift straight from the box.
                  </p>
                </div>
              </details>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CartDrawer({ cart, products, onClose, onQty, onRemove, onCheckout }) {
  const panelRef = useRef(null)
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.productId)
    return sum + (product ? product.price * item.quantity : 0)
  }, 0)
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 99
  const remaining = FREE_SHIPPING_THRESHOLD - subtotal

  useEffect(() => {
    const first = panelRef.current?.querySelector('button')
    first?.focus()
  }, [])

  return (
    <div className="cart-overlay" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button className="cart-backdrop" type="button" onClick={onClose} aria-label="Close cart" />
      <aside className="cart-panel" ref={panelRef}>
        <div className="cart-header">
          <h2 className="cart-title">
            <Icon name="bag" className="h-5 w-5" />
            Your Cart
            <span className="cart-count-chip">{cartCount} items</span>
          </h2>
          <button className="cart-close" type="button" onClick={onClose} aria-label="Close cart">
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <Icon name="box" className="cart-empty-svg" />
            <p className="cart-empty-title">Your cart is empty</p>
            <p className="cart-empty-sub">
              Explore our handcrafted collection and find something special.
            </p>
            <button className="btn-browse" type="button" onClick={onClose}>
              Browse Collection
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items" role="list" aria-label="Cart items">
              {cart.map((item) => {
                const product = products.find((entry) => entry.id === item.productId)
                if (!product) return null
                const variant = product.variants.find((entry) => entry.sku === item.variantSku)
                return (
                  <div className="cart-item" role="listitem" key={`${item.productId}-${item.variantSku}`}>
                    <img src={product.image} alt={product.name} className="cart-item-img" loading="lazy" />
                    <div className="cart-item-info">
                      <p className="cart-item-cat">{product.category}</p>
                      <p className="cart-item-name">{product.name}</p>
                      <p className="cart-item-variant">{variant?.label || item.variantSku}</p>
                      <div className="cart-item-bottom">
                        <div className="cart-item-qty-wrap">
                          <button
                            className="cart-item-qty-btn"
                            type="button"
                            onClick={() => onQty(product.id, item.variantSku, -1)}
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            -
                          </button>
                          <span className="cart-item-qty-num" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            className="cart-item-qty-btn"
                            type="button"
                            onClick={() => onQty(product.id, item.variantSku, 1)}
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-item-price">{formatPrice(product.price * item.quantity)}</span>
                        <button
                          className="cart-item-remove"
                          type="button"
                          onClick={() => onRemove(product.id, item.variantSku)}
                          aria-label={`Remove ${product.name} from cart`}
                        >
                          <Icon name="trash" className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="cart-footer">
              <div className="cart-summary">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="summary-row shipping-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <hr className="cart-divider" />
                <div className="summary-row total-row">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + shipping)}</span>
                </div>
                <p className="free-shipping-note">
                  {remaining > 0
                    ? `Add ${formatPrice(remaining)} more for free shipping.`
                    : 'You qualify for free shipping.'}
                </p>
              </div>
              <button className="btn-checkout" type="button" onClick={onCheckout} aria-label="Proceed to checkout">
                Proceed to Checkout
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
              <button className="btn-continue-shopping" type="button" onClick={onClose}>
                Continue Shopping
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

function WishlistDrawer({ wishlist, products, onClose, onMoveToCart, onRemove }) {
  const panelRef = useRef(null)
  const savedProducts = wishlist.map((id) => products.find((product) => product.id === id)).filter(Boolean)

  useEffect(() => {
    panelRef.current?.querySelector('button')?.focus()
  }, [])

  return (
    <div className="cart-overlay" role="dialog" aria-modal="true" aria-label="Wishlist">
      <button className="cart-backdrop" type="button" onClick={onClose} aria-label="Close wishlist" />
      <aside className="cart-panel" ref={panelRef}>
        <div className="cart-header">
          <h2 className="cart-title">
            <Icon name="heart" className="h-5 w-5" />
            Saved Items
            <span className="cart-count-chip">{savedProducts.length} saved</span>
          </h2>
          <button className="cart-close" type="button" onClick={onClose} aria-label="Close wishlist">
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {savedProducts.length === 0 ? (
          <div className="cart-empty">
            <Icon name="heart" className="cart-empty-svg" />
            <p className="cart-empty-title">No saved items yet</p>
            <p className="cart-empty-sub">Tap the heart on any product to save it here.</p>
            <button className="btn-browse" type="button" onClick={onClose}>
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="wishlist-grid" role="list" aria-label="Wishlist items">
            {savedProducts.map((product) => (
              <div className="wishlist-card" role="listitem" key={product.id}>
                <img src={product.image} alt={product.name} className="wishlist-card-img" loading="lazy" />
                <div className="wishlist-card-body">
                  <p className="wishlist-card-name">{product.name}</p>
                  <p className="wishlist-card-price">{formatPrice(product.price)}</p>
                  <div className="wishlist-card-actions">
                    <button
                      className="wl-add-cart"
                      type="button"
                      onClick={() => onMoveToCart(product.id)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="wl-remove"
                      type="button"
                      onClick={() => onRemove(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Icon name="trash" className="h-[13px] w-[13px]" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>
    </div>
  )
}

function Toasts({ toasts }) {
  return (
    <div className="toast-container" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div className="toast" key={toast.id}>
          {toast.message}
        </div>
      ))}
    </div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [cart, setCart] = useState(() => readStorage('st_cart', []))
  const [wishlist, setWishlist] = useState(() => readStorage('st_wishlist', []))
  const [activeProductId, setActiveProductId] = useState(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [toasts, setToasts] = useState([])

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])
  const activeProduct = PRODUCTS.find((product) => product.id === activeProductId) || null

  function showToast(message) {
    const id = crypto.randomUUID()
    setToasts((current) => [...current, { id, message }])
    setTimeout(() => {
      setToasts((current) => current.filter((toast) => toast.id !== id))
    }, 3000)
  }

  function addToCart(productId, variantSku, quantity = 1) {
    const product = PRODUCTS.find((entry) => entry.id === productId)
    const sku = variantSku || product?.variants[0]?.sku
    if (!product || !sku) return

    setCart((current) => {
      const existing = current.find((item) => item.productId === productId && item.variantSku === sku)
      if (existing) {
        return current.map((item) =>
          item.productId === productId && item.variantSku === sku
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      }
      return [...current, { productId, variantSku: sku, quantity, addedAt: Date.now() }]
    })
    showToast(`${product.name} added to cart`)
  }

  function updateCartQty(productId, variantSku, delta) {
    setCart((current) =>
      current.flatMap((item) => {
        if (item.productId !== productId || item.variantSku !== variantSku) return [item]
        const nextQuantity = item.quantity + delta
        return nextQuantity < 1 ? [] : [{ ...item, quantity: nextQuantity }]
      }),
    )
  }

  function removeFromCart(productId, variantSku) {
    const product = PRODUCTS.find((entry) => entry.id === productId)
    setCart((current) =>
      current.filter((item) => !(item.productId === productId && item.variantSku === variantSku)),
    )
    showToast(`${product?.name || 'Item'} removed from cart`)
  }

  function toggleWishlist(productId) {
    const product = PRODUCTS.find((entry) => entry.id === productId)
    setWishlist((current) => {
      const exists = current.includes(productId)
      showToast(`${product?.name || 'Item'} ${exists ? 'removed from' : 'saved to'} wishlist`)
      return exists ? current.filter((id) => id !== productId) : [...current, productId]
    })
  }

  function moveToCart(productId) {
    const product = PRODUCTS.find((entry) => entry.id === productId)
    addToCart(productId, product?.variants[0]?.sku, 1)
    setWishlist((current) => current.filter((id) => id !== productId))
    showToast(`${product?.name || 'Item'} moved to cart`)
  }

  useEffect(() => {
    localStorage.setItem('st_cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('st_wishlist', JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    document.body.style.overflow = activeProduct || cartOpen || wishlistOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [activeProduct, cartOpen, wishlistOpen])

  useEffect(() => {
    function handleKeydown(event) {
      if (event.key !== 'Escape') return
      setActiveProductId(null)
      setCartOpen(false)
      setWishlistOpen(false)
    }

    document.addEventListener('keydown', handleKeydown)
    return () => document.removeEventListener('keydown', handleKeydown)
  }, [])

  useEffect(() => {
    const updateNav = () => setScrolled(window.scrollY > 12)
    updateNav()
    window.addEventListener('scroll', updateNav, { passive: true })
    return () => window.removeEventListener('scroll', updateNav)
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const sections = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.16 },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--cream)] font-body text-[var(--text-body)]">
      <div className="bg-[var(--blue-soft)] px-4 py-2 text-center text-[13px] font-normal tracking-[0.03em] text-white">
        Free Shipping on U.S. orders of $100+ with Complimentary Returns
      </div>

      <header
        className={`sticky top-0 z-50 border-b border-[rgba(240,233,223,0.8)] bg-[var(--cream)] transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_10px_30px_rgba(44,62,53,0.08)]' : ''
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8"
          aria-label="Primary navigation"
        >
          <a href="#home" className="flex cursor-pointer items-center gap-3 text-[var(--text-dark)]">
            <span className="grid h-10 w-10 place-items-center rounded-full border border-[var(--blue-muted)] bg-white/60 text-[var(--blue-soft)]">
              <Icon name="bird" className="h-6 w-6" />
            </span>
            <span className="font-display text-xl italic leading-none sm:text-2xl">Starling Tales</span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replaceAll(' ', '-')}`}
                className="cursor-pointer text-[12px] font-medium uppercase tracking-[0.18em] text-[var(--text-dark)] transition-colors duration-200 hover:text-[var(--blue-soft)]"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 text-[var(--text-dark)] sm:gap-2">
            <button
              className="nav-icon-btn"
              type="button"
              aria-label="Search"
            >
              <Icon name="search" className="h-5 w-5" />
            </button>
            <button
              className="nav-icon-btn"
              type="button"
              aria-label="Open wishlist"
              onClick={() => setWishlistOpen(true)}
            >
              <Icon name="heart" className="h-5 w-5" />
              <span className="wishlist-badge" aria-live="polite" hidden={wishlist.length === 0}>
                {wishlist.length}
              </span>
            </button>
            <button
              className="nav-icon-btn"
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
            >
              <Icon name="bag" className="h-5 w-5" />
              <span className="cart-badge" aria-live="polite" hidden={cartCount === 0}>
                {cartCount}
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main id="home">
        <section className="relative min-h-[calc(100vh-98px)] overflow-hidden bg-[var(--cream)]">
          <Botanical className="absolute -left-10 top-12 h-44 w-44 text-[var(--blue-muted)] opacity-20" />
          <Botanical className="absolute -right-12 bottom-0 h-56 w-56 rotate-180 text-[var(--blue-muted)] opacity-20" />

          <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-16 pt-12 md:grid-cols-[1.05fr_0.95fr] md:pb-20 lg:px-8 lg:pt-18">
            <div className="relative z-10 max-w-xl">
              <Botanical className="hero-stagger h-20 w-20 text-[var(--blue-soft)]" />
              <h1 className="hero-stagger mt-6 whitespace-pre-line font-display text-[42px] font-semibold leading-[0.98] tracking-[0.04em] text-[var(--text-dark)] sm:text-[52px] lg:text-[64px]">
                THE WORLD OF{'\n'}STARLING TALES
              </h1>
              <div className="hero-stagger mt-8">
                <HeartDivider centered={false} />
              </div>
              <p className="hero-stagger mt-7 text-[17px] font-light text-[var(--text-dark)]">
                Welcome to our home and meet our residents.
              </p>
              <p className="hero-stagger mt-5 max-w-[420px] text-[15px] font-light leading-[1.8] text-[var(--text-body)]">
                Lovingly handcrafted, stitched with care, and created with gentle fabrics and
                calming details - each companion is designed to bring comfort, imagination,
                and meaningful moments into everyday childhood.
              </p>
              <div className="hero-stagger mt-8">
                <ButtonLink href="#our-residents">Explore Our World</ButtonLink>
              </div>
            </div>

            <div className="relative z-10 mx-auto w-full max-w-[520px] md:translate-y-8">
              <img
                className="h-auto w-full rounded-lg object-cover shadow-[0_26px_60px_rgba(44,62,53,0.18)]"
                src="1.jpeg"
                alt="Crocheted dog resting on a soft polka-dot blanket"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="reveal relative overflow-hidden border-y border-[var(--cream-dark)] bg-white px-5 py-16 lg:px-8">
          <Botanical className="absolute left-8 top-8 h-52 w-52 text-[var(--blue-muted)] opacity-[0.15]" />
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="relative z-10">
              <h2 className="font-serif-poetic text-[34px] font-normal italic text-[var(--text-dark)]">
                Handcrafted with Care
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] font-light leading-[1.9] text-[var(--text-body)]">
                This little world is lovingly handcrafted, stitched with care and attention to
                every detail. Made with soft fabrics and gentle fillings, created to be
                comforting companions, friends for imagination, and keepsakes to treasure for
                years to come.
              </p>
            </div>

            <div className="quote-heart relative z-10 mx-auto grid min-h-[260px] w-full max-w-[310px] place-items-center bg-[var(--cream)] px-8 py-10 text-center">
              <p className="whitespace-pre-line font-serif-poetic text-[24px] font-normal italic leading-[1.18] text-[var(--text-dark)]">
                from our hands{'\n'}to your heart -{'\n'}made with love,{'\n'}made to last
              </p>
              <Icon name="heart" className="absolute bottom-7 h-5 w-5 text-[var(--blue-soft)]" />
            </div>
          </div>
        </section>

        <section id="our-residents" className="reveal bg-[var(--cream)] px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="section-kicker">Meet Our Residents</h2>
              <HeartDivider />
            </div>

            <div className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCTS.slice(0, 4).map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onWishlist={toggleWishlist}
                  onQuickView={setActiveProductId}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="about-us" className="reveal grid bg-[var(--cream)] md:grid-cols-2">
          <img
            className="h-full min-h-[420px] w-full object-cover"
            src="4.jpeg"
            alt="Pastel unicorn quilt held up to show handcrafted nursery stitching"
            loading="lazy"
            decoding="async"
          />
          <div className="relative overflow-hidden px-5 py-16 md:px-12 lg:px-20 lg:py-24">
            <Botanical className="absolute -right-10 bottom-6 h-48 w-48 text-[var(--blue-muted)] opacity-20" />
            <div className="relative z-10 max-w-xl">
              <p className="section-kicker text-left">Our Philosophy</p>
              <div className="mt-6">
                <HeartDivider centered={false} />
              </div>
              <p className="mt-8 text-[15px] font-light leading-[1.85] text-[var(--text-body)]">
                At Starling Tales, we believe childhood should feel gentle, comforting, and
                beautifully unhurried.
              </p>
              <p className="mt-5 text-[15px] font-light leading-[1.85] text-[var(--text-body)]">
                Every piece is thoughtfully created using soft fabrics, calming colors, and
                understated details - designed to celebrate milestones while becoming
                cherished keepsakes over time.
              </p>
              <div className="mt-9">
                <ButtonLink href="#about-us">Our Story</ButtonLink>
              </div>
            </div>
          </div>
        </section>

        <section id="nursery-collection" className="reveal bg-white px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="section-kicker">Our Collection</h2>
              <p className="mt-3 font-serif-poetic text-[22px] italic text-[var(--brown-warm)]">
                Handcrafted pieces for little ones
              </p>
            </div>

            <div id="collection" className="mt-12 grid gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlist.includes(product.id)}
                  onWishlist={toggleWishlist}
                  onQuickView={setActiveProductId}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="gift-hampers" className="reveal grid gap-8 bg-[var(--cream-dark)] px-5 py-16 md:grid-cols-[0.95fr_1.05fr] md:gap-0 md:px-0 md:py-0">
          <div className="flex items-center px-0 md:px-12 lg:px-20">
            <div className="max-w-xl py-0 md:py-20">
              <p className="section-kicker text-left">Gift Hampers</p>
              <div className="mt-6">
                <HeartDivider centered={false} />
              </div>
              <h2 className="mt-8 whitespace-pre-line font-display text-[36px] leading-[1.08] text-[var(--text-dark)] md:text-[42px]">
                The perfect gift,{'\n'}beautifully wrapped.
              </h2>
              <p className="mt-6 text-[15px] font-light leading-[1.85] text-[var(--text-body)]">
                Every hamper is thoughtfully curated and presented - a complete gifting
                experience for new arrivals, birthdays, and milestone moments.
              </p>
              <div className="mt-9">
                <ButtonLink href="#gift-hampers">Shop Hampers</ButtonLink>
              </div>
            </div>
          </div>
          <div className="p-0 md:p-8">
            <img
              className="h-full min-h-[420px] w-full rounded-lg object-cover"
              src="15.jpeg"
              alt="Pillow with a bunny toy tucked into a handmade gift display"
              loading="lazy"
              decoding="async"
            />
          </div>
        </section>

        <section className="reveal bg-white px-5 py-16 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {pillars.map((pillar) => (
              <article key={pillar.title} className="text-center">
                <Icon name={pillar.icon} className="mx-auto h-8 w-8 text-[var(--blue-soft)]" />
                <h3 className="mt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-[var(--text-dark)]">
                  {pillar.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[210px] text-[12px] font-light leading-[1.65] text-[var(--text-muted)]">
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal relative overflow-hidden bg-[var(--cream)] px-5 py-20 lg:px-8">
          <Botanical className="absolute left-0 top-8 h-48 w-48 text-[var(--blue-muted)] opacity-20" />
          <Botanical className="absolute bottom-8 right-0 h-48 w-48 rotate-180 text-[var(--blue-muted)] opacity-20" />

          <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[260px_1fr]">
            <div className="brand-badge mx-auto">
              <Icon name="bird" className="h-16 w-16 text-[var(--blue-soft)]" />
              <span className="font-display text-2xl italic text-[var(--text-dark)]">Starling</span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-[var(--blue-soft)]">Tales</span>
            </div>

            <div className="text-center md:text-left">
              <p className="text-[17px] font-light leading-[1.85] text-[var(--text-body)]">
                Thank you for choosing{' '}
                <span className="font-serif-poetic text-[24px] italic text-[var(--blue-soft)]">something</span>{' '}
                handmade and supporting slow, thoughtful creation.
              </p>
              <div className="mt-8">
                <HeartDivider centered={false} />
              </div>
              <p className="mt-8 font-serif-poetic text-[42px] italic leading-none text-[var(--text-dark)]">
                Starling Tales
              </p>
              <p className="mt-4 text-[11px] font-light uppercase tracking-[0.28em] text-[var(--brown-warm)]">
                Handmade With Love
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[var(--text-dark)] px-5 py-14 text-[var(--cream)] lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
          <div>
            <h2 className="font-display text-2xl italic">Starling Tales</h2>
            <p className="mt-4 text-[13px] font-light leading-[1.8] text-white/75">
              Handcrafted companions, nursery pieces, and keepsakes made with gentle materials
              and thoughtful details.
            </p>
          </div>

          {[
            ['Shop', ['Our Residents', 'Gift Hampers', 'Nursery Collection', 'Personalisation']],
            ['Help', ['Shipping', 'Returns', 'Care Guide', 'Contact']],
            ['Social', ['Instagram', 'Pinterest', 'Facebook', 'Newsletter']],
          ].map(([title, links]) => (
            <div key={title}>
              <h3 className="text-[12px] font-medium uppercase tracking-[0.24em] text-white">
                {title}
              </h3>
              <ul className="mt-4 space-y-3 text-[13px] font-light text-white/70">
                {links.map((link) => (
                  <li key={link}>
                    <a className="cursor-pointer transition-colors duration-200 hover:text-white" href="#home">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/15 pt-6 text-[12px] font-light text-white/60 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2025 Starling Tales. All rights reserved.</p>
          <div className="flex gap-5">
            <a className="cursor-pointer hover:text-white" href="#home">
              Privacy Policy
            </a>
            <a className="cursor-pointer hover:text-white" href="#home">
              Terms
            </a>
          </div>
        </div>
      </footer>

      {activeProduct ? (
        <ProductModal
          product={activeProduct}
          isWishlisted={wishlist.includes(activeProduct.id)}
          onClose={() => setActiveProductId(null)}
          onWishlist={toggleWishlist}
          onAddToCart={addToCart}
        />
      ) : null}

      {cartOpen ? (
        <CartDrawer
          cart={cart}
          products={PRODUCTS}
          onClose={() => setCartOpen(false)}
          onQty={updateCartQty}
          onRemove={removeFromCart}
          onCheckout={() => showToast('Checkout coming soon - stay tuned.')}
        />
      ) : null}

      {wishlistOpen ? (
        <WishlistDrawer
          wishlist={wishlist}
          products={PRODUCTS}
          onClose={() => setWishlistOpen(false)}
          onMoveToCart={moveToCart}
          onRemove={toggleWishlist}
        />
      ) : null}

      <Toasts toasts={toasts} />
    </div>
  )
}

export default App
