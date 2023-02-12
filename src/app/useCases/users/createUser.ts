import { Request, Response } from 'express';

import { User } from '../../models/User';
import { hashPassword } from '../../utils/hashPassword';

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password, role } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }

    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    const emailAlreadyExists = await User.findOne({
      email: email,
    });

    if (emailAlreadyExists) {
      return res.status(400).json({
        error: 'Email already registered!'
      });
    }

    const hashedPassword = await hashPassword(password);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    res.status(201).json(user);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
