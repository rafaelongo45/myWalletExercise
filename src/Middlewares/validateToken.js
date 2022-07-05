import jwt from "jsonwebtoken";

export async function validateToken(req, res, next){
  const authorization = req.headers.authorization || "";
  const token = authorization.replace("Bearer ", "");

  if (!token) {
    return res.sendStatus(401);
  }

  try {
    let user;
    user = jwt.verify(token, process.env.JWT_SECRET);
    res.locals.user = user;
    next();
  } catch {
    return res.sendStatus(401);
  }
}