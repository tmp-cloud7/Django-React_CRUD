import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../api";
// import "../styles/Home.css";

function Home() {
    const [records, setRecords] = useState([]);

    const getRecords = () => {
        api
            .get("/api/records/")
            .then((res) => res.data)
            .then((data) => setRecords(data))
            .catch((err) => alert(err));
    };

    useEffect(() => {
        getRecords();
    }, []);

    return (
       <div className="container mt-4">
            {/* ✅ Create Record header */}
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="mb-0">Records</h2>
                <Link to="/records/create" className="btn btn-primary">
                + Create Record
                </Link>
            </div>

            {/* ✅ Table */}
            {/* Desktop/Large screens → Table */}
<div className="table-responsive d-none d-md-block">
  <table className="table table-striped table-hover align-middle shadow-sm">
    <thead className="table-dark">
      <tr>
        <th>Picture</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Address</th>
        <th>City/State</th>
        <th>Country</th>
        <th>Created</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {records.map((record) => (
        <tr key={record.id}>
          <td>
            {record.picture ? (
              <img
                src={record.picture}
                alt="Record"
                className="rounded-circle"
                style={{ width: "40px", height: "40px", objectFit: "cover" }}
              />
            ) : (
              "-"
            )}
          </td>
          <td>
            <strong>{record.first_name} {record.last_name}</strong>
          </td>
          <td>{record.email}</td>
          <td>{record.phone}</td>
          <td>{record.address}</td>
          <td>{record.city}, {record.state}</td>
          <td>{record.country}</td>
          <td>{new Date(record.creation_date).toLocaleDateString("en-US")}</td>
          <td>
            <Link to={`/records/${record.id}`} className="btn btn-sm btn-outline-info">
              View
            </Link>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Mobile → Card View */}
<div className="d-block d-md-none">
  {records.map((record) => (
    <div className="card mb-3 shadow-sm" key={record.id}>
      <div className="card-body d-flex align-items-center">
        {record.picture && (
          <img
            src={record.picture}
            alt="Record"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
        )}
        <div className="flex-grow-1">
          <h5 className="card-title mb-1">{record.first_name} {record.last_name}</h5>
          <p className="card-text mb-0"><strong>Email:</strong> {record.email}</p>
          <p className="card-text mb-0"><strong>Phone:</strong> {record.phone}</p>
          <p className="card-text mb-0"><strong>City/State:</strong> {record.city}, {record.state}</p>
          <p className="card-text mb-0"><strong>Country:</strong> {record.country}</p>
        </div>
        <Link to={`/records/${record.id}`} className="btn btn-sm btn-outline-info ms-2">
          View
        </Link>
      </div>
    </div>
  ))}
</div>

        </div>
    )
}

export default Home;
