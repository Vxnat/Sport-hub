import { auth } from "../config/firebase.js";

async function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split("Bearer ")[1];

  if (!token) return res.status(401).json({ error: "Không có token" });

  try {
    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token không hợp lệ" });
  }
}

export { authenticateToken };
