import { useEffect, useState } from "react";
import axios from "axios";

function Reports() {

    const [totalCandidates, setTotalCandidates] = useState(0);
    const [averageSalary, setAverageSalary] = useState(0);
    const [highestSalary, setHighestSalary] = useState(0);
    const [lowestSalary, setLowestSalary] = useState(0);
    const [locations, setLocations] = useState(0);

    useEffect(() => {
        loadReports();
    }, []);

    const loadReports = async () => {

        try {

            const totalResponse = await axios.get(
                "http://localhost:9090/api/candidates/report/total"
            );

            const salaryResponse = await axios.get(
                "http://localhost:9090/api/candidates/report/average-salary"
            );
            const highestResponse = await axios.get(
                "http://localhost:9090/api/candidates/report/highest-salary"
            );

            const lowestResponse = await axios.get(
                "http://localhost:9090/api/candidates/report/lowest-salary"
            );

            const locationResponse = await axios.get(
                "http://localhost:9090/api/candidates/report/location-count"
            );
            setTotalCandidates(totalResponse.data);
            setAverageSalary(Math.round(salaryResponse.data));
            setHighestSalary(highestResponse.data);
            setLowestSalary(lowestResponse.data);
            setLocations(locationResponse.data);

        } catch (error) {

            console.error(error);

        }
    };
    const cardStyle = {
        width: "220px",
        padding: "20px",
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: "12px",
        textAlign: "center"
    };
    return (
        <div
            style={{
                width: "100%",
                maxWidth: "1400px",
                margin: "0 auto"
            }}
        >

            <h1
                style={{
                    color: "#60a5fa",
                    marginBottom: "30px"
                }}
            >
                📊 Reports Dashboard
            </h1>

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap"
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
                    <h3>📈 Highest Salary</h3>
                    <h2>
                        ₹ {highestSalary.toLocaleString()}
                    </h2>
                </div>

                <div style={cardStyle}>
                    <h3>📉 Lowest Salary</h3>
                    <h2>
                        ₹ {lowestSalary.toLocaleString()}
                    </h2>
                </div>

                <div style={cardStyle}>
                    <h3>📍 Locations</h3>
                    <h2>{locations}</h2>
                </div>

            </div>

        </div>
    );
}

export default Reports;