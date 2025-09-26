import { Link } from "react-router-dom";
import "../styles/LandingPage.css";
function LandingPage() {
  return (
    <div className="landing-container d-flex justify-content-center align-items-center min-vh-100 text-center">
      <div className="landing-card p-5 shadow-lg rounded">
        <h1 className="landing-title mb-3">Welcome to ProjectX</h1>
        <p className="text-muted mb-4">
          Manage your clients and records easily with our modern CRM solution.
        </p>

        <div className="d-flex justify-content-center gap-3">
          <Link to="/login" className="btn btn-primary btn-lg">
            Login
          </Link>
          <Link to="/register" className="btn btn-outline-primary btn-lg">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
