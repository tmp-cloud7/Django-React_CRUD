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
            data.append(key, formData[key]);
        }

        api.post("/api/records/", data, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
            if (res.status === 201) {
                alert("Record created!");
                navigate("/");
            } else {
                alert("Failed to create record.");
            }
        })
        .catch((err) => alert(err));
    };

    return (
        <div>
            <h2>Create Record</h2>
            <form onSubmit={handleSubmit} encType="multipart/form-data">
                <input
                    type="text"
                    name="first_name"
                    placeholder="First Name"
                    value={formData.first_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="last_name"
                    placeholder="Last Name"
                    value={formData.last_name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                />
                <input
                    type="file"
                    name="picture"
                    accept="image/*"
                    onChange={handleChange}
                />

                <button type="submit">Save Record</button>
            </form>
        </div>
    );
}

export default CreateRecordForm;
