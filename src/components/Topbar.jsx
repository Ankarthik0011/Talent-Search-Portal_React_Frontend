import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Topbar() {
    const [darkMode, setDarkMode] = useState(true);

    const username =
        localStorage.getItem("username");

    const role =
        localStorage.getItem("role");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();

    return (
        <div
            style={{
                height: "70px",
                background: "#111827",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 25px",
                borderBottom: "1px solid #334155"
            }}
        >

            <div>
                <h2
                    style={{
                        margin: 0,
                        color: "white"
                    }}
                >
                    Talent Search Portal
                </h2>
            </div>

            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px"
                }}
            >
                <input
                    type="text"
                    placeholder="Search candidates..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            navigate(`/candidates?search=${search}`);
                        }
                    }}
                    style={{
                        width: "300px",
                        padding: "10px 15px",
                        borderRadius: "10px",
                        border: "1px solid #334155",
                        background: "#1e293b",
                        color: "white",
                        outline: "none"
                    }}
                />

                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px"
                    }}
                >

                    <FaUserCircle
                        size={30}
                        color="#3b82f6"
                    />

                    <div>

                        <div
                            style={{
                                color: "white",
                                fontWeight: "bold"
                            }}
                        >

                        </div>

                        <div
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                marginTop: "4px"
                            }}
                        >

                            <span
                                style={{
                                    fontSize: "11px",
                                    background:
                                        role === "ADMIN"
                                            ? "#14532d"
                                            : "#1e3a8a",
                                    color: "white",
                                    padding: "4px 8px",
                                    borderRadius: "20px",
                                    fontWeight: "bold"
                                }}
                            >
                                {role}
                            </span>

                            <div
                                style={{
                                    width: "50px",
                                    height: "22px",
                                    borderRadius: "20px",
                                    background:
                                        role === "ADMIN"
                                            ? "#22c55e"
                                            : "#3b82f6",
                                    position: "relative"
                                }}
                            >

                                <div
                                    style={{
                                        width: "18px",
                                        height: "18px",
                                        background: "white",
                                        borderRadius: "50%",
                                        position: "absolute",
                                        top: "2px",
                                        left:
                                            role === "ADMIN"
                                                ? "2px"
                                                : "30px"
                                    }}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Topbar;