import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import AdditionalForm from "../Componants/AdditionalForm";
import AdditionalRow from "../Componants/AdditionalRow";
import swal from "sweetalert";

const Additionals = () => {
    const clientId = useParams().id;
    const [client, setClient] = useState({});
    const [additionals, setAdditionals] = useState([]);
    const [isPending, setIsPending] = useState(false);
    const [showNewAdditional, setShowNewAdditional] = useState(false);
    const [showUpdateAdditional, setShowUpdateAdditional] = useState(false);
    const [updatedAdditional, setUpdatedAdditional] = useState(false);

    useEffect(() => {
        getClient();
        getAdditionals();
    }, []);

    const getClient = async () => {
        const res = await api.get(`api/clients/${clientId}`);
        setClient(res.data[0]);
    };
    const getAdditionals = async () => {
        setIsPending(true);
        const res = await api.get(`api/additionals/byclientid/${clientId}`);
        const data = await res.data;
        setIsPending(false);
        setAdditionals(data);
    };

    const updateAdditional = (updatedAdd) => {
        setShowUpdateAdditional(true);
        setUpdatedAdditional(updatedAdd);
    };

    const deleteMess = (deletedAdd) => {
        swal({
            title: "هل انت متأكد من مسح الاضافة",
            icon: "warning",
            buttons: true,
        }).then((willDelete) => {
            if (willDelete) {
                api.delete(`/api/additionals/${deletedAdd.id}`).catch((e) =>
                    console.log(e.response.data)
                );
                window.location.reload();
            } else {
                swal("لم يتم مسح الاضافة");
            }
        });
    };

    return (
        <div className="additionals-page">
            <h1 className="page-title">الاضافات الخارجيه</h1>
            <div className="page-content">
                <button
                    onClick={() => setShowNewAdditional(true)}
                    className="add-btn">
                    أضافه جديدة
                </button>
                {showNewAdditional && (
                    <>
                        <span className="over-layout"></span>
                        <div className="invoise-form focused">
                            <span onClick={() => setShowNewAdditional(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                            <AdditionalForm
                                route={`/api/additionals/`}
                                method="add"
                                client={clientId}
                            />
                        </div>
                    </>
                )}
                {showUpdateAdditional && (
                    <>
                        <span className="over-layout"></span>
                        <div className="invoise-form focused">
                            <span
                                onClick={() => setShowUpdateAdditional(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </span>
                            <AdditionalForm
                                route={`/api/additionals/${updatedAdditional.id}`}
                                method="edit"
                                add={updatedAdditional}
                                client={clientId}
                            />
                        </div>
                    </>
                )}
                <span className="heighlight-heading">{client.name}</span>
                <table className="table">
                    <thead>
                        <tr>
                            <td>الترتيب</td>
                            <td>الصنف</td>
                            <td>العدد</td>
                            <td>سعر الوحده</td>
                            <td>الاجمالي</td>
                            <td>الدفع</td>
                            <td></td>
                        </tr>
                    </thead>
                    <tbody>
                        {additionals.length != 0 ? (
                            additionals.map((add) => (
                                <tr key={add.id} className="sorted-row">
                                    <AdditionalRow additional={add} />
                                    <td>
                                        <i
                                            onClick={() =>
                                                updateAdditional(add)
                                            }
                                            className="fa-solid fa-pen-to-square"></i>
                                        <i
                                            onClick={() => deleteMess(add)}
                                            className="fa-solid fa-trash"></i>
                                    </td>
                                </tr>
                            ))
                        ) : isPending ? (
                            <span className="loading table-loading"></span>
                        ) : (
                            <tr key={0} className="notfound">
                                <td>لا يوجد أضافات قديمه</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Additionals;
