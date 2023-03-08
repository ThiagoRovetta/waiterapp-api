import { Request, Response } from 'express';

import { User } from '../../models/User';
import { hashPassword } from '../../utils/hashPassword';

export async function updateUser(req: Request, res: Response) {
  try {
    const { userId } = req.params;
    const {
      name,
      email,
      password,
      role
    } = req.body;

    const emailAlreadyExists = await User.findOne({ email });

    if (emailAlreadyExists && emailAlreadyExists.id !== userId) {
      return res.status(400).json({
        error: 'Email already registered!'
      });
    }

    if (role && !['WAITER', 'ADMIN'].includes(role)) {
      return res.status(400).json({
        error: 'Role should be one of these: WAITER, ADMIN'
      });
    }

    const updateObject = {
      name,
      email,
      password,
      role,
    };

    if (password) {
      const hashedPassword = await hashPassword(password);
      updateObject['password'] = hashedPassword;
    }

    await User.findByIdAndUpdate(userId, updateObject);

    const user = await User.findById(userId);

    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
