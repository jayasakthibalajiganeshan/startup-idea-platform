import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // 🔥 remove token
    navigate("/"); // 🔥 go to login
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "10px",
        borderBottom: "1px solid gray",
      }}
    >
      <h3>🚀 Startup Platform</h3>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Navbar;
