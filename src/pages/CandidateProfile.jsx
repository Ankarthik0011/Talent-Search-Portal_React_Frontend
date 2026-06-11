import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function CandidateProfile() {

    const { id } = useParams();

    const [candidate, setCandidate] = useState(null);

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

    if (!candidate) {
        return <h2>Loading Candidate...</h2>;
    }

    return (
        <div style={{ padding: "30px" }}>

            <h1>🧑‍🏫Candidate Profile</h1>

            <div
                style={{
                    background: "#111827",
                    border: "1px solid #334155",
                    borderRadius: "20px",
                    padding: "30px",
                    maxWidth: "900px",
                    margin: "auto",
                    boxShadow: "0 0 20px rgba(0,0,0,0.3)"
                }}
            >

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "20px",
                        marginBottom: "25px"
                    }}
                >

                    <div
                        style={{
                            width: "90px",
                            height: "90px",
                            borderRadius: "50%",
                            background: "#3b82f6",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontSize: "35px",
                            fontWeight: "bold",
                            color: "white"
                        }}
                    >
                        {candidate.fullName?.charAt(0)}
                    </div>

                    <div>
                        <h1>{candidate.fullName}</h1>

                        <p>
                            {candidate.resumeFileName
                                ? "✅ Resume Uploaded"
                                : "❌ Resume Not Uploaded"}
                        </p>
                    </div>

                </div>

                <hr />

                <p>
                    <strong>Email:</strong>{" "}
                    {candidate.email || "Not Available"}
                </p>

                <p>
                    <strong>Phone:</strong>{" "}
                    {candidate.phone || "Not Available"}
                </p>

                <div>
                    <strong>Skills:</strong>

                    <div
                        style={{
                            display: "flex",
                            gap: "10px",
                            flexWrap: "wrap",
                            marginTop: "10px"
                        }}
                    >
                        {candidate.skills
                            ?.split(",")
                            .map((skill, index) => (
                                <span
                                    key={index}
                                    style={{
                                        background: "#2563eb",
                                        padding: "6px 12px",
                                        borderRadius: "20px",
                                        color: "white"
                                    }}
                                >
                                    {skill.trim()}
                                </span>
                            ))}
                    </div>
                </div>

                <p>
                    <strong>Experience:</strong>{" "}
                    {candidate.experienceYears} Years
                </p>

                <p>
                    <strong>Location:</strong>{" "}
                    {candidate.location}
                </p>

                <p>
                    <strong>Current Company:</strong>{" "}
                    {candidate.currentCompany || "Not Available"}
                </p>

                <p>
                    <strong>Expected Salary:</strong>{" "}
                    ₹ {candidate.expectedSalary?.toLocaleString()}
                </p>

                <p>
                    <strong>Notice Period:</strong>{" "}
                    {candidate.noticePeriod || 0} Days
                </p>

                <br />

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        marginTop: "25px",
                        marginBottom: "25px",
                        flexWrap: "wrap"
                    }}
                >

                    <div
                        style={{
                            background: "#0f172a",
                            padding: "20px",
                            borderRadius: "12px"
                        }}
                    >
                        💼 Experience
                        <h2>{candidate.experienceYears} Years</h2>
                    </div>

                    <div
                        style={{
                            background: "#0f172a",
                            padding: "20px",
                            borderRadius: "12px"
                        }}
                    >
                        💰 Salary
                        <h2>
                            ₹ {candidate.expectedSalary?.toLocaleString()}
                        </h2>
                    </div>

                </div>

                <div
                    style={{
                        display: "flex",
                        gap: "10px",
                        flexWrap: "wrap"
                    }}
                >

                    <button
                        onClick={() =>
                            window.open(
                                `http://localhost:9090/api/candidates/preview/${candidate.id}`
                            )
                        }
                        style={{
                            background: "#22c55e",
                            color: "white",
                            border: "none",
                            padding: "10px 15px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        👁 Preview Resume
                    </button>

                    <button
                        onClick={() =>
                            window.open(
                                `http://localhost:9090/api/candidates/download/${candidate.id}`
                            )
                        }
                        style={{
                            background: "#f59e0b",
                            color: "white",
                            border: "none",
                            padding: "10px 15px",
                            borderRadius: "6px",
                            cursor: "pointer"
                        }}
                    >
                        📄 Download Resume
                    </button>

                </div>

            </div>

        </div>
    );
}

export default CandidateProfile;