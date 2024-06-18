import React, { useEffect, useState } from "react";
import api from "../api";
import swal from "sweetalert";

const ClientForm = ({ route, method, clientName, clientPhone }) => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const formTitle =
        method === "addClient" ? "أضافة عميل" : "تعديل بيانات عميل";

    useEffect(() => {
        if (method === "editClient") {
            setName(clientName);
            if (clientPhone === "----------") {
                setPhone("");
            } else {
                setPhone(clientPhone);
            }
        }
    }, []);

    const formSubmit = () => {
        if (method === "addClient") {
            api.post(route, { name, phone });
        } else if (method === "editClient") {
            api.patch(route, { name, phone });
        }
    };

    return (
        <form onSubmit={formSubmit}>
            <h1 className="form-head">{formTitle}</h1>
            <label className="form-label">أسم العميل</label>
            <input
                className="small-form-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                required
            />
            <label className="form-label">هاتف العميل</label>
            <input
                className="small-form-input"
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                name="phone"
            />
            <button type="submit" className="form-button">
                {method === "addClient" ? "أضافة" : "تعديل"}
            </button>
        </form>
    );
};

export default ClientForm;
