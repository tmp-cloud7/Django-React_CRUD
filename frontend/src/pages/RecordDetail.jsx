import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../api";

function RecordDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState(null);

    useEffect(() => {
        api.get(`/api/records/${id}/`)
            .then((res) => setRecord(res.data))
            .catch((err) => alert(err));
    }, [id]);

    const handleDelete = () => {
        api.delete(`/api/records/${id}/`)
            .then(() => {
                alert("Record deleted!");
                navigate("/");
            })
            .catch((err) => alert(err));
    };

    if (!record) return <p>Loading...</p>;

    return (
        <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <div className="row">
            {/* Profile Picture */}
            <div className="col-md-4 text-center mb-3">
              {record.picture ? (
                <img
                  src={record.picture}
                  alt="Record"
                  className="img-fluid rounded shadow-sm"
                  style={{ maxWidth: "200px", height: "auto" }}
                />
              ) : (
                <div className="text-muted">No picture available</div>
              )}
            </div>

            {/* Record Details */}
            <div className="col-md-8">
              <h2 className="card-title">
                {record.first_name} {record.last_name}
              </h2>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Email:</strong> {record.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {record.phone}
                </li>
                <li className="list-group-item">
                  <strong>Address:</strong> {record.address}
                </li>
                <li className="list-group-item">
                  <strong>City:</strong> {record.city}
                </li>
                <li className="list-group-item">
                  <strong>State:</strong> {record.state}
                </li>
                <li className="list-group-item">
                  <strong>Country:</strong> {record.country}
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 d-flex justify-content-end">
            <Link
              to={`/records/${id}/edit`}
              className="btn btn-warning me-2"
            >
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-danger"
            >
              Delete
            </button>
             <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate(-1)}
            >
            Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
    );
}

export default RecordDetail;
