import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        email,
        password,
      });

      alert("User Registered 🔥");

      navigate("/"); // go to login
    } catch (err) {
      alert(err.response?.data || "Error ❌");
    }
  };

  return (
    <div>
      <h2>Register</h2>

      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
