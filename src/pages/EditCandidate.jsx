import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function EditCandidate() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [candidate, setCandidate] = useState({
        fullName: "",
        email: "",
        phone: "",
        skills: "",
        experienceYears: "",
        location: "",
        currentCompany: "",
        expectedSalary: "",
        noticePeriod: ""
    });

    useEffect(() => {
        loadCandidate();
    }, []);

    const loadCandidate = async () => {
        try {

            const response = await axios.get(
                `http://localhost:9090/api/candidates/${id}`
            );

            setCandidate(response.data);

        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (e) => {

        setCandidate({
            ...candidate,
            [e.target.name]: e.target.value
        });
    };

    const updateCandidate = async () => {

        try {

            await axios.put(
                `http://localhost:9090/api/candidates/${id}`,
                candidate
            );

            alert("Candidate Updated Successfully");

            navigate("/candidates");

        } catch (error) {

            console.error(error);

            alert("Update Failed");
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1>Edit Candidate</h1>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                    maxWidth: "600px"
                }}
            >

                <input
                    type="text"
                    name="fullName"
                    placeholder="Full Name"
                    value={candidate.fullName || ""}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={candidate.email || ""}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone"
                    value={candidate.phone || ""}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="skills"
                    placeholder="Skills"
                    value={candidate.skills || ""}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="experienceYears"
                    placeholder="Experience"
                    value={candidate.experienceYears || ""}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={candidate.location || ""}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="currentCompany"
                    placeholder="Current Company"
                    value={candidate.currentCompany || ""}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="expectedSalary"
                    placeholder="Expected Salary"
                    value={candidate.expectedSalary || ""}
                    onChange={handleChange}
                />

                <input
                    type="number"
                    name="noticePeriod"
                    placeholder="Notice Period (Days)"
                    value={candidate.noticePeriod || ""}
                    onChange={handleChange}
                />

                <button
                    onClick={updateCandidate}
                    style={{
                        background: "#2563eb",
                        color: "white",
                        border: "none",
                        padding: "12px",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    Update Candidate
                </button>

            </div>

        </div>
    );
}

export default EditCandidate;