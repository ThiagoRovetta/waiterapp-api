import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrders(req: Request, res: Response) {
  try {
    const { archived } = req.params;

    const orders = await Order.find()
      .where('isArchived').equals(archived)
      .sort({ createdAt: 1 })
      .populate('products.product');

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
