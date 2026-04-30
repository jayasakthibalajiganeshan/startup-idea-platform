import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Dashboard() {
  const [ideas, setIdeas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchMyIdeas();
    }
  }, []);

  const fetchMyIdeas = async () => {
    try {
      const res = await API.get("/ideas/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setIdeas(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🗑 Delete idea
  const handleDelete = async (id) => {
    try {
      await API.delete(`/ideas/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      alert("Idea deleted successfully 🔥");

      fetchMyIdeas(); // refresh dashboard
    } catch (err) {
      console.log(err.response?.data || err.message);

      alert("Delete failed ❌");
    }
  };

  return (
    <div>
      <h2>📊 My Dashboard</h2>

      {ideas.length === 0 ? (
        <p>No ideas yet</p>
      ) : (
        ideas.map((idea) => (
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

            {/* 🗑 Delete Button */}
            <button
              onClick={() => handleDelete(idea._id)}
              style={{
                marginTop: "10px",
                backgroundColor: "red",
                color: "white",
                border: "none",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
