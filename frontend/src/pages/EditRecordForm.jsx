import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api";

function EditRecordForm() {
    const { id } = useParams();
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

    // ✅ Load record data when page opens
    useEffect(() => {
        api.get(`/api/records/${id}/`)
            .then((res) => {
                setFormData({
                    ...res.data,
                    picture: null, // don’t preload the file input
                });
            })
            .catch((err) => alert("Failed to fetch record: " + err));
    }, [id]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    // Handle update submit
    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        for (let key in formData) {
            if (formData[key] !== null) {
                data.append(key, formData[key]);
            }
        }

        api.put(`/api/records/${id}/`, data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            if (res.status === 200) {
                alert("Record updated!");
                navigate(`/records/${id}`); // go back to detail page
            } else {
                alert("Failed to update record.");
            }
        })
        .catch((err) => alert(err));
    };

    return (
        <div className="container mt-4">
            <h2>Edit Record</h2>
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
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="form-control"
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
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-control"
                    required
                    />
                </div>
                <div className="col-md-6 mb-3">
                    <label className="form-label">Phone</label>
                    <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="form-control"
                    required
                    />
                </div>
                </div>

                <div className="mb-3">
                <label className="form-label">Address</label>
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    className="form-control"
                />
                </div>

                <div className="row">
                <div className="col-md-4 mb-3">
                    <label className="form-label">City</label>
                    <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">State</label>
                    <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    className="form-control"
                    />
                </div>
                <div className="col-md-4 mb-3">
                    <label className="form-label">Country</label>
                    <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-control"
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

                <button type="submit" className="btn btn-success">
                Update Record
                </button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => navigate(-2)}>
                Cancel
                </button>
            </form>
            </div>
    )
}

export default EditRecordForm;
