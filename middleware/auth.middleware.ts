import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from 'config';

export interface GetUserAuthInfoRequest extends Request {
  user: object | null;
}

export default (
  req: GetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
) => {
  if (req.method === 'OPTIONS') {
    return next();
  }

  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (!token) {
      return res.status(401).json({ message: 'Not authorised' });
    }
    req.user = jwt.decode(token, config.get('jwtSecret'));
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Not authorised' });
  }
};
