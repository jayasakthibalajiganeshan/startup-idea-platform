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
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
