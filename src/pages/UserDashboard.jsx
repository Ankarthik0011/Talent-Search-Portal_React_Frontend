import { useEffect, useState } from "react";
import axios from "axios";

function UserDashboard() {

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
        width: "250px",
        padding: "25px",
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0px 0px 10px rgba(0,0,0,0.3)"
    };

    return (
        <div>

            {/* Hero Section */}

            <div
                style={{
                    background:
                        "linear-gradient(135deg,#2563eb,#7c3aed)",
                    padding: "40px",
                    borderRadius: "15px",
                    marginBottom: "30px"
                }}
            >
                <h1
                    style={{
                        margin: 0,
                        color: "white"
                    }}
                >
                    Welcome Back 👋
                </h1>

                <p
                    style={{
                        marginTop: "10px",
                        fontSize: "18px"
                    }}
                >
                    Manage candidates, search talent,
                    download resumes and explore analytics
                    from a single platform.
                </p>
            </div>

            {/* Statistics Cards */}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap",
                    marginBottom: "40px"
                }}
            >

                <div style={cardStyle}>
                    <h3>👥 Total Candidates</h3>
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
                    <h3>🧠 Featured Skills</h3>
                    <h4>
                        Java, AWS,
                        Spring Boot,
                        React
                    </h4>
                </div>

            </div>

            {/* Feature Cards */}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap"
                }}
            >

                <div style={cardStyle}>
                    <h3>🔍 Search Candidates</h3>
                    <p>
                        Search candidates using
                        skills, location and
                        experience.
                    </p>
                </div>

                <div style={cardStyle}>
                    <h3>📄 Resume Access</h3>
                    <p>
                        Download and review
                        candidate resumes.
                    </p>
                </div>

                <div style={cardStyle}>
                    <h3>📊 Analytics</h3>
                    <p>
                        Skill and location
                        distribution insights.
                    </p>
                </div>

                <div style={cardStyle}>
                    <h3>🏆 Top Talent</h3>
                    <p>
                        Find the best matching
                        profiles quickly.
                    </p>
                </div>

            </div>

        </div>
    );
}

export default UserDashboard;