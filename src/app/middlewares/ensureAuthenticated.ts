import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
  _id: string;
  email: string;
}

export async function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.sendStatus(401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const secret = process.env.SECRET_KEY || 'secret';

    const { _id } = verify(token, secret) as IPayload;

    req.user = { _id };

    next();
  } catch (err) {
    console.log('err', err);
    return res.sendStatus(401);
  }
}
