import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API = "https://lost-found-backend-511q.onrender.com";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔐 Protect route + fetch items
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
    } else {
      fetchItems();
    }
  }, [navigate]);

  // 📦 Fetch all items
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${API}/api/items`);
      setItems(res.data);
    } catch (err) {
      console.error(err);
      alert("Error fetching items");
    }
  };

  // 🔍 Search items
  const handleSearch = async () => {
    try {
      const res = await axios.get(
        `${API}/api/items/search?q=${search}`
      );
      setItems(res.data);
    } catch (err) {
      alert("Search error");
    }
  };

  // 🔁 Toggle Lost ↔ Found
  const toggleStatus = async (id) => {
    try {
      await axios.patch(
        `${API}/api/items/${id}/status`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );

      fetchItems();
    } catch (err) {
      alert("Update failed");
    }
  };

  // ❌ Delete item
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API}/api/items/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      });

      fetchItems();
    } catch (err) {
      alert("Delete failed");
    }
  };

  // 🔐 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>📊 Dashboard</h2>

      <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
        <button onClick={handleLogout}>Logout</button>
        <button onClick={() => navigate("/add")}>➕ Add Item</button>
      </div>

      {/* 🔍 Search */}
      <input
        placeholder="Search items..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* 📦 Items */}
      {items.map((item) => (
        <div className="card fade-in" key={item._id}>
          <h3>{item.title}</h3>
          <p>{item.description}</p>

          <p className={item.type === "lost" ? "lost" : "found"}>
            {item.type.toUpperCase()}
          </p>

          <p>📍 {item.location}</p>

          {/* 🔁 Toggle Button */}
          <button onClick={() => toggleStatus(item._id)}>
            🔄 Toggle Status
          </button>

          {/* ❌ Delete Button */}
          <button
            onClick={() => deleteItem(item._id)}
            style={{ background: "red", marginLeft: "10px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;