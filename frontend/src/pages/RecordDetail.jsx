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
        <div>
            <h2>{record.first_name} {record.last_name}</h2>
            <p>Email: {record.email}</p>
            <p>Phone: {record.phone}</p>
            <p>Address: {record.address}</p>
            <p>City: {record.city}</p>
            <p>State: {record.state}</p>
            <p>Country: {record.country}</p>

            {record.picture && (
                <img src={record.picture} alt="Record" width="200" />
            )}

            <div style={{ marginTop: "1rem" }}>
                <Link to={`/records/${id}/edit`} className="edit-button">Edit</Link>
                <button onClick={handleDelete} className="delete-button">Delete</button>
            </div>
        </div>
    );
}

export default RecordDetail;
