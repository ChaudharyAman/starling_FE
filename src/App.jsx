import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import { GetStartedButton } from '@/components/ui/get-started-button'
import { AnimatedText } from '@/components/ui/animated-underline-text-one'

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
    <div className={`flex w-full max-w-[190px] items-center gap-3 text-blue-soft ${centered ? 'mx-auto' : ''}`} aria-hidden="true">
      <span className="h-0.5 flex-1 border-t border-dashed border-blue-muted" />
      <Icon name="heart" className="h-5 w-5" />
      <span className="h-0.5 flex-1 border-t border-dashed border-blue-muted" />
    </div>
  )
}

function ButtonLink({ children, href = '#collection' }) {
  return (
    <a className="inline-flex min-h-12 items-center justify-center gap-2.5 border border-text-dark px-[22px] py-3.5 text-xs font-medium tracking-[0.17em] uppercase transition-colors duration-200 hover:bg-text-dark hover:text-cream focus-visible:bg-text-dark focus-visible:text-cream group" href={href} aria-label={children}>
      <span>{children}</span>
      <Icon name="heart" className="h-4 w-4 transition-transform duration-200 group-hover:scale-110" />
    </a>
  )
}

function ProductCard({ product, isWishlisted, onWishlist, onQuickView, onAddToCart }) {
  return (
    <article className="group relative overflow-hidden rounded-xl bg-white shadow-[0_2px_12px_rgba(44,62,53,0.07)] cursor-pointer transition-all duration-220 hover:-translate-y-1.25 hover:shadow-[0_8px_28px_rgba(44,62,53,0.13)]" data-product-id={product.id}>
      <div className="relative aspect-[4/5] overflow-hidden">
        <button
          className="h-full w-full text-left"
          type="button"
          onClick={() => onQuickView(product.id)}
          aria-label={`View details of ${product.name}`}
        >
          <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-350 group-hover:scale-104 motion-reduce:group-hover:scale-100" loading="lazy" decoding="async" />
        </button>

        {product.badge ? (
          <span className={`absolute top-3 left-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-widest leading-tight uppercase pointer-events-none text-white ${
            product.badge.toLowerCase().replace(/\s+/g, '-') === 'bestseller' ? 'bg-gold' :
            product.badge.toLowerCase().replace(/\s+/g, '-') === 'new' ? 'bg-blue-soft' :
            product.badge.toLowerCase().replace(/\s+/g, '-') === 'sale' ? 'bg-danger' :
            product.badge.toLowerCase().replace(/\s+/g, '-') === 'gift-set' ? 'bg-brown-warm' :
            'bg-text-dark text-cream'
          }`} aria-label={product.badge}>
            {product.badge}
          </span>
        ) : null}

        <div className="absolute inset-0 z-10 flex flex-col items-end justify-between p-3 bg-cream/0 opacity-0 transition-all duration-220 group-hover:opacity-100 group-hover:bg-cream/12 group-focus-within:opacity-100 group-focus-within:bg-cream/12" role="group" aria-label={`Quick actions for ${product.name}`}>
          <div className="flex flex-col items-end">
            <button
              className={`flex h-11 w-11 items-center justify-center border-none rounded-full mb-2 bg-white text-text-dark shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-150 hover:bg-blue-light hover:scale-108 focus-visible:bg-blue-light focus-visible:scale-108 ${isWishlisted ? 'text-danger fill-danger' : ''}`}
              type="button"
              data-product-id={product.id}
              aria-label={`${isWishlisted ? 'Remove' : 'Add'} ${product.name} ${isWishlisted ? 'from' : 'to'} wishlist`}
              title="Save to Wishlist"
              onClick={(event) => {
                event.stopPropagation()
                onWishlist(product.id)
              }}
            >
              <Icon name="heart" className={`h-5 w-5 ${isWishlisted ? 'fill-danger text-danger' : ''}`} />
            </button>
            <button
              className="flex h-11 w-11 items-center justify-center border-none rounded-full mb-2 bg-white text-text-dark shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-all duration-150 hover:bg-blue-light hover:scale-108 focus-visible:bg-blue-light focus-visible:scale-108"
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
            className="absolute bottom-0 inset-x-0 flex h-11 items-center justify-center gap-2 border-none bg-text-dark text-cream text-xs font-medium tracking-[0.16em] uppercase translate-y-full transition-all duration-220 group-hover:translate-y-0 group-focus-within:translate-y-0 hover:bg-blue-soft focus-visible:translate-y-0 focus-visible:bg-blue-soft"
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

      <div className="p-5 pb-5">
        <p className="mb-1 text-blue-soft text-[10px] font-medium tracking-widest uppercase">{product.category}</p>
        <h3 className="mb-1 text-text-dark font-display text-lg font-semibold">{product.name}</h3>
        <p className="min-h-[54px] mb-2.5 text-text-muted text-xs font-light leading-normal">{product.tagline}</p>

        <div className="flex items-center gap-1.25 mb-2.5" aria-label={`Rated ${product.rating} out of 5`}>
          <span className="text-gold text-xs tracking-normal" aria-hidden="true">
            ★★★★★
          </span>
          <span className="text-text-dark text-xs font-medium">{product.rating.toFixed(1)}</span>
          <span className="text-text-muted text-[11px]">({product.reviews})</span>
        </div>

        <div className="flex items-center gap-2 mb-3.5">
          <span className="text-text-dark text-lg font-medium">{formatPrice(product.price)}</span>
          {product.originalPrice ? (
            <span className="text-text-muted text-sm line-through">{formatPrice(product.originalPrice)}</span>
          ) : null}
        </div>

        <div className="flex items-center gap-2.5">
          <GetStartedButton
            className="flex-1 text-xs font-semibold uppercase tracking-wider h-11"
            onClick={() => onQuickView(product.id)}
            aria-label={`View details of ${product.name}`}
          >
            View Details
          </GetStartedButton>
          <button
            className={`flex h-11 w-11 items-center justify-center border border-cream-dark rounded bg-cream text-text-muted transition-colors duration-200 ${
              isWishlisted ? 'border-danger bg-red-50 text-danger' : 'hover:border-danger hover:bg-red-50 hover:text-danger focus-visible:border-danger focus-visible:bg-red-50 focus-visible:text-danger'
            }`}
            type="button"
            data-product-id={product.id}
            onClick={() => onWishlist(product.id)}
            aria-label={`Toggle wishlist for ${product.name}`}
          >
            <Icon name="heart" className={`h-5 w-5 ${isWishlisted ? 'fill-danger text-danger' : ''}`} />
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
    <div className="fixed inset-0 z-[1000] flex items-stretch justify-end" role="dialog" aria-modal="true" aria-labelledby="modal-product-name">
      <button className="absolute inset-0 bg-text-dark/45 backdrop-blur-[2px] animate-fade-in" type="button" onClick={onClose} aria-label="Close product detail" />

      <div className="relative flex h-full w-full max-w-[900px] flex-col overflow-y-auto bg-cream animate-slide-in-right" ref={drawerRef}>
        <button className="absolute top-4 right-4 z-10 flex h-11 w-11 items-center justify-center border border-cream-dark rounded-full bg-white text-text-dark transition-colors duration-150 hover:bg-cream-dark" type="button" onClick={onClose} aria-label="Close product detail">
          <Icon name="x" className="h-5 w-5" />
        </button>

        <div className="grid min-h-full grid-cols-1 md:grid-cols-2">
          <div className="relative p-10 px-7.5 bg-white">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg mb-3">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" loading="eager" decoding="async" />
              <button
                className={`absolute top-3 right-3 flex h-11 w-11 items-center justify-center border-none rounded-full bg-white text-text-muted shadow-[0_2px_10px_rgba(0,0,0,0.12)] transition-all duration-200 hover:text-danger hover:scale-108 focus-visible:text-danger focus-visible:scale-108 ${isWishlisted ? 'text-danger fill-danger' : ''}`}
                type="button"
                onClick={() => onWishlist(product.id)}
                aria-label={`Toggle wishlist for ${product.name}`}
              >
                <Icon name="heart" className={`h-5 w-5 ${isWishlisted ? 'fill-danger text-danger' : ''}`} />
              </button>
            </div>
            <div className="flex flex-wrap gap-2" role="list" aria-label="Product images">
              {product.gallery.map((image, index) => (
                <button
                  key={image}
                  className={`w-15 h-15 overflow-hidden border-2 rounded bg-cream transition-colors duration-150 ${mainImage === image ? 'border-blue-soft' : 'border-transparent hover:border-blue-soft focus-visible:border-blue-soft'}`}
                  type="button"
                  role="listitem"
                  onClick={() => setMainImage(image)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={image} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-y-auto p-10 pr-9 pl-7.5">
            <div className="flex items-center gap-2.5 mb-2">
              <span className="text-blue-soft text-xs font-medium tracking-widest uppercase">{product.category}</span>
              {product.badge ? (
                <span className={`static rounded-full px-2.5 py-1 text-[10px] font-medium tracking-widest leading-tight uppercase pointer-events-none text-white ${
                  product.badge.toLowerCase().replace(/\s+/g, '-') === 'bestseller' ? 'bg-gold' :
                  product.badge.toLowerCase().replace(/\s+/g, '-') === 'new' ? 'bg-blue-soft' :
                  product.badge.toLowerCase().replace(/\s+/g, '-') === 'sale' ? 'bg-danger' :
                  product.badge.toLowerCase().replace(/\s+/g, '-') === 'gift-set' ? 'bg-brown-warm' :
                  'bg-text-dark text-cream'
                }`}>{product.badge}</span>
              ) : null}
            </div>

            <h2 id="modal-product-name" className="mb-2.5 text-text-dark font-display text-3xl font-semibold leading-tight">
              {product.name}
            </h2>

            <div className="flex flex-wrap items-center gap-1.5 mb-3.5">
              <span className="text-gold text-xs tracking-normal" aria-hidden="true">
                ★★★★★
              </span>
              <span className="text-text-dark text-xs font-medium">{product.rating.toFixed(1)}</span>
              <span className="text-text-muted text-[11px]">({product.reviews} reviews)</span>
              <span className="mx-2 text-text-muted">·</span>
              <a href="#reviews-section" className="text-blue-soft text-xs underline">
                Read reviews
              </a>
            </div>

            <div className="flex flex-wrap items-baseline gap-2.5 mb-4.5">
              <span className="text-text-dark text-2xl font-medium">{formatPrice(product.price)}</span>
              {product.originalPrice ? (
                <span className="text-text-muted text-base line-through">{formatPrice(product.originalPrice)}</span>
              ) : null}
              {discount ? <span className="rounded px-2 py-0.75 bg-amber-50 text-amber-800 text-[11px] font-medium">{discount}% OFF</span> : null}
            </div>

            <hr className="border-none border-t border-cream-dark my-4" />
            <p className="mb-5 text-brown-warm font-serif-poetic text-lg italic leading-relaxed">{product.tagline}</p>

            <div className="mb-5">
              <p className="mb-2.5 text-text-body text-xs font-medium tracking-widest uppercase">
                Select Option: <span className="text-blue-soft">{selectedVariant?.label}</span>
              </p>
              <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Product variants">
                {product.variants.map((variant) => (
                  <button
                    key={variant.sku}
                    className={`min-h-[44px] border rounded-3xl px-4 py-2 text-xs transition-colors duration-150 ${selectedVariant?.sku === variant.sku ? 'border-text-dark bg-text-dark text-white' : 'border-cream-dark bg-white text-text-body hover:border-blue-soft hover:text-blue-soft focus-visible:border-blue-soft focus-visible:text-blue-soft'}`}
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

            <div className="mb-5">
              <p className="mb-2.5 text-text-body text-xs font-medium tracking-widest uppercase">Quantity</p>
              <div className="inline-flex items-center overflow-hidden border border-cream-dark rounded-md" role="group" aria-label="Quantity selector">
                <button
                  className="flex h-11 w-11 items-center justify-center border-none bg-white text-text-dark transition-colors duration-150 hover:bg-cream-dark focus-visible:bg-cream-dark"
                  type="button"
                  onClick={() => setQuantity((value) => Math.max(1, value - 1))}
                  aria-label="Decrease quantity"
                >
                  <Icon name="minus" className="h-4 w-4" />
                </button>
                <span className="w-12 border-x border-cream-dark bg-white text-center text-base font-medium leading-[44px] text-text-dark" aria-live="polite">
                  {quantity}
                </span>
                <button
                  className="flex h-11 w-11 items-center justify-center border-none bg-white text-text-dark transition-colors duration-150 hover:bg-cream-dark focus-visible:bg-cream-dark"
                  type="button"
                  onClick={() => setQuantity((value) => value + 1)}
                  aria-label="Increase quantity"
                >
                  <Icon name="plus" className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-2.5 mb-5">
              <button
                className="flex-1 flex min-h-[48px] items-center justify-center gap-2 border-none rounded-md px-5 py-3.5 bg-text-dark text-cream text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:bg-blue-soft focus-visible:bg-blue-soft"
                type="button"
                onClick={() => onAddToCart(product.id, selectedVariant?.sku, quantity)}
                aria-label={`Add ${product.name} to cart`}
              >
                <Icon name="bag" className="h-5 w-5" />
                Add to Cart
              </button>
              <button
                className={`flex min-h-[48px] items-center gap-1.5 border border-cream-dark rounded-md px-4.5 py-3.5 bg-white text-text-body text-xs font-medium whitespace-nowrap transition-colors duration-200 ${isWishlisted ? 'border-danger text-danger' : 'hover:border-danger hover:text-danger focus-visible:border-danger focus-visible:text-danger'}`}
                type="button"
                onClick={() => onWishlist(product.id)}
                aria-label={`Save ${product.name} to wishlist`}
              >
                <Icon name="heart" className={`h-5 w-5 ${isWishlisted ? 'fill-danger text-danger' : ''}`} />
                <span>{isWishlisted ? 'Saved to Wishlist' : 'Save to Wishlist'}</span>
              </button>
            </div>

            <div className="flex gap-3 mb-6 border border-cream-dark rounded-lg p-3.5 bg-white">
              {[
                ['shield', 'Safety Tested'],
                ['truck', 'Free Shipping ₹1000+'],
                ['refresh', 'Easy Returns'],
              ].map(([icon, label]) => (
                <div className="flex flex-1 flex-col items-center gap-1 text-text-muted text-[10px] tracking-wide text-center" key={label}>
                  <Icon name={icon} className="h-[18px] w-[18px] text-blue-soft" />
                  <span>{label}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-cream-dark">
              <details className="border-b border-cream-dark" open>
                <summary className="flex items-center justify-between py-4 text-text-dark cursor-pointer text-[13px] font-medium tracking-wide list-none select-none">
                  Description
                  <Icon name="arrowRight" className="transition-transform duration-200 group-open:rotate-270 h-4 w-4 rotate-90" />
                </summary>
                <div className="pb-4">
                  <p className="text-text-body text-[13px] font-light leading-relaxed">{product.description}</p>
                </div>
              </details>

              <details className="border-b border-cream-dark">
                <summary className="flex items-center justify-between py-4 text-text-dark cursor-pointer text-[13px] font-medium tracking-wide list-none select-none">
                  Product Details
                  <Icon name="arrowRight" className="transition-transform duration-200 group-open:rotate-270 h-4 w-4 rotate-90" />
                </summary>
                <div className="pb-4">
                  <ul className="p-0 list-none">
                    {product.details.map((detail) => (
                      <li className="flex items-start gap-2 py-1 text-text-body text-[13px] font-light before:content-['-'] before:text-blue-soft" key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </details>

              <details className="border-b border-cream-dark">
                <summary className="flex items-center justify-between py-4 text-text-dark cursor-pointer text-[13px] font-medium tracking-wide list-none select-none">
                  Gifting & Packaging
                  <Icon name="arrowRight" className="transition-transform duration-200 group-open:rotate-270 h-4 w-4 rotate-90" />
                </summary>
                <div className="pb-4">
                  <p className="text-text-body text-[13px] font-light leading-relaxed">
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
    <div className="fixed inset-0 z-[1100] flex items-stretch justify-end" role="dialog" aria-modal="true" aria-label="Shopping cart">
      <button className="absolute inset-0 bg-text-dark/45 backdrop-blur-[2px] animate-fade-in" type="button" onClick={onClose} aria-label="Close cart" />
      <aside className="relative flex h-full w-full max-w-[420px] flex-col bg-cream animate-slide-in-right" ref={panelRef}>
        <div className="flex items-center justify-between border-b border-cream-dark p-5 px-6 bg-white">
          <h2 className="flex items-center gap-2.5 text-text-dark font-display text-xl font-semibold">
            <Icon name="bag" className="h-5 w-5" />
            Your Cart
            <span className="rounded-full px-2.5 py-0.75 bg-blue-light text-text-dark font-body text-[11px] font-medium tracking-wide">{cartCount} items</span>
          </h2>
          <button className="flex h-11 w-11 items-center justify-center border border-cream-dark rounded-full bg-cream text-text-dark" type="button" onClick={onClose} aria-label="Close cart">
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-10 px-6 text-center">
            <Icon name="box" className="w-13 h-13 mb-4 text-blue-soft" />
            <p className="mb-2 text-text-dark font-display text-xl">Your cart is empty</p>
            <p className="mb-5 text-text-muted text-[13px] leading-relaxed">
              Explore our handcrafted collection and find something special.
            </p>
            <button className="min-h-[44px] border border-text-dark rounded px-7 py-3 bg-transparent text-text-dark text-xs font-medium tracking-widest uppercase transition-colors duration-200 hover:bg-text-dark hover:text-cream focus-visible:bg-text-dark focus-visible:text-cream" type="button" onClick={onClose}>
              Browse Collection
            </button>
          </div>
        ) : (
          <>
            <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4" role="list" aria-label="Cart items">
              {cart.map((item) => {
                const product = products.find((entry) => entry.id === item.productId)
                if (!product) return null
                const variant = product.variants.find((entry) => entry.sku === item.variantSku)
                return (
                  <div className="flex gap-3.5 border border-cream-dark rounded-lg p-3.5 bg-white animate-fade-in" role="listitem" key={`${item.productId}-${item.variantSku}`}>
                    <img src={product.image} alt={product.name} className="w-18 h-22 shrink-0 rounded-md object-cover" loading="lazy" />
                    <div className="min-w-0 flex-1">
                      <p className="mb-0.5 text-blue-soft text-[10px] font-medium tracking-widest uppercase">{product.category}</p>
                      <p className="overflow-hidden mb-0.5 text-text-dark font-display text-sm font-semibold text-ellipsis whitespace-nowrap">{product.name}</p>
                      <p className="mb-2.5 text-text-muted text-[11px]">{variant?.label || item.variantSku}</p>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center overflow-hidden border border-cream-dark rounded">
                          <button
                            className="w-8 h-8 border-none bg-cream text-text-dark text-sm transition-colors duration-150 hover:bg-blue-light focus-visible:bg-blue-light"
                            type="button"
                            onClick={() => onQty(product.id, item.variantSku, -1)}
                            aria-label={`Decrease ${product.name} quantity`}
                          >
                            -
                          </button>
                          <span className="w-8 border-x border-cream-dark bg-white text-center text-xs font-medium leading-[32px] text-text-dark" aria-live="polite">
                            {item.quantity}
                          </span>
                          <button
                            className="w-8 h-8 border-none bg-cream text-text-dark text-sm transition-colors duration-150 hover:bg-blue-light focus-visible:bg-blue-light"
                            type="button"
                            onClick={() => onQty(product.id, item.variantSku, 1)}
                            aria-label={`Increase ${product.name} quantity`}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-text-dark text-sm font-medium whitespace-nowrap">{formatPrice(product.price * item.quantity)}</span>
                        <button
                          className="flex h-8 w-8 items-center justify-center border-none rounded bg-transparent text-text-muted transition-all duration-150 hover:bg-red-50 hover:text-danger focus-visible:bg-red-50 focus-visible:text-danger"
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

            <div className="border-t border-cream-dark p-5 px-6 bg-white">
              <div className="mb-4">
                <div className="flex justify-between mb-2 text-text-body text-xs">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between mb-2 text-text-body text-xs shipping-row">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
                </div>
                <hr className="border-none border-t border-cream-dark my-2.5" />
                <div className="flex justify-between mb-2 text-text-dark text-base font-medium total-row">
                  <span>Total</span>
                  <span>{formatPrice(subtotal + shipping)}</span>
                </div>
                <p className="mt-1 text-success text-[11px] text-center">
                  {remaining > 0
                    ? `Add ${formatPrice(remaining)} more for free shipping.`
                    : 'You qualify for free shipping.'}
                </p>
              </div>
              <button className="flex w-full min-h-[48px] items-center justify-center gap-2 border-none rounded-md p-3.75 bg-text-dark text-cream text-sm font-medium tracking-widest uppercase transition-colors duration-200 hover:bg-blue-soft focus-visible:bg-blue-soft" type="button" onClick={onCheckout} aria-label="Proceed to checkout">
                Proceed to Checkout
                <Icon name="arrowRight" className="h-4 w-4" />
              </button>
              <button className="w-full min-h-[44px] border-none bg-transparent text-text-muted text-xs underline" type="button" onClick={onClose}>
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
    <div className="fixed inset-0 z-[1100] flex items-stretch justify-end" role="dialog" aria-modal="true" aria-label="Wishlist">
      <button className="absolute inset-0 bg-text-dark/45 backdrop-blur-[2px] animate-fade-in" type="button" onClick={onClose} aria-label="Close wishlist" />
      <aside className="relative flex h-full w-full max-w-[420px] flex-col bg-cream animate-slide-in-right" ref={panelRef}>
        <div className="flex items-center justify-between border-b border-cream-dark p-5 px-6 bg-white">
          <h2 className="flex items-center gap-2.5 text-text-dark font-display text-xl font-semibold">
            <Icon name="heart" className="h-5 w-5" />
            Saved Items
            <span className="rounded-full px-2.5 py-0.75 bg-blue-light text-text-dark font-body text-[11px] font-medium tracking-wide">{savedProducts.length} saved</span>
          </h2>
          <button className="flex h-11 w-11 items-center justify-center border border-cream-dark rounded-full bg-cream text-text-dark" type="button" onClick={onClose} aria-label="Close wishlist">
            <Icon name="x" className="h-5 w-5" />
          </button>
        </div>

        {savedProducts.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center p-10 px-6 text-center">
            <Icon name="heart" className="w-13 h-13 mb-4 text-blue-soft" />
            <p className="mb-2 text-text-dark font-display text-xl">No saved items yet</p>
            <p className="mb-5 text-text-muted text-[13px] leading-relaxed">Tap the heart on any product to save it here.</p>
            <button className="min-h-[44px] border border-text-dark rounded px-7 py-3 bg-transparent text-text-dark text-xs font-medium tracking-widest uppercase transition-colors duration-200 hover:bg-text-dark hover:text-cream focus-visible:bg-text-dark focus-visible:text-cream" type="button" onClick={onClose}>
              Explore Collection
            </button>
          </div>
        ) : (
          <div className="flex flex-1 flex-col gap-3.5 overflow-y-auto p-4" role="list" aria-label="Wishlist items">
            {savedProducts.map((product) => (
              <div className="flex gap-3.5 border border-cream-dark rounded-lg p-3.5 bg-white animate-fade-in" role="listitem" key={product.id}>
                <img src={product.image} alt={product.name} className="w-18 h-22 shrink-0 rounded-md object-cover" loading="lazy" />
                <div className="min-w-0 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="mb-0.5 text-blue-soft text-[10px] font-medium tracking-widest uppercase">{product.category}</p>
                    <p className="overflow-hidden mb-0.5 text-text-dark font-display text-sm font-semibold text-ellipsis whitespace-nowrap">{product.name}</p>
                    <p className="text-text-dark text-xs font-medium">{formatPrice(product.price)}</p>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      className="min-h-[38px] h-[38px] flex-1 border-none rounded bg-text-dark text-cream text-[10px] font-medium tracking-wide uppercase transition-colors duration-150 hover:bg-blue-soft focus-visible:bg-blue-soft"
                      type="button"
                      onClick={() => onMoveToCart(product.id)}
                      aria-label={`Add ${product.name} to cart`}
                    >
                      Add to Cart
                    </button>
                    <button
                      className="flex h-[38px] min-h-[38px] w-9 items-center justify-center border border-cream-dark rounded bg-white text-text-muted transition-colors duration-150 hover:border-danger hover:text-danger focus-visible:border-danger focus-visible:text-danger"
                      type="button"
                      onClick={() => onRemove(product.id)}
                      aria-label={`Remove ${product.name} from wishlist`}
                    >
                      <Icon name="trash" className="h-[14px] w-[14px]" />
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
    <div className="fixed bottom-7 left-1/2 z-[9999] flex flex-col gap-2 pointer-events-none -translate-x-1/2" aria-live="polite" aria-atomic="true">
      {toasts.map((toast) => (
        <div className="flex items-center gap-2 rounded-[100px] px-5.5 py-3 bg-text-dark text-cream shadow-[0_4px_20px_rgba(0,0,0,0.2)] text-xs font-normal pointer-events-auto whitespace-nowrap animate-toast-in" key={toast.id}>
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

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, [cart]))
  const activeProduct = PRODUCTS.find((product) => product.id === activeProductId) || null

  const parsedCartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart])

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
    <div className="min-h-screen overflow-x-hidden bg-cream font-body text-text-body">
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b border-[rgba(240,233,223,0.8)] bg-cream transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_10px_30px_rgba(44,62,53,0.08)]' : ''
        }`}
      >
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-2 lg:px-6"
          aria-label="Primary navigation"
        >
          <a href="#home" className="flex cursor-pointer items-center gap-3 text-text-dark">
            <img src="/logo.png" alt="Starling Tales logo" className="w-13 h-13 object-contain" />
            <span className="font-display text-xl italic leading-none sm:text-2xl">Starling Tales</span>
          </a>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replaceAll(' ', '-')}`}
                className="cursor-pointer text-[12px] font-medium uppercase tracking-[0.18em] text-text-dark transition-colors duration-200 hover:text-blue-soft"
              >
                {link}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 text-text-dark sm:gap-2">
            <button
              className="relative grid h-11 w-11 place-items-center rounded-full text-text-dark transition-colors duration-200 hover:bg-cream-dark hover:text-blue-soft focus-visible:bg-cream-dark focus-visible:text-blue-soft"
              type="button"
              aria-label="Search"
            >
              <Icon name="search" className="h-5 w-5" />
            </button>
            <button
              className="relative grid h-11 w-11 place-items-center rounded-full text-text-dark transition-colors duration-200 hover:bg-cream-dark hover:text-blue-soft focus-visible:bg-cream-dark focus-visible:text-blue-soft"
              type="button"
              aria-label="Open wishlist"
              onClick={() => setWishlistOpen(true)}
            >
              <Icon name="heart" className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex min-w-[18px] h-[18px] items-center justify-center rounded-full p-0.5 bg-danger text-white text-[10px] font-semibold pointer-events-none" aria-live="polite" hidden={wishlist.length === 0}>
                {wishlist.length}
              </span>
            </button>
            <button
              className="relative grid h-11 w-11 place-items-center rounded-full text-text-dark transition-colors duration-200 hover:bg-cream-dark hover:text-blue-soft focus-visible:bg-cream-dark focus-visible:text-blue-soft"
              type="button"
              aria-label="Open cart"
              onClick={() => setCartOpen(true)}
            >
              <Icon name="bag" className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 flex min-w-[18px] h-[18px] items-center justify-center rounded-full p-0.5 bg-blue-soft text-white text-[10px] font-semibold pointer-events-none" aria-live="polite" hidden={parsedCartCount === 0}>
                {parsedCartCount}
              </span>
            </button>
          </div>
        </nav>
      </header>

      <main id="home" className="pt-[68px]">
        <section className="relative min-h-[calc(100vh-120px)] max-h-[640px] overflow-hidden bg-cream">
          <Botanical className="absolute -left-10 top-12 h-44 w-44 text-blue-muted opacity-20" />
          <Botanical className="absolute -right-12 bottom-0 h-56 w-56 rotate-180 text-blue-muted opacity-20" />

          <div className="mx-auto grid max-w-7xl items-start gap-12 px-5 pb-16 pt-4 md:grid-cols-[1.05fr_0.95fr] md:pb-20 lg:px-8 md:pt-12 lg:pt-16">
            <div className="relative z-10 max-w-xl">
              <Botanical className="opacity-0 translate-y-5 animate-hero-fade [animation-fill-mode:forwards] h-12 w-12 text-blue-soft" style={{ animationDelay: '0ms' }} />
              <AnimatedText
                text={"THE WORLD OF\nSTARLING TALES"}
                className="items-start"
                textDelay={0.15}
                initialY={20}
                textClassName="text-left font-display text-[42px] font-semibold leading-[0.98] tracking-[0.04em] text-text-dark sm:text-[52px] lg:text-[64px] whitespace-pre-line mt-4"
                underlineClassName="text-blue-soft -bottom-6 w-[280px] sm:w-[350px] lg:w-[420px]"
                underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
                underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
                underlineDuration={1.5}
              />
              <div className="opacity-0 translate-y-5 animate-hero-fade [animation-fill-mode:forwards] mt-10" style={{ animationDelay: '300ms' }}>
                <HeartDivider centered={false} />
              </div>
              <p className="opacity-0 translate-y-5 animate-hero-fade [animation-fill-mode:forwards] mt-7 text-[17px] font-light text-text-dark" style={{ animationDelay: '450ms' }}>
                Welcome to our home and meet our residents.
              </p>
              <p className="opacity-0 translate-y-5 animate-hero-fade [animation-fill-mode:forwards] mt-5 max-w-[420px] text-[15px] font-light leading-[1.8] text-text-body" style={{ animationDelay: '600ms' }}>
                Lovingly handcrafted, stitched with care, and created with gentle fabrics and
                calming details - each companion is designed to bring comfort, imagination,
                and meaningful moments into everyday childhood.
              </p>
              <div className="opacity-0 translate-y-5 animate-hero-fade [animation-fill-mode:forwards] mt-8" style={{ animationDelay: '750ms' }}>
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

        <section className="reveal relative overflow-hidden border-y border-cream-dark bg-white px-5 py-16 lg:px-8">
          <Botanical className="absolute left-8 top-8 h-52 w-52 text-blue-muted opacity-[0.15]" />
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.2fr_0.8fr]">
            <div className="relative z-10">
              <h2 className="font-serif-poetic text-[34px] font-normal italic text-text-dark">
                Handcrafted with Care
              </h2>
              <p className="mt-5 max-w-2xl text-[15px] font-light leading-[1.9] text-text-body">
                This little world is lovingly handcrafted, stitched with care and attention to
                every detail. Made with soft fabrics and gentle fillings, created to be
                comforting companions, friends for imagination, and keepsakes to treasure for
                years to come.
              </p>
            </div>

            <div className="border border-dashed border-blue-soft rounded-[58%_58%_48%_48%_/_50%_50%_64%_64%] shadow-[0_18px_45px_rgba(44,62,53,0.08)] relative z-10 mx-auto grid min-h-[260px] w-full max-w-[310px] place-items-center bg-cream px-8 py-10 text-center">
              <p className="whitespace-pre-line font-serif-poetic text-[24px] font-normal italic leading-[1.18] text-text-dark">
                from our hands{'\n'}to your heart -{'\n'}made with love,{'\n'}made to last
              </p>
              <Icon name="heart" className="absolute bottom-7 h-5 w-5 text-blue-soft" />
            </div>
          </div>
        </section>

        <section id="our-residents" className="reveal bg-cream px-5 py-20 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <h2 className="text-sm font-medium tracking-[0.26em] leading-normal uppercase text-text-dark max-md:text-xs max-md:tracking-[0.22em]">Meet Our Residents</h2>
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

        <section id="about-us" className="reveal grid bg-cream md:grid-cols-2">
          <img
            className="h-full min-h-[420px] w-full object-cover"
            src="4.jpeg"
            alt="Pastel unicorn quilt held up to show handcrafted nursery stitching"
            loading="lazy"
            decoding="async"
          />
          <div className="relative overflow-hidden px-5 py-16 md:px-12 lg:px-20 lg:py-24">
            <Botanical className="absolute -right-10 bottom-6 h-48 w-48 text-blue-muted opacity-20" />
            <div className="relative z-10 max-w-xl">
              <p className="text-sm font-medium tracking-[0.26em] leading-normal uppercase text-text-dark max-md:text-xs max-md:tracking-[0.22em] text-left">Our Philosophy</p>
              <div className="mt-6">
                <HeartDivider centered={false} />
              </div>
              <p className="mt-8 text-[15px] font-light leading-[1.85] text-text-body">
                At Starling Tales, we believe childhood should feel gentle, comforting, and
                beautifully unhurried.
              </p>
              <p className="mt-5 text-[15px] font-light leading-[1.85] text-text-body">
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
              <h2 className="text-sm font-medium tracking-[0.26em] leading-normal uppercase text-text-dark max-md:text-xs max-md:tracking-[0.22em]">Our Collection</h2>
              <p className="mt-3 font-serif-poetic text-[22px] italic text-brown-warm">
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

        <section id="gift-hampers" className="reveal grid gap-8 bg-cream-dark px-5 py-16 md:grid-cols-[0.95fr_1.05fr] md:gap-0 md:px-0 md:py-0">
          <div className="flex items-center px-0 md:px-12 lg:px-20">
            <div className="max-w-xl py-0 md:py-20">
              <p className="text-sm font-medium tracking-[0.26em] leading-normal uppercase text-text-dark max-md:text-xs max-md:tracking-[0.22em] text-left">Gift Hampers</p>
              <div className="mt-6">
                <HeartDivider centered={false} />
              </div>
              <h2 className="mt-8 whitespace-pre-line font-display text-[36px] leading-[1.08] text-text-dark md:text-[42px]">
                The perfect gift,{'\n'}beautifully wrapped.
              </h2>
              <p className="mt-6 text-[15px] font-light leading-[1.85] text-text-body">
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
                <Icon name={pillar.icon} className="mx-auto h-8 w-8 text-blue-soft" />
                <h3 className="mt-5 text-[11px] font-medium uppercase tracking-[0.24em] text-text-dark">
                  {pillar.title}
                </h3>
                <p className="mx-auto mt-3 max-w-[210px] text-[12px] font-light leading-[1.65] text-text-muted">
                  {pillar.text}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="reveal relative overflow-hidden bg-cream px-5 py-20 lg:px-8">
          <Botanical className="absolute left-0 top-8 h-48 w-48 text-blue-muted opacity-20" />
          <Botanical className="absolute bottom-8 right-0 h-48 w-48 rotate-180 text-blue-muted opacity-20" />

          <div className="relative z-10 mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[260px_1fr]">
            <div className="grid h-40 w-40 place-items-center border border-blue-muted rounded-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.72),rgba(200,221,232,0.18))] bg-cream shadow-[0_18px_40px_rgba(44,62,53,0.08)] mx-auto" aria-label="Starling Tales logo">
              <img src="/logo.png" alt="Starling Tales logo" className="max-w-[80%] max-h-[80%] object-contain" />
            </div>

            <div className="text-center md:text-left">
              <p className="text-[17px] font-light leading-[1.85] text-text-body">
                Thank you for choosing{' '}
                <span className="font-serif-poetic text-[24px] italic text-blue-soft">something</span>{' '}
                handmade and supporting slow, thoughtful creation.
              </p>
              <div className="mt-8">
                <HeartDivider centered={false} />
              </div>
              <p className="mt-8 font-serif-poetic text-[42px] italic leading-none text-text-dark">
                Starling Tales
              </p>
              <p className="mt-4 text-[11px] font-light uppercase tracking-[0.28em] text-brown-warm">
                Handmade With Love
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-text-dark px-5 py-14 text-cream lg:px-8">
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
          <p>&copy; 2026 Starling Tales. All rights reserved.</p>
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
