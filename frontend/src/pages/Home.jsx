import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Home() {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchIdeas();
    }
  }, []);

  const fetchIdeas = async () => {
    try {
      const res = await API.get("/ideas");
      setIdeas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleVote = async (id) => {
    console.log("CLICKED VOTE:", id);

    try {
      const res = await API.post(
        `/vote/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("VOTE SUCCESS:", res.data);

      fetchIdeas();
    } catch (err) {
      console.log("❌ ERROR:", err.response?.data || err.message);
      alert(err.response?.data || "Vote failed ❌");
    }
  };

  // 🔓 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      {/* 🔥 Navbar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid gray",
        }}
      >
        <h3>🚀 Startup Platform</h3>

        {/* 🔥 RIGHT SIDE BUTTONS */}
        <div>
          <button onClick={() => navigate("/post")}>+ Post Idea</button>

          <button
            onClick={() => navigate("/dashboard")}
            style={{ marginLeft: "10px" }}
          >
            Dashboard
          </button>

          <button onClick={handleLogout} style={{ marginLeft: "10px" }}>
            Logout
          </button>
        </div>
      </div>

      <h2>💡 Ideas Feed</h2>

      {ideas.map((idea) => (
        <div
          key={idea._id}
          style={{
            border: "1px solid gray",
            margin: "10px",
            padding: "10px",
          }}
        >
          <h3>{idea.title}</h3>
          <p>{idea.description}</p>

          <p>👍 {idea.votes}</p>

          <button onClick={() => handleVote(idea._id)}>👍 Vote</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
