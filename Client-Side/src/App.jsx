import axios from 'axios';
import { useState } from 'react';
import './App.css';

export const App = () => {
  const [token, setToken] = useState('');

  const createToken = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8000/auth/create-token"
      );

      setToken(res.data.token);
      localStorage.setItem("jwtToken", res.data.token);

      console.log("Token created and stored in localStorage:", res.data.token);

      alert("Token created & stored successfully");
    } catch (error) {
      console.error(error.message);
    }
  };

  const verifyToken = async () => {
    console.log("🔍 Verifying JWT token...");

    try {
      const storedToken = localStorage.getItem("jwtToken");

      if (!storedToken) {
        console.warn("⚠️ No token found in localStorage");
        return;
      }

      console.log("📤 Sending token to server for verification");

      const res = await axios.get(
        "http://localhost:8000/auth/verify-token",
        {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        }
      );
      alert("JWT Verification Result: " + res.data.message);

      console.log("✅ TOKEN VERIFICATION SUCCESS");
      console.log("👤 User:", res.data.decoded.sub);
      console.log("⏳ Session expires in:", res.data.session_expires_in, "seconds");
      console.log("📦 Full response:", res.data);

    } catch (error) {
      console.error("❌ TOKEN VERIFICATION FAILED");

      if (error.response) {
        console.error("🚫 Server Response:", error.response.data);
        console.error("📛 Status Code:", error.response.status);
      } else {
        console.error("⚠️ Network / Client Error:", error.message);
      }
    }
  };


  return (
    <div>
      <h1>JWT</h1>
      <p>This application handles JWT token creation, updating, and storage.</p>

      <button onClick={createToken}> Create Token </button>

      <p>Generated Token: {typeof token === 'string' ? token : 'No token generated yet'}</p>

      <button onClick={verifyToken}> Verify Token </button>
    </div>
  );
};

export default App;
