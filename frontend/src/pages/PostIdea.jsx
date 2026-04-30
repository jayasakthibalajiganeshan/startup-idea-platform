import { useState } from "react";
import API from "../api/api";

function PostIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handlePost = async () => {
    try {
      await API.post(
        "/ideas",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      alert("Idea Posted 🔥");

      setTitle("");
      setDescription("");
    } catch (err) {
      alert(err.response?.data || "Error ❌");
    }
  };

  return (
    <div>
      <h2>Post Idea 💡</h2>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />
      <br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <br />
      <br />

      <button onClick={handlePost}>Submit</button>
    </div>
  );
}

export default PostIdea;
