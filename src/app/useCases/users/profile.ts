import { Request, Response } from 'express';

import { User } from '../../models/User';

export async function profile(req: Request, res: Response) {
  try {
    const { user } = req;

    if (!user) {
      return res.sendStatus(401);
    }

    const profile = await User.findById(user._id);

    res.json(profile);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
