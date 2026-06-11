import { NavLink } from "react-router-dom";

function Sidebar() {

    const role = localStorage.getItem("role");

    const activeStyle = {
        backgroundColor: "#2563eb",
        color: "#ffffff",
        padding: "12px 15px",
        borderRadius: "8px",
        fontWeight: "600",
        textDecoration: "none",
        transition: "0.3s"
    };

    const normalStyle = {
        color: "#ffffff",
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
                width: "250px",
                height: "100vh",
                background: "#1e293b",
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

                <h2
                    style={{
                        textAlign: "center",
                        marginBottom: "20px"
                    }}
                >
                    Talent Search
                </h2>

                <hr
                    style={{
                        borderColor: "#475569",
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
                        <NavLink
                            to="/"
                            style={({ isActive }) =>
                                isActive ? activeStyle : normalStyle
                            }
                        >
                            🏠 User Dashboard
                        </NavLink>
                    )}

                    {role === "ADMIN" && (
                        <>
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