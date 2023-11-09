export const registerApiUrl = 'http://localhost:5000/register'

// AUTHENTICATION
export const otpApiUrl = process.env.EXPO_PUBLIC_OTP
export const validationApiUrl = process.env.EXPO_PUBLIC_AUTHENTICATE
export const onlyCountries = process.env.EXPO_PUBLIC_COUNTRIES

// RESTAURANTS
export const availableRestaurants = process.env.EXPO_PUBLIC_RESTAURANTS
export const ApiSuppliers = process.env.EXPO_PUBLIC_SUPPLIERS

// CATEGORIES
export const allCategories = process.env.EXPO_PUBLIC_CATEGORIES
export const selectedCategory = process.env.EXPO_PUBLIC_SELECT_CATEGORY
export const supplierCategorie = process.env.EXPO_PUBLIC_SUPPLIER_CATEGORIE

// PRODUCTS
export const supplierProducts = process.env.EXPO_PUBLIC_SELECT_SUPPLIER_PRODUCTS

// ORDERS RECORD
export const createStorageOrder = process.env.EXPO_PUBLIC_STORAGE_ORDER
export const allStorageOrders = process.env.EXPO_PUBLIC_ALL_STORAGE_ORDERS
export const selectedStorageOrder =
  process.env.EXPO_PUBLIC_SELECTED_STORAGE_ORDER

// FAVORITES
export const addFavorites = process.env.EXPO_PUBLIC_ADD_FAVORITES

// DISPUTES
export const createDisputeOrder = process.env.EXPO_PUBLIC_CREATE_DISPUTE_ORDER
export const closeSelectedOrder = process.env.EXPO_PUBLIC_CLOSE_SELECTED_ORDER
