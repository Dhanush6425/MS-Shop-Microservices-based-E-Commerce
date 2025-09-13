const db = require("../config/db");
const jwt = require("jsonwebtoken");

// REGISTER
exports.register = (req, res) => {
  const { name, email, password } = req.body || {};

  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: "Missing required fields" });
  }

  db.query(
    "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
    [name, email, password], // <-- directly store password
    (err, result) => {
      if (err) {
        console.error("❌ DB Insert Error:", err);
        if (err.code === 'ER_DUP_ENTRY') {
          return res.status(400).json({
            success: false,
            message: "This email is already registered."
          });
        }
        return res.status(400).json({
          success: false,
          message: "User registration failed",
          error: err.sqlMessage
        });
      }

      console.log("✅ User inserted:", result);
      res.json({
        success: true,
        message: "User registered successfully",
        userId: result.insertId
      });
    }
  );
};
// LOGIN
exports.login = (req, res) => {
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "Missing email or password" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) {
      console.error("❌ DB Select Error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = results[0];

    // Directly compare plain password
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "your_jwt_secret",
      { expiresIn: "1h" }
    );

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });
  });
};
