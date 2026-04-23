import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // 🔐 Protect route + fetch items
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/"); // redirect if not logged in
    } else {
      fetchItems();
    }
  }, []);

  // 📦 Fetch all items
  const fetchItems = async () => {
    const res = await axios.get("http://localhost:5000/api/items");
    setItems(res.data);
  };

  // 🔍 Search items
  const handleSearch = async () => {
    const res = await axios.get(
      `http://localhost:5000/api/items/search?q=${search}`
    );
    setItems(res.data);
  };

  // 🔐 LOGOUT FUNCTION
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/"); // go to login
  };

  return (
    <div className="container">
      <h2>Dashboard</h2>

      {/* 🔐 Logout Button */}
      <button onClick={handleLogout}>Logout</button>

      <br />

      <input
        placeholder="Search..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <button onClick={() => navigate("/add")}>Add Item</button>

      {/* 📦 Items */}
      {items.map(item => (
  <div className="card fade-in" key={item._id}>
    <h3>{item.title}</h3>
    <p>{item.description}</p>

    <p className={item.type === "lost" ? "lost" : "found"}>
      {item.type.toUpperCase()}
    </p>

    <p>{item.location}</p>
  </div>
))}
    </div>
  );
}

export default Dashboard;