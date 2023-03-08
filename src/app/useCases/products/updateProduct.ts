import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function updateProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;
    const imagePath = req.file?.filename;
    const {
      name,
      description,
      price,
      category,
      ingredients
    } = req.body;

    await Product.findByIdAndUpdate(productId, {
      name,
      description,
      imagePath,
      price: Number(price),
      category,
      ingredients: ingredients ? JSON.parse(ingredients) : [],
    });

    const product = await Product.findById(productId)
      .populate('category');

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
