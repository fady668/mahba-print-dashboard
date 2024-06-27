import React, { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../Constants";
import logoImg from "../Images/Mahabaprint-img.png";
import swal from "sweetalert";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPass, setShowPass] = useState(false);
    const navigate = useNavigate();

    const name = method === "login" ? "تسجيل الدخول" : "تسجيل جديد";

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const userForm = {
            username: username,
            password: password,
        };

        try {
            const res = await api.post(`${route}`, userForm);
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                navigate("/login");
            }
        } catch (error) {
            if (error.response) {
                swal({
                    title: "يوجد خطأ في اسم المستخدم او رمز الدخول !",
                    icon: "error",
                });
                console.log(error.response);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="login-page">
                <div className="from-container">
                    {loading && <span className="loading"></span>}
                    <img
                        className="logo-img"
                        src={logoImg}
                        alt="Mahabaprint Img"
                    />
                    <form className="form" onSubmit={handleSubmit}>
                        <h1 className="form-title">{name}</h1>
                        <label htmlFor="username">اسم المستخدم</label>
                        <div className="input-con">
                            <input
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                name="username"
                            />
                            <i className="fa-solid fa-user"></i>
                        </div>
                        <label htmlFor="password">رمز الدخول</label>
                        <div className="input-con">
                            {showPass ? (
                                <i
                                    onClick={() => setShowPass(!showPass)}
                                    className="fa-solid fa-eye-slash eye"></i>
                            ) : (
                                <i
                                    onClick={() => setShowPass(!showPass)}
                                    className="fa-solid fa-eye eye"></i>
                            )}
                            <input
                                type={showPass ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                name="password"
                            />
                            <i className="fa-solid fa-lock"></i>
                        </div>
                        <button type="submit">{name}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Form;
