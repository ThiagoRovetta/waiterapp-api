import path from 'node:path';
import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { updateCategory } from './app/useCases/categories/updateCategory';
import { deleteCategory } from './app/useCases/categories/deleteCategory';
import { listProducts } from './app/useCases/products/listProducts';
import { createProduct } from './app/useCases/products/createProduct';
import { updateProduct } from './app/useCases/products/updateProduct';
import { deleteProduct } from './app/useCases/products/deleteProduct';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { createUser } from './app/useCases/users/createUser';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, path.resolve(__dirname, '..', 'uploads'));
    },
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`);
    },
  })
});

// List categories
router.get('/categories', listCategories);

// Create category
router.post('/categories', createCategory);

// Update category
router.put('/categories/:categoryId', updateCategory);

// Delete category
router.delete('/categories/:categoryId', deleteCategory);

// List products
router.get('/products', listProducts);

// Create product
router.post('/products', upload.single('image'), createProduct);

// Update product
router.put('/products/:productId', upload.single('image'), updateProduct);

// Delete product
router.delete('/products/:productId', deleteProduct);

// Get products by category
router.get('/categories/:categoryId/products', listProductsByCategory);

// List orders
router.get('/orders', listOrders);

// Create order
router.post('/orders', createOrder);

// Change order status
router.patch('/orders/:orderId', changeOrderStatus);

// Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);

// Create user
router.post('/users', createUser);
