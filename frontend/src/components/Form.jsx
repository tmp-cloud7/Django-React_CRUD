import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Link } from "react-router-dom";

import "../styles/Form.css";
// import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");   
  const [email, setEmail] = useState("");        
  const [phone, setPhone] = useState("");        
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let payload;

      if (method === "login") {
        // SimpleJWT expects "username"
        payload = { username: identifier, password };
        const res = await api.post(route, payload);

        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/records");
      } else {
        // Register first
        payload = { username, email, phone, password };
        await api.post(route, payload);

        // auto-login using username/password
        const loginRes = await api.post("/api/token/", {
          username,
          password,
        });

        localStorage.setItem(ACCESS_TOKEN, loginRes.data.access);
        localStorage.setItem(REFRESH_TOKEN, loginRes.data.refresh);
        navigate("/records");
      }
    } catch (error) {
      alert("Something went wrong: " + error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 auth-card">
        <form onSubmit={handleSubmit}>
          {/* ✅ Title */}
          <h1 className="form-title text-center mb-2">
            {method === "register" ? "Create Your Account" : "Welcome Back"}
          </h1>
          <div className="underline mx-auto mb-3"></div>

          {/* ✅ Subtitle */}
          <p className="text-center text-muted mb-4">
            {method === "register"
              ? "Start managing your clients today"
              : "Login to continue managing your records"}
          </p>

          {/* ✅ Fields */}
          {method === "register" ? (
            <>
              <input
                className="form-control custom-input mb-3"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              <input
                className="form-control custom-input mb-3"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              <input
                className="form-control custom-input mb-3"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
              />
            </>
          ) : (
            <input
              className="form-control custom-input mb-3"
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="Email or Phone"
              required
            />
          )}

          <input
            className="form-control custom-input mb-3"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />

          {loading && <div className="text-center loading-text">Loading...</div>}

          <button className="btn btn-primary w-100 custom-button mb-3" type="submit">
            {method === "register" ? "Register" : "Login"}
          </button>

          {/* ✅ Toggle link */}
          <div className="text-center">
            {method === "login" ? (
              <p>
                Don’t have an account?{" "}
                <Link to="/register" className="auth-link">
                  Register here
                </Link>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <Link to="/login" className="auth-link">
                  Login here
                </Link>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>


    
  );
}

export default Form;

