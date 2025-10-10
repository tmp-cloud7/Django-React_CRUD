import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { Link } from "react-router-dom";

import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

function Form({ route, method }) {
  const [username, setUsername] = useState("");   
  const [email, setEmail] = useState("");        
  const [phone, setPhone] = useState("");        
  const [identifier, setIdentifier] = useState(""); 
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (method === "register") {
      if (!username || username.length < 3) {
        newErrors.username = "Username must be at least 3 characters";
      }
      if (!email || !/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Enter a valid email address";
      }
      const nigeriaPhoneRegex = /^(?:\+234|0)(7|8|9)(0|1)\d{8}$/;
      if (!phone || !nigeriaPhoneRegex.test(phone)) {
        newErrors.phone = "Enter a valid phone number (e.g. 08012345678 or +2348012345678)";
      }
    }

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (method === "login" && !identifier) {
      newErrors.identifier = "Please enter your username or email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    setErrors({}); // clear old errors

    try {
      let payload;

      if (method === "login") {
        payload = { username: identifier, password };
        const res = await api.post(route, payload);

        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        localStorage.setItem("username", identifier);
        navigate("/records");
      } else {
        payload = { username, email, phone, password };
        await api.post(route, payload);

        // Auto-login
        const loginRes = await api.post("/api/token/", {
          username,
          password,
        });

        localStorage.setItem(ACCESS_TOKEN, loginRes.data.access);
        localStorage.setItem(REFRESH_TOKEN, loginRes.data.refresh);
        localStorage.setItem("username", username); 
        navigate("/records");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        // ✅ Map backend errors to frontend errors state
        setErrors(error.response.data);
      } else {
        alert("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <div className="card shadow-lg p-4 auth-card">
        <form onSubmit={handleSubmit} className="position-relative">
          {/* Title */}
          <h1 className="form-title text-center mb-2">
            {method === "register" ? "Create Your Account" : "Welcome Back"}
          </h1>
          <div className="underline mx-auto mb-3"></div>

          {/* Subtitle */}
          <p className="text-center text-muted mb-4">
            {method === "register"
              ? "Start managing your clients today"
              : "Login to continue managing your records"}
          </p>

          {/* Fields */}
          {method === "register" ? (
            <>
              <input
                className={`form-control custom-input mb-1 ${errors.username ? "is-invalid" : ""}`}
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
              />
              {errors.username && <div className="text-danger small mb-2">{errors.username[0] || errors.username}</div>}

              <input
                className={`form-control custom-input mb-1 ${errors.email ? "is-invalid" : ""}`}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
              {errors.email && <div className="text-danger small mb-2">{errors.email[0] || errors.email}</div>}

              <input
                className={`form-control custom-input mb-1 ${errors.phone ? "is-invalid" : ""}`}
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                required
              />
              {errors.phone && <div className="text-danger small mb-2">{errors.phone[0] || errors.phone}</div>}
            </>
          ) : (
            <>
              <input
                className={`form-control custom-input mb-1 ${errors.identifier ? "is-invalid" : ""}`}
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Username or Email"
                required
              />
              {errors.identifier && <div className="text-danger small mb-2">{errors.identifier[0] || errors.identifier}</div>}
            </>
          )}

          <input
            className={`form-control custom-input mb-1 ${errors.password ? "is-invalid" : ""}`}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {errors.password && <div className="text-danger small mb-2">{errors.password[0] || errors.password}</div>}

          {/* Loading overlay */}
          {loading && (
            <div className="loading-overlay d-flex justify-content-center align-items-center">
              <LoadingIndicator />
            </div>
          )}

          <button className="btn btn-primary w-100 custom-button mb-3" type="submit" disabled={loading}>
            {method === "register" ? "Register" : "Login"}
          </button>

          {/* Toggle link */}
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
