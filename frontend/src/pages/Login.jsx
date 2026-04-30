import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Enter email & password");
      return;
    }

    try {
      const res = await API.post("/auth/login", {
        email: email.trim(),
        password: password.trim(),
      });

      console.log("SUCCESS:", res.data);

      // 🔐 Save token
      localStorage.setItem("token", res.data.token);

      alert("Login Success 🔥");

      navigate("/home");
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data || "Login Failed ❌");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handleLogin}>Login</button>

      <br />
      <br />

      {/* 🔥 NEW USER BUTTON */}
      <button onClick={() => navigate("/register")}>New User? Register</button>
    </div>
  );
}

export default Login;
