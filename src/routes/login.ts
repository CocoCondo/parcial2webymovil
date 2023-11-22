import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findUserByUsername, saveUser } from "../db/Users"

const router = express.Router();

router.post("/login", async (req, res) => {
  //const secretKey = process.env.JWT_SECRET_KEY;
  const secretKey = "cc0f6b2980ac284f92e60b796f2fc780a557bf3c10a3d365d6eaab20eb05612df09114e7ebb9273bdcf58f1a903658ee22ef05088770b18bc431c6803e604fdf";
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  console.log(secretKey);
  if (!user) {
    return res
      .status(401)
      .json({ message: "Authentication failed, invalid user" });
  }
  if (secretKey) {
    // 👇 here we check if the passwords match 👇 plain password, 👇 encrypted saved password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      // signing our JWT token with our secret and setting useful information in the
      // jwt payload 📦 as the username and expiration ⏳
      const token = jwt.sign({ username: user.username }, secretKey, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    }
  }

  return res.status(401).json({
    message: "Authentication failed, user and password must match...",
  });
});

router.post("/signup", (req, res) => {
  const { username, password } = req.body;
  const existingUser = findUserByUsername(username);

  if (existingUser) {
    return res.status(400).json({ message: "Username is already taken" });
  }

  const saltRounds = 10;
  // 👇 Hash the provided password using bcrypt
  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }

    // 🌈 simulating save the user
    saveUser(username, hash);
    return res.status(201).json({ message: "User registered successfully" });
  });
});

export default router;