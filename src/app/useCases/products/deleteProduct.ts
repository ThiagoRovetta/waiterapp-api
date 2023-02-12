import { Request, Response } from 'express';
import { unlink } from 'fs';
import path from 'node:path';

import { Product } from '../../models/Product';

export async function deleteProduct(req: Request, res: Response) {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).json({
        error: 'Product id is required'
      });
    }

    const product = await Product.findById(productId);

    if (product) {
      await Product.deleteOne({ _id: productId });

      const uploadDirPath = path.resolve(__dirname, '..', '..', '..', '..', 'uploads');

      unlink(`${uploadDirPath}/${product.imagePath}`, (err) => {
        if (err) {
          throw err;
        }
      });
    }


    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
