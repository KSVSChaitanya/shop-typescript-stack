import { Product, Order, CartItem } from '@/types';

const INITIAL_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Wireless Headphones',
    description: 'Premium wireless headphones with noise cancellation and superior sound quality.',
    price: 199.99,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 50,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Smart Watch',
    description: 'Feature-rich smartwatch with fitness tracking and notifications.',
    price: 299.99,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Laptop Backpack',
    description: 'Durable and stylish backpack with dedicated laptop compartment.',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
    category: 'Accessories',
    stock: 100,
    createdAt: new Date().toISOString(),
  },
  {
    id: '4',
    name: 'Bluetooth Speaker',
    description: 'Portable waterproof speaker with amazing bass and 12-hour battery life.',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop',
    category: 'Electronics',
    stock: 75,
    createdAt: new Date().toISOString(),
  },
  {
    id: '5',
    name: 'Running Shoes',
    description: 'Comfortable and lightweight running shoes for optimal performance.',
    price: 129.99,
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
    category: 'Footwear',
    stock: 60,
    createdAt: new Date().toISOString(),
  },
  {
    id: '6',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe and auto-brew feature.',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&h=500&fit=crop',
    category: 'Home',
    stock: 40,
    createdAt: new Date().toISOString(),
  },
];

export const initializeProducts = () => {
  const stored = localStorage.getItem('products');
  if (!stored) {
    localStorage.setItem('products', JSON.stringify(INITIAL_PRODUCTS));
  }
};

export const getProducts = (): Product[] => {
  const stored = localStorage.getItem('products');
  return stored ? JSON.parse(stored) : INITIAL_PRODUCTS;
};

export const getProductById = (id: string): Product | undefined => {
  return getProducts().find((p) => p.id === id);
};

export const addProduct = (product: Omit<Product, 'id' | 'createdAt'>): Product => {
  const products = getProducts();
  const newProduct: Product = {
    ...product,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  products.push(newProduct);
  localStorage.setItem('products', JSON.stringify(products));
  return newProduct;
};

export const updateProduct = (id: string, updates: Partial<Product>): Product | undefined => {
  const products = getProducts();
  const index = products.findIndex((p) => p.id === id);
  
  if (index === -1) return undefined;
  
  products[index] = { ...products[index], ...updates };
  localStorage.setItem('products', JSON.stringify(products));
  return products[index];
};

export const deleteProduct = (id: string): boolean => {
  const products = getProducts();
  const filtered = products.filter((p) => p.id !== id);
  
  if (filtered.length === products.length) return false;
  
  localStorage.setItem('products', JSON.stringify(filtered));
  return true;
};

export const getOrders = (): Order[] => {
  const stored = localStorage.getItem('orders');
  return stored ? JSON.parse(stored) : [];
};

export const createOrder = (userId: string, items: CartItem[], total: number): Order => {
  const orders = getOrders();
  const newOrder: Order = {
    id: Date.now().toString(),
    userId,
    items,
    total,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  orders.push(newOrder);
  localStorage.setItem('orders', JSON.stringify(orders));
  return newOrder;
};

export const getUserOrders = (userId: string): Order[] => {
  return getOrders().filter((order) => order.userId === userId);
};
