import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  // 🔐 Protect route
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/");
  }, []);

  const handleSubmit = async () => {
    await axios.post(
      "http://localhost:5000/api/items",
      form,
      {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      }
    );

    navigate("/dashboard");
  };

  return (
    <div className="container">
      <h2>Add Item</h2>

      <input
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <input
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />
      <input
        placeholder="Category"
        onChange={(e) =>
          setForm({ ...form, category: e.target.value })
        }
      />
      <input
        placeholder="Type (lost/found)"
        onChange={(e) =>
          setForm({ ...form, type: e.target.value })
        }
      />
      <input
        placeholder="Location"
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default AddItem;