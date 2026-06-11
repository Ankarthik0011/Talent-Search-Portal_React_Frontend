import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {

    const role = localStorage.getItem("role");
    const username = localStorage.getItem("username");
    const navigate = useNavigate();

    const [totalCandidates, setTotalCandidates] = useState(0);
    const [averageSalary, setAverageSalary] = useState(0);
    const [locations, setLocations] = useState(0);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {

        try {

            const total = await axios.get(
                "http://localhost:9090/api/candidates/report/total"
            );

            const avg = await axios.get(
                "http://localhost:9090/api/candidates/report/average-salary"
            );

            const location = await axios.get(
                "http://localhost:9090/api/candidates/report/location-count"
            );

            setTotalCandidates(total.data);
            setAverageSalary(Math.round(avg.data));
            setLocations(location.data);

        } catch (error) {

            console.error(error);

        }
    };

    const cardStyle = {
        minWidth: "300px",
        flex: "1 1 300px",
        padding: "25px",
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: "15px",
        textAlign: "center"
    };
    const hoverCard = {
        transition: "0.3s",
        cursor: "pointer"
    };
    return (
        <div
            style={{
                width: "100%"
            }}
        >

            <h1
                style={{
                    marginBottom: "25px",
                    color: "#60a5fa"
                }}
            >
                🏠 Home
            </h1>

            <div
                style={{
                    width: "100%",
                    boxSizing: "border-box",
                    background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                    padding: "50px",
                    borderRadius: "20px",
                    marginBottom: "30px"
                }}
            >
                <h1>
                    Welcome Back, {username} 👋
                </h1>

                <p>
                    Talent Search Recruitment Platform
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    justifyContent: "center"
                }}
            >

                <div
                    style={{
                        ...cardStyle,
                        cursor: "pointer"
                    }}
                    onClick={() => navigate("/candidates")}
                >
                    <h3>👥 Candidates</h3>
                    <h1>{totalCandidates}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>💰 Avg Salary</h3>
                    <h1>
                        ₹ {averageSalary.toLocaleString()}
                    </h1>
                </div>

                <div style={cardStyle}>
                    <h3>📍 Locations</h3>
                    <h1>{locations}</h1>
                </div>

                <div style={cardStyle}>
                    <h3>🧠 Skills</h3>

                    <h4>
                        Java, Spring, AWS, React
                    </h4>
                </div>
                <div style={cardStyle}>
                    <h3>⚡ Active Searches</h3>
                    <h1>120+</h1>
                </div>

            </div>
            <div
                style={{
                    marginTop: "30px"
                }}
            >
                <h2>🔥 Platform Highlights</h2>

                <div
                    style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        justifyContent: "center"
                    }}
                >

                    <div style={cardStyle}>
                        <h3>📄 Resume Management</h3>
                        <p>
                            Upload and download resumes
                            instantly.
                        </p>
                    </div>

                    <div style={cardStyle}>
                        <h3>🔍 Smart Search</h3>
                        <div
                            style={{
                                display: "flex",
                                gap: "10px",
                                justifyContent: "center"
                            }}
                        >
                            <button
                                onClick={() => navigate("/candidates")}
                            >
                                Candidates
                            </button>

                            <button
                                onClick={() => navigate("/")}
                            >
                                Dashboard
                            </button>
                        </div>
                    </div>

                    <div style={cardStyle}>
                        <h3>📊 Analytics</h3>
                        <p>
                            Skill and location insights.
                        </p>
                    </div>

                    <div style={cardStyle}>
                        <h3>🔐 Secure Access</h3>
                        <p>
                            Role based authentication
                            and authorization.
                        </p>
                    </div>

                </div>

            </div>
            <br />

            {role === "ADMIN" && (

                <div style={cardStyle}>
                    <h2>👨‍💼 Admin Quick Actions</h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            marginTop: "15px",
                            flexWrap: "wrap",
                            justifyContent: "center"
                        }}
                    >
                        <button
                            onClick={() => navigate("/add-candidate")}
                            style={{
                                padding: "10px 15px",
                                borderRadius: "8px",
                                border: "none",
                                background: "#2563eb",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Add Candidate
                        </button>

                        <button
                            onClick={() => navigate("/reports")}
                            style={{
                                padding: "10px 15px",
                                borderRadius: "8px",
                                border: "none",
                                background: "#10b981",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Reports
                        </button>

                        <button
                            onClick={() => navigate("/analytics")}
                            style={{
                                padding: "10px 15px",
                                borderRadius: "8px",
                                border: "none",
                                background: "#7c3aed",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Analytics
                        </button>

                    </div>
                </div>

            )}

            {role === "USER" && (

                <div style={cardStyle}>

                    <h2>👤 User Quick Actions</h2>

                    <div
                        style={{
                            display: "flex",
                            gap: "15px",
                            marginTop: "15px",
                            flexWrap: "wrap",
                            justifyContent: "center"
                        }}
                    >

                        <button
                            onClick={() => navigate("/candidates")}
                            style={{
                                padding: "10px 15px",
                                borderRadius: "8px",
                                border: "none",
                                background: "#2563eb",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Candidates
                        </button>

                        <button
                            onClick={() => navigate("/")}
                            style={{
                                padding: "10px 15px",
                                borderRadius: "8px",
                                border: "none",
                                background: "#10b981",
                                color: "white",
                                cursor: "pointer"
                            }}
                        >
                            Dashboard
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default Home;