import { useState } from "react";
import axios from "axios";

function AddCandidate() {

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

    const [resume, setResume] = useState(null);

    const handleChange = (e) => {
        setCandidate({
            ...candidate,
            [e.target.name]: e.target.value
        });
    };

    const saveCandidate = async (e) => {

        e.preventDefault();

        if (!resume) {
            alert("Resume is mandatory");
            return;
        }

        try {

            // Save Candidate

            const response = await axios.post(
                "http://localhost:9090/api/candidates",
                candidate
            );

            const candidateId = response.data.id;

            // Upload Resume

            if (resume) {

                const formData = new FormData();

                formData.append(
                    "file",
                    resume
                );

                await axios.post(
                    `http://localhost:9090/api/candidates/upload/${candidateId}`,
                    formData
                );
            }

            alert("Candidate Added Successfully");

            setCandidate({
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

            setResume(null);

        } catch (error) {

            console.error(error);

            alert("Failed to Add Candidate");
        }
    };

    return (
        <div style={{ padding: "30px" }}>

            <h1>➕ Add Candidate</h1>

            <form
                onSubmit={saveCandidate}
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
                    value={candidate.fullName}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={candidate.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={candidate.phone}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="skills"
                    placeholder="Skills"
                    value={candidate.skills}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="experienceYears"
                    placeholder="Experience (Years)"
                    value={candidate.experienceYears}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={candidate.location}
                    onChange={handleChange}
                    required
                />

                <input
                    type="text"
                    name="currentCompany"
                    placeholder="Current Company"
                    value={candidate.currentCompany}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="expectedSalary"
                    placeholder="Expected Salary"
                    value={candidate.expectedSalary}
                    onChange={handleChange}
                    required
                />

                <input
                    type="number"
                    name="noticePeriod"
                    placeholder="Notice Period (Days)"
                    value={candidate.noticePeriod}
                    onChange={handleChange}
                    required
                />

                <div>
                    <label>
                        Upload Resume (PDF):
                    </label>

                    <br />

                    <input
                        type="file"
                        accept=".pdf"
                        required
                        onChange={(e) =>
                            setResume(e.target.files[0])
                        }
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        background: "#22c55e",
                        color: "white",
                        border: "none",
                        padding: "12px",
                        borderRadius: "6px",
                        cursor: "pointer"
                    }}
                >
                    Add Candidate
                </button>

            </form>

        </div>
    );
}

export default AddCandidate;