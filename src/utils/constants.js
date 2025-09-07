// src/utils/constants.js
import { 
  faMobileAlt, 
  faLaptop, 
  faTv, 
  faGamepad, 
  faHeadphones,  
  faClock, 
  faCamera, 
  faMusic, 
  faWifi, 
  faHdd, 
  faPlane,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { faGooglePay, faCcVisa, faCcMastercard, faCcPaypal, faCcApplePay } from "@fortawesome/free-brands-svg-icons";

export const categories = [
  { id: 'phones', name: 'Phones', icon: faMobileAlt },
  { id: 'laptops', name: 'Laptops', icon: faLaptop },
  { id: 'tvs', name: 'TVs', icon: faTv },
  { id: 'consoles', name: 'Consoles', icon: faGamepad },
  { id: 'accessories', name: 'Accessories', icon: faHeadphones },
  { id: 'games', name: 'Video Games', icon: faGamepad },
  { id: 'smartwatches', name: 'Smart Watches', icon: faClock },
  { id: 'cameras', name: 'Cameras', icon: faCamera },
  { id: 'audio', name: 'Audio', icon: faMusic },
  { id: 'networking', name: 'Networking', icon: faWifi },
  { id: 'storage', name: 'Storage', icon: faHdd },
  { id: 'gaming', name: 'Gaming', icon: faGamepad },
  { id: 'drones', name: 'Drones', icon: faPlane },
  { id: 'smart-home', name: 'Smart Home', icon: faHome },
  { id: 'wearables', name: 'Wearables', icon: faClock }
];

export const brands = [
  'Apple', 'Samsung', 'Sony', 'LG', 'Dell', 'HP', 'Microsoft', 'Nintendo',
  'Xiaomi', 'Redmi', 'Huawei', 'Google', 'OnePlus', 'Oppo', 'Vivo', 'Realme',
  'Asus', 'Acer', 'Lenovo', 'MSI', 'Razer', 'Logitech', 'Bose', 'JBL',
  'Sennheheimer', 'Canon', 'Nikon', 'GoPro', 'DJI', 'TP-Link', 'Netgear',
  'Western Digital', 'Seagate', 'SanDisk', 'Oraimo', 'Anker', 'Belkin',
  'PlayStation', 'Xbox', 'Nintendo', 'Steam', 'Meta', 'Oculus', 'Fitbit',
  'Garmin', 'Amazfit', 'Honeywell', 'Philips', 'TCL', 'Hisense', 'Sharp'
];


export const featuredProducts = [
  {
    id: '1',
    name: 'iPhone 13 Pro',
    price: 999,
    category: 'phones',
    image: '/images/iphone13.jpg',
    brand: 'Apple',
    description: 'The latest iPhone with amazing camera and performance',
    inStock: true,
    featured: true,
    variants: ['128GB', '256GB', '512GB'],
    rating: 4.8,
    reviews: 1250
  },
  {
    id: '2',
    name: 'Samsung Galaxy S21',
    price: 799,
    category: 'phones',
    image: '/images/galaxy-s21.jpg',
    brand: 'Samsung',
    description: 'Powerful Android phone with excellent display',
    inStock: true,
    featured: true,
    variants: ['128GB', '256GB'],
    rating: 4.6,
    reviews: 890
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    price: 2399,
    category: 'laptops',
    image: '/images/macbook-pro.jpg',
    brand: 'Apple',
    description: 'Professional laptop for creators and developers',
    inStock: true,
    featured: true,
    variants: ['M1 Pro', 'M1 Max'],
    rating: 4.9,
    reviews: 670
  },
  {
    id: '4',
    name: 'PlayStation 5',
    price: 499,
    category: 'consoles',
    image: '/images/ps5.jpg',
    brand: 'Sony',
    description: 'Next-gen gaming console with stunning graphics',
    inStock: false,
    featured: true,
    variants: ['Disc Edition', 'Digital Edition'],
    rating: 4.7,
    reviews: 2300
  },
  {
    id: '5',
    name: 'Sony 65" 4K TV',
    price: 1299,
    category: 'tvs',
    image: '/images/sony-tv.jpg',
    brand: 'Sony',
    description: 'Crystal clear 4K display with smart features',
    inStock: true,
    featured: true,
    rating: 4.5,
    reviews: 450
  },
  {
    id: '6',
    name: 'Wireless Headphones',
    price: 199,
    category: 'accessories',
    image: '/images/headphones.jpg',
    brand: 'Sony',
    description: 'Noise-cancelling wireless headphones',
    inStock: true,
    featured: true,
    variants: ['Black', 'White'],
    rating: 4.4,
    reviews: 1200
  },
  {
    id: '7',
    name: 'Redmi Note 11',
    price: 299,
    category: 'phones',
    image: '/images/redmi-note11.jpg',
    brand: 'Redmi',
    description: 'Budget-friendly smartphone with great features',
    inStock: true,
    featured: true,
    variants: ['64GB', '128GB'],
    rating: 4.3,
    reviews: 980
  },
  {
    id: '8',
    name: 'Oraimo Power Bank',
    price: 49,
    category: 'accessories',
    image: '/images/oraimo-powerbank.jpg',
    brand: 'Oraimo',
    description: 'High-capacity portable charger',
    inStock: true,
    featured: true,
    variants: ['10000mAh', '20000mAh'],
    rating: 4.2,
    reviews: 560
  },
  {
    id: '9',
    name: 'PlayStation 4 Pro',
    price: 299,
    category: 'consoles',
    image: '/images/ps4-pro.jpg',
    brand: 'Sony',
    description: 'Popular gaming console with enhanced performance',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviews: 1800
  },
  {
    id: '10',
    name: 'Xbox Wireless Controller',
    price: 59,
    category: 'gaming',
    image: '/images/xbox-controller.jpg',
    brand: 'Microsoft',
    description: 'Premium gaming controller for Xbox and PC',
    inStock: true,
    featured: true,
    variants: ['Black', 'White', 'Blue'],
    rating: 4.5,
    reviews: 890
  }
];

export const bestBrands = [
  { name: 'Apple', logo: '/brands/apple.png', products: 45, rating: 4.9 },
  { name: 'Samsung', logo: '/brands/samsung.png', products: 38, rating: 4.8 },
  { name: 'Sony', logo: '/brands/sony.png', products: 32, rating: 4.7 },
  { name: 'Microsoft', logo: '/brands/microsoft.png', products: 28, rating: 4.6 },
  { name: 'Nintendo', logo: '/brands/nintendo.png', products: 25, rating: 4.8 },
  { name: 'Oraimo', logo: '/brands/oraimo.png', products: 18, rating: 4.3 },
  { name: 'Redmi', logo: '/brands/redmi.png', products: 22, rating: 4.4 },
  { name: 'Logitech', logo: '/brands/logitech.png', products: 20, rating: 4.5 }
];

export const paymentMethods = [
  { id: 'visa', name: 'Visa', icon: faCcVisa },
  { id: 'mastercard', name: 'Mastercard', icon: faCcMastercard },
  { id: 'paypal', name: 'PayPal', icon: faCcPaypal },
  { id: 'apple-pay', name: 'Apple Pay', icon: faCcApplePay },
  { id: 'google-pay', name: 'Google Pay', icon: faGooglePay }
];

export const orderStatus = {
  PENDING: 'Pending',
  PROCESSING: 'Processing',
  SHIPPED: 'Shipped',
  DELIVERED: 'Delivered',
  CANCELLED: 'Cancelled',
  REFUNDED: 'Refunded'
};