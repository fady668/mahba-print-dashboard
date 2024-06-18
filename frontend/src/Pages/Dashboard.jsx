import React, { useState, useEffect } from "react";
import img from "../Images/color-background.jpg";
import logoImg from "../Images/Mahabaprint-img.png";
import imgOne from "../Images/dashboard-icon-images-16.jpg";
import imgTwo from "../Images/clients-icon.jpg";
import imgThree from "../Images/paper-icon.webp";
import imgFour from "../Images/money-icon.webp";
import imgFive from "../Images/additions-icon.webp";
import imgSix from "../Images/kashf-icon-removebg-preview.png";
import imgSeven from "../Images/status-icon.jpg";
import imgEight from "../Images/logout-icon.jpg";
import { Link, Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const Dashboard = () => {
    const [showRightPart, setShowRightPart] = useState(true);
    const isMediumScreen = useMediaQuery({ query: "(max-width: 1199px)" });
    useEffect(() => {
        setShowRightPart(!isMediumScreen);
    }, [isMediumScreen]);
    return (
        <>
            <div className="dashboard">
                <img className="right-bg" src={img} alt="Background Image" />
                {showRightPart && (
                    <>
                        <span className="over-layout main-over-layout"></span>
                        <div className="right-part">
                            <span
                                onClick={() =>
                                    setShowRightPart(!showRightPart)
                                }>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                            <div className="heading-content">
                                <img src={logoImg} alt="Mahaba Print Image" />
                                <p>مطبعة المحبه للطباعة والتوريدات</p>
                            </div>
                            <Link
                                to="/"
                                onClick={() =>
                                    isMediumScreen &&
                                    setShowRightPart(!showRightPart)
                                }
                                className="button">
                                <img src={imgOne} alt="" />
                                الصفحه الرئيسيه
                            </Link>
                            <Link
                                to="/clients"
                                onClick={() =>
                                    isMediumScreen &&
                                    setShowRightPart(!showRightPart)
                                }
                                className="button">
                                <img src={imgTwo} alt="" />
                                العملاء
                            </Link>
                            <Link
                                to="/kashf"
                                onClick={() =>
                                    isMediumScreen &&
                                    setShowRightPart(!showRightPart)
                                }
                                className="button">
                                <img src={imgSix} alt="" />
                                كشف حساب
                            </Link>
                            <Link to={"/logout"} className="button logout-btn">
                                <img src={imgEight} alt="" />
                                تسجيل الخروج
                            </Link>
                        </div>
                    </>
                )}
                <div className="left-part">
                    <i
                        class="fa-solid fa-bars show-r-part"
                        onClick={() => setShowRightPart(!showRightPart)}></i>
                    {/* <h1>مرحباً ()</h1> */}
                    <Outlet />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
