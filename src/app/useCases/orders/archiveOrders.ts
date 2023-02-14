import { Request, Response } from 'express';

import { Order } from '../../models/Order';

export async function ArchiveOrders(req: Request, res: Response) {
  try {
    await Order.updateMany(
      { createdAt: { $lte: new Date() } },
      { $set: { isArchived: true } }
    );

    res.sendStatus(204);
  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
