import { useEffect, useState } from "react";
import axios from "axios";

import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid
} from "recharts";

function AdminDashboard() {

    const [totalCandidates, setTotalCandidates] = useState(0);
    const [averageSalary, setAverageSalary] = useState(0);
    const [highestSalary, setHighestSalary] = useState(0);
    const [lowestSalary, setLowestSalary] = useState(0);
    const [locations, setLocations] = useState(0);
    const [skillsData, setSkillsData] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);

    const loadDashboard = async () => {

        try {

            const total = await axios.get(
                "http://localhost:9090/api/candidates/report/total"
            );

            const avg = await axios.get(
                "http://localhost:9090/api/candidates/report/average-salary"
            );

            const highest = await axios.get(
                "http://localhost:9090/api/candidates/report/highest-salary"
            );

            const lowest = await axios.get(
                "http://localhost:9090/api/candidates/report/lowest-salary"
            );

            const locationCount = await axios.get(
                "http://localhost:9090/api/candidates/report/location-count"
            );

            const skills = await axios.get(
                "http://localhost:9090/api/candidates/report/skills"
            );

            setTotalCandidates(total.data);
            setAverageSalary(Math.round(avg.data));
            setHighestSalary(highest.data);
            setLowestSalary(lowest.data);
            setLocations(locationCount.data);

            const chartData = Object.entries(skills.data).map(
                ([name, value]) => ({
                    name,
                    value
                })
            );

            setSkillsData(chartData);

        } catch (error) {
            console.error(error);
        }
    };

    const COLORS = [
        "#3b82f6",
        "#10b981",
        "#f59e0b",
        "#ef4444",
        "#8b5cf6",
        "#06b6d4"
    ];

    const cardStyle = {
        minWidth: "250px",
        flex: "1",
        padding: "25px",
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: "15px",
        textAlign: "center",
        boxShadow: "0px 0px 15px rgba(0,0,0,0.3)"
    };
    const experienceData = [
        { name: "0-2 Yrs", value: 8 },
        { name: "3-5 Yrs", value: 12 },
        { name: "5-8 Yrs", value: 6 },
        { name: "8+ Yrs", value: 4 }
    ];
    return (
        <div
            style={{
                width: "100%"
            }}
        >

            <h1
                style={{
                    textAlign: "center",
                    marginBottom: "30px"
                }}
            >
                📊Admin Analytics Dashboard
            </h1>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                    gap: "20px",
                    marginBottom: "30px"
                }}
            >

                <div style={cardStyle}>
                    <h3>Total Candidates</h3>
                    <h2>{totalCandidates}</h2>
                </div>

                <div style={cardStyle}>
                    <h3>Average Salary</h3>
                    <h2>
                        ₹ {averageSalary.toLocaleString()}
                    </h2>
                </div>

                <div style={cardStyle}>
                    <h3>Highest Salary</h3>
                    <h2>
                        ₹ {highestSalary.toLocaleString()}
                    </h2>
                </div>

                <div style={cardStyle}>
                    <h3>Lowest Salary</h3>
                    <h2>
                        ₹ {lowestSalary.toLocaleString()}
                    </h2>
                </div>

                <div style={cardStyle}>
                    <h3>Locations</h3>
                    <h2>{locations}</h2>
                </div>

            </div>
            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    marginBottom: "30px"
                }}
            >

                <button
                    style={{
                        padding: "10px 20px",
                        background: "#22c55e",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    ➕ Add Candidate
                </button>

                <button
                    style={{
                        padding: "10px 20px",
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    📊 Reports
                </button>

                <button
                    style={{
                        padding: "10px 20px",
                        background: "#8b5cf6",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer"
                    }}
                >
                    📈 Analytics
                </button>

            </div>
            <div
                style={{
                    width: "100%",
                    background: "#111827",
                    border: "1px solid #334155",
                    borderRadius: "15px",
                    padding: "20px",
                    marginBottom: "30px"
                }}
            >
                <h2>Skills Distribution</h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >
                    <PieChart>

                        <Pie
                            data={skillsData}
                            dataKey="value"
                            nameKey="name"
                            outerRadius={130}
                            label
                        >

                            {skillsData.map((entry, index) => (
                                <Cell
                                    key={index}
                                    fill={
                                        COLORS[
                                        index % COLORS.length
                                        ]
                                    }
                                />
                            ))}

                        </Pie>

                        <Tooltip />

                        <Legend />

                    </PieChart>

                </ResponsiveContainer>

            </div>

            {/* Experience Distribution Chart */}

            <div
                style={{
                    marginTop: "30px",
                    background: "#111827",
                    border: "1px solid #334155",
                    boxShadow: "0px 0px 15px rgba(0,0,0,0.3)",
                    borderRadius: "10px",
                    padding: "20px"
                }}
            >
                <h2>📈 Experience Distribution</h2>

                <ResponsiveContainer
                    width="100%"
                    height={300}
                >
                    <BarChart data={experienceData}>

                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="name" />

                        <YAxis />

                        <Tooltip />

                        <Bar
                            dataKey="value"
                            fill="#3b82f6"
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default AdminDashboard;