import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        username: "",
        password: ""
    });

    const handleChange = (e) => {

        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        });
    };

    const login = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                "http://localhost:9090/api/auth/login",
                loginData
            );

            localStorage.setItem(
                "role",
                response.data.role
            );

            localStorage.setItem(
                "username",
                response.data.username
            );

            navigate("/home");

            window.location.reload();

        } catch (error) {

            console.error(error);

            alert("Invalid Username or Password");
        }
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                background:
                    "linear-gradient(135deg,#0f172a,#1e293b)"
            }}
        >

            <form
                onSubmit={login}
                style={{
                    width: "400px",
                    padding: "40px",
                    background: "#111827",
                    border: "1px solid #334155",
                    borderRadius: "20px",
                    boxShadow:
                        "0px 0px 20px rgba(0,0,0,0.4)"
                }}
            >

                <div
                    style={{
                        textAlign: "center",
                        marginBottom: "25px"
                    }}
                >
                    <div
                        style={{
                            fontSize: "50px"
                        }}
                    >
                        🔷
                    </div>

                    <h2
                        style={{
                            color: "#60a5fa",
                            marginBottom: "5px"
                        }}
                    >
                        Talent Search Portal
                    </h2>

                    <p
                        style={{
                            color: "#94a3b8"
                        }}
                    >
                        AI Powered Recruitment Platform
                    </p>
                </div>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={loginData.username}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        background: "#1e293b",
                        color: "white",
                        border: "1px solid #334155",
                        borderRadius: "8px"
                    }}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginBottom: "15px",
                        background: "#1e293b",
                        color: "white",
                        border: "1px solid #334155",
                        borderRadius: "8px"
                    }}
                />

                <button
                    type="submit"
                    style={{
                        width: "100%",
                        padding: "12px",
                        background:
                            "linear-gradient(135deg,#2563eb,#7c3aed)",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "16px"
                    }}
                >
                    Login
                </button>

            </form>

        </div>
    );
}

export default Login;