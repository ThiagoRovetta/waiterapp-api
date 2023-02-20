import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function listOrders(req: Request, res: Response) {
  try {
    const { archived } = req.query;

    let isArchived = false;

    if (archived === 'true') {
      isArchived = true;
    }

    const orders = await Order.find()
      .where('isArchived').equals(isArchived)
      .sort({ createdAt: 1 })
      .populate('products.product');

    res.json(orders);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
