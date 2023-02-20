import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { User } from '../../models/User';
import { checkPassword } from '../../utils/hashPassword';

export async function authUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        'error': 'User not found'
      });
    }

    const check = await checkPassword(password, user!.password);

    if (!check) {
      return res.status(401).json({
        'error': 'Wrong password!'
      });
    }

    const secret = process.env.SECRET_KEY || 'secret';

    const token = jwt.sign({ _id: user!._id?.toString(), email: user!.email }, secret, {
      expiresIn: '1d',
    });

    res.status(200).json({
      token,
      user
    });
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
