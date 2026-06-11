import { useEffect, useState } from "react";
import axios from "axios";
import { getAllCandidates } from "../services/candidateService";
import {
    useNavigate,
    useSearchParams
} from "react-router-dom";

function CandidateList() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const globalSearch =
        searchParams.get("search") || "";

    const role = localStorage.getItem("role");

    const [candidates, setCandidates] = useState([]);
    const [skill, setSkill] = useState("");
    const [location, setLocation] = useState("");
    const [experience, setExperience] = useState("");

    useEffect(() => {
        loadCandidates();
    }, []);

    const loadCandidates = async () => {
        try {
            const response = await getAllCandidates();
            setCandidates(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const searchCandidates = async () => {

        try {

            if (
                skill.trim() === "" &&
                location.trim() === "" &&
                experience === ""
            ) {
                loadCandidates();
                return;
            }

            const response = await axios.get(
                "http://localhost:9090/api/candidates/filter",
                {
                    params: {
                        skill,
                        location,
                        exp: experience || null
                    }
                }
            );

            setCandidates(response.data);

        } catch (error) {

            console.error(error);

        }
    };

    useEffect(() => {

        const timer = setTimeout(() => {
            searchCandidates();
        }, 400);

        return () => clearTimeout(timer);

    }, [skill, location, experience]);

    const deleteCandidate = async (id) => {

        const confirmDelete =
            window.confirm("Are you sure you want to delete this candidate?");

        if (!confirmDelete) return;

        try {

            await axios.delete(
                `http://localhost:9090/api/candidates/${id}`
            );

            loadCandidates();

        } catch (error) {

            console.error(error);

            alert("Error deleting candidate");

        }
    };

    const clearFilters = () => {

        setSkill("");
        setLocation("");
        setExperience("");

        loadCandidates();
    };

    const totalSalary = candidates.reduce(
        (sum, candidate) => sum + candidate.expectedSalary,
        0
    );

    const averageSalary =
        candidates.length > 0
            ? Math.round(totalSalary / candidates.length)
            : 0;
    const filteredCandidates =
        globalSearch === ""
            ? candidates
            : candidates.filter(
                (candidate) =>
                    candidate.fullName
                        .toLowerCase()
                        .includes(
                            globalSearch.toLowerCase()
                        ) ||

                    candidate.skills
                        .toLowerCase()
                        .includes(
                            globalSearch.toLowerCase()
                        ) ||

                    candidate.location
                        .toLowerCase()
                        .includes(
                            globalSearch.toLowerCase()
                        )
            );
    return (
        <div style={{ padding: "25px" }}>

            <h1
                style={{
                    color: "#60a5fa",
                    marginBottom: "20px"
                }}
            >
                👥 Candidate Management
            </h1>
            {/* Dashboard Cards */}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    marginBottom: "25px",
                    flexWrap: "wrap"
                }}
            >
                <div
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "220px",
                        textAlign: "center"
                    }}
                >
                    <h3>Total Candidates</h3>
                    <h2>{filteredCandidates.length}</h2>
                </div>

                <div
                    style={{
                        border: "1px solid #ccc",
                        borderRadius: "10px",
                        padding: "20px",
                        width: "220px",
                        textAlign: "center"
                    }}
                >
                    <h3>Average Salary</h3>
                    <h2>₹ {averageSalary.toLocaleString()}</h2>
                </div>
            </div>

            {/* Search Filters */}

            <div
                style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "25px",
                    flexWrap: "wrap"
                }}
            >
                <input
                    type="text"
                    placeholder="Search Skill"
                    value={skill}
                    onChange={(e) => setSkill(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Search Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Search Experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                />

                <button onClick={clearFilters}>
                    🔄 Reset
                </button>
            </div>

            {/* Candidate Table */}

            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "20px",
                    marginTop: "20px"
                }}
            >
                {filteredCandidates.map((candidate) => (

                    <div
                        key={candidate.id}
                        style={{
                            width: "320px",
                            background: "#111827",
                            border: "1px solid #334155",
                            borderRadius: "15px",
                            padding: "20px",
                            boxShadow:
                                "0 0 15px rgba(0,0,0,0.3)"
                        }}
                    >

                        <h2>
                            👤 {candidate.fullName}
                        </h2>

                        <p>
                            🧠 {candidate.skills}
                        </p>

                        <p>
                            💼 {candidate.experienceYears} Years
                        </p>

                        <p>
                            📍 {candidate.location}
                        </p>

                        <p>
                            💰 ₹ {candidate.expectedSalary?.toLocaleString()}
                        </p>
                        <p>
                            {candidate.resumeFileName
                                ? "✅ Resume Uploaded"
                                : "❌ Resume Not Uploaded"}
                        </p>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                flexWrap: "wrap",
                                marginTop: "15px"
                            }}
                        >

                            <button
                                onClick={() =>
                                    navigate(`/profile/${candidate.id}`)
                                }
                            >
                                👁 View
                            </button>

                            {candidate.resumeFileName ? (
                                <>
                                    <button
                                        onClick={() =>
                                            window.open(
                                                `http://localhost:9090/api/candidates/download/${candidate.id}`
                                            )
                                        }
                                    >
                                        📄 Resume
                                    </button>


                                </>
                            ) : (
                                <span
                                    style={{
                                        color: "#ef4444",
                                        fontWeight: "bold"
                                    }}
                                >
                                    ❌ Resume Not Uploaded
                                </span>
                            )}
                            <button
                                onClick={() =>
                                    window.open(
                                        `http://localhost:9090/api/candidates/preview/${candidate.id}`,
                                        "_blank"
                                    )
                                }
                            >
                                📑 Preview
                            </button>
                            {role === "ADMIN" && (
                                <>
                                    <button
                                        onClick={() =>
                                            navigate(
                                                `/edit-candidate/${candidate.id}`
                                            )
                                        }
                                    >
                                        ✏️ Edit
                                    </button>

                                    <button
                                        onClick={() =>
                                            deleteCandidate(candidate.id)
                                        }
                                    >
                                        🗑 Delete
                                    </button>
                                </>
                            )}

                        </div>

                    </div>

                ))}
            </div>

        </div>
    );
}

export default CandidateList;