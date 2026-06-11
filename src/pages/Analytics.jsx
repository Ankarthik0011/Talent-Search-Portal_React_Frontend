import { useEffect, useState } from "react";
import axios from "axios";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    ResponsiveContainer
} from "recharts";

function Analytics() {

    const [skillsData, setSkillsData] = useState([]);
    const [locationData, setLocationData] = useState([]);

    useEffect(() => {
        loadAnalytics();
    }, []);

    const loadAnalytics = async () => {

        try {

            const skillsResponse =
                await axios.get(
                    "http://localhost:9090/api/candidates/report/skills"
                );

            const locationResponse =
                await axios.get(
                    "http://localhost:9090/api/candidates/report/locations"
                );

            const skillsChartData =
                Object.entries(skillsResponse.data)
                    .map(([name, value]) => ({
                        name,
                        value
                    }));

            const locationChartData =
                Object.entries(locationResponse.data)
                    .map(([name, value]) => ({
                        name,
                        value
                    }));

            setSkillsData(skillsChartData);
            setLocationData(locationChartData);

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

    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto"
            }}
        >

            <h1>
                📈 Analytics Dashboard 📉
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "30px",
                    flexWrap: "wrap"
                }}
            >

                <div
                    style={{
                        width: "500px",
                        height: "450px",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "20px"
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
                                outerRadius={120}
                                label
                            >
                                {skillsData.map(
                                    (entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }
                                        />
                                    )
                                )}
                            </Pie>

                            <Tooltip />
                            <Legend />

                        </PieChart>
                    </ResponsiveContainer>

                </div>

                <div
                    style={{
                        width: "500px",
                        height: "450px",
                        border: "1px solid white",
                        borderRadius: "10px",
                        padding: "20px"
                    }}
                >
                    <h2>Location Distribution</h2>

                    <ResponsiveContainer
                        width="100%"
                        height={350}
                    >
                        <PieChart>

                            <Pie
                                data={locationData}
                                dataKey="value"
                                nameKey="name"
                                outerRadius={120}
                                label
                            >
                                {locationData.map(
                                    (entry, index) => (
                                        <Cell
                                            key={index}
                                            fill={
                                                COLORS[
                                                index %
                                                COLORS.length
                                                ]
                                            }
                                        />
                                    )
                                )}
                            </Pie>

                            <Tooltip />
                            <Legend />

                        </PieChart>
                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

export default Analytics;