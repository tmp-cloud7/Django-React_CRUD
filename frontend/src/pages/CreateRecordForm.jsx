import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";

function CreateRecordForm() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "",
        country: "",
        picture: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value, // handle file inputs
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in formData) {
            if (key === "picture" && !formData.picture) {
            continue; 
        }
            data.append(key, formData[key]);
        }

        api.post("/api/records/", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            if (res.status === 201) {
                alert("Record created!");
                navigate("/records");
            } else {
                alert("Failed to create record.");
            }
        })
        .catch((err) => alert(err));
    };

    return (
        <div className="container mt-4">
        <h2>Create Record</h2>
        <form
            onSubmit={handleSubmit}
            encType="multipart/form-data"
            className="p-4 border rounded shadow-sm bg-light"
        >
            <div className="row">
            <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter first name"
                required
                />
            </div>
            <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter last name"
                required
                />
            </div>
            </div>

            <div className="row">
            <div className="col-md-6 mb-3">
                <label className="form-label">Email</label>
                <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter email"
                required
                />
            </div>
            <div className="col-md-6 mb-3">
                <label className="form-label">Phone</label>
                <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter phone number"
                required
                />
            </div>
            </div>

            <div className="mb-3">
            <label className="form-label">Address</label>
            <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter address"
            />
            </div>

            <div className="row">
            <div className="col-md-4 mb-3">
                <label className="form-label">City</label>
                <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter city"
                />
            </div>
            <div className="col-md-4 mb-3">
                <label className="form-label">State</label>
                <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter state"
                />
            </div>
            <div className="col-md-4 mb-3">
                <label className="form-label">Country</label>
                <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter country"
                />
            </div>
            </div>

            <div className="mb-3">
            <label className="form-label">Picture</label>
            <input
                type="file"
                name="picture"
                accept="image/*"
                onChange={handleChange}
                className="form-control"
            />
            </div>

            <button type="submit" className="btn btn-primary">
            Save Record
            </button>
            <button
            type="button"
            className="btn btn-secondary ms-2"
            onClick={() => navigate(-1)}
            >
            Cancel
            </button>
        </form>
    </div>

    );
}

export default CreateRecordForm;
