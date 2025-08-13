import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const SECRET = 'segredo123'; // mesmo usado no authRoutes

interface AuthRequest extends Request {
  usuarioId?: string;
}

export const autenticarUsuario = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  try {
    const payload = jwt.verify(token, SECRET) as { id: string };
    req.usuarioId = payload.id;
    next();
  } catch (err) {
    res.status(401).json({ erro: 'Token inválido' });
  }
};
