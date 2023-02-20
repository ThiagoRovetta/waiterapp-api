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
import { listUsers } from './app/useCases/users/listUsers';
import { updateUser } from './app/useCases/users/updateUser';
import { deleteUser } from './app/useCases/users/deleteUser';
import { ArchiveOrders } from './app/useCases/orders/archiveOrders';
import { authUser } from './app/useCases/users/authUser';
import { profile } from './app/useCases/users/profile';
import { ensureAuthenticated } from './app/middlewares/ensureAuthenticated';

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
router.get('/categories', ensureAuthenticated, listCategories);

// Create category
router.post('/categories', ensureAuthenticated, createCategory);

// Update category
router.put('/categories/:categoryId', ensureAuthenticated, updateCategory);

// Delete category
router.delete('/categories/:categoryId', ensureAuthenticated, deleteCategory);

// List products
router.get('/products', ensureAuthenticated, listProducts);

// Create product
router.post('/products', ensureAuthenticated, upload.single('image'), createProduct);

// Update product
router.put('/products/:productId', ensureAuthenticated,  upload.single('image'), updateProduct);

// Delete product
router.delete('/products/:productId', ensureAuthenticated, deleteProduct);

// Get products by category
router.get('/categories/:categoryId/products', ensureAuthenticated, listProductsByCategory);

// List orders
router.get('/orders', ensureAuthenticated, listOrders);

// Create order
router.post('/orders', ensureAuthenticated, createOrder);

// Change order status
router.patch('/orders/:orderId', ensureAuthenticated, changeOrderStatus);

// Archive order
router.put('/orders/archive', ensureAuthenticated, ArchiveOrders);

// Delete/cancel order
router.delete('/orders/:orderId', ensureAuthenticated, cancelOrder);

// Create user
router.post('/users', ensureAuthenticated, createUser);

// Create user
router.get('/users', ensureAuthenticated, listUsers);

// Update user
router.put('/users/:userId', ensureAuthenticated, updateUser);

// Delete user
router.delete('/users/:userId', ensureAuthenticated, deleteUser);

// Auth user
router.post('/auth', authUser);

// Profile
router.get('/profile', ensureAuthenticated, profile);
