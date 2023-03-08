import { Request, Response } from 'express';

import { Category } from '../../models/Category';

export async function updateCategory(req: Request, res: Response) {
  try {
    const { categoryId } = req.params;
    const { icon, name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }

    await Category.findByIdAndUpdate(categoryId, { icon, name });

    const category = await Category.findById(categoryId);

    res.status(200).json(category);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
