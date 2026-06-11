import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Sidebar() {

    const [role, setRole] = useState(
        localStorage.getItem("role")
    );

    useEffect(() => {
        setRole(localStorage.getItem("role"));
    }, []);

    const activeStyle = {
        backgroundColor: "#2563eb",
        boxShadow: "0 0 15px rgba(37,99,235,0.5)",
        color: "#ffffff",
        padding: "12px 15px",
        borderRadius: "8px",
        fontWeight: "600",
        textDecoration: "none",
        transition: "0.3s"
    };

    const normalStyle = {
        color: "#ffffff",
        cursor: "pointer",
        padding: "12px 15px",
        borderRadius: "8px",
        textDecoration: "none",
        transition: "0.3s"
    };

    const logout = () => {
        localStorage.clear();
        window.location.href = "/login";
    };

    return (
        <div
            style={{
                width: "220px",
                height: "100vh",
                background:
                    "linear-gradient(180deg, #111827 0%, #1e293b 100%)",
                color: "white",
                position: "fixed",
                left: 0,
                top: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: "20px",
                boxSizing: "border-box",
                borderRight: "1px solid #334155"
            }}
        >
            {/* Top Section */}
            <div>

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "25px"
                    }}
                >

                    <div
                        style={{
                            fontSize: "40px",
                            marginBottom: "8px"
                        }}
                    >
                        🔷
                    </div>

                    <h2
                        style={{
                            margin: "0",
                            color: "#60a5fa",
                            fontWeight: "700"
                        }}
                    >
                        TalentSearch
                    </h2>

                    <p
                        style={{
                            margin: "5px 0 0 0",
                            color: "#94a3b8",
                            fontSize: "12px"
                        }}
                    >
                        Recruitment Platform
                    </p>

                </div>

                <hr
                    style={{
                        borderColor: "#334155",
                        marginBottom: "20px"
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >

                    <NavLink
                        to="/candidates"
                        style={({ isActive }) =>
                            isActive ? activeStyle : normalStyle
                        }
                    >
                        👥 Candidates
                    </NavLink>

                    {role === "USER" && (
                        <>
                            <NavLink
                                to="/home"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : normalStyle
                                }
                            >
                                🏠 Home
                            </NavLink>

                            <NavLink
                                to="/"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : normalStyle
                                }
                            >
                                👤 User Dashboard
                            </NavLink>
                        </>
                    )}

                    {role === "ADMIN" && (
                        <>
                            <NavLink
                                to="/home"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : normalStyle
                                }
                            >
                                🏠 Home
                            </NavLink>
                            <NavLink
                                to="/admin"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : normalStyle
                                }
                            >
                                👨‍💼 Admin Dashboard
                            </NavLink>

                            <NavLink
                                to="/add-candidate"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : normalStyle
                                }
                            >
                                ➕ Add Candidate
                            </NavLink>

                            <NavLink
                                to="/reports"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : normalStyle
                                }
                            >
                                📊 Reports
                            </NavLink>

                            <NavLink
                                to="/analytics"
                                style={({ isActive }) =>
                                    isActive ? activeStyle : normalStyle
                                }
                            >
                                📈 Analytics
                            </NavLink>
                        </>
                    )}

                </div>

            </div>

            {/* Bottom Section */}
            <button
                onClick={logout}
                style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                    border: "none",
                    padding: "12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "15px",
                    fontWeight: "600"
                }}
            >
                🚪 Logout
            </button>

        </div>
    );
}

export default Sidebar;