import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("https://lost-found-backend-511q.onrender.com/api/auth/register", {
        name,
        email,
        password
      });

      alert("Registered Successfully");
      navigate("/");

    } catch (err) {
      if (err.response) {
        alert(err.response.data);   // shows actual error
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;