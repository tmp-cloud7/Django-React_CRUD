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
        <div className="home-container">
            {/* ✅ Create Record link */}
            <div className="header">
                <h2>Records</h2>
                <Link to="/records/create" className="create-button">
                    + Create Record
                </Link>
            </div>

            {/* ✅ Display table */}
            <table className="records-table">
                <thead>
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
                                        className="table-image"
                                    />
                                ) : (
                                    "-"
                                )}
                            </td>
                            <td>{record.first_name} {record.last_name}</td>
                            <td>{record.email}</td>
                            <td>{record.phone}</td>
                            <td>{record.address}</td>
                            <td>{record.city}, {record.state}</td>
                            <td>{record.country}</td>
                            <td>{new Date(record.creation_date).toLocaleDateString("en-US")}</td>
                            <td>
                                {/* ✅ View button routes to detail page */}
                                <Link to={`/records/${record.id}`} className="view-button">
                                    View
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
