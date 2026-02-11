const jwt = require("jsonwebtoken");

const createToken = async (req, res) => {
  try {
    const token = jwt.sign({ sub: "testing-user" }, "secret", {
      expiresIn: "1h",
    });

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({
      error: error.message || "Internal Server Error",
    });
  }
};

const verifyToken = async (req, res) => {
  console.log("🔐 Verify token request received");

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      console.warn("⚠️ Authorization header missing");
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1]; 
    console.log("📥 Token received:", token.slice(0, 20) + "...");

    const decoded = jwt.verify(token, "secret"); 

    console.log("✅ JWT VERIFIED SUCCESSFULLY");
    console.log("👤 User:", decoded.sub);
    console.log("🕒 Issued at:", new Date(decoded.iat * 1000));
    console.log("⏳ Expires at:", new Date(decoded.exp * 1000));

    const currentTime = Math.floor(Date.now() / 1000);

    return res.status(200).json({
      message: "Token is valid",
      decoded,
      session_expires_in: decoded.exp - currentTime,
    });
  } catch (error) {
    console.error("❌ JWT VERIFICATION FAILED");
    console.error("Reason:", error.message);

    return res.status(401).json({
      error: "Invalid or expired token",
    });
  }
};

module.exports = { createToken, verifyToken };
