import React, { useEffect, useState, useTransition } from "react";
import { useParams } from "react-router-dom";
import api from "../api";
import img from "../Images/search-icon.jpg";
import InvoiseRow from "../Componants/InvoiseRow";
import SalariesForm from "../Componants/SalariesForm";
import InvoiseForm from "../Componants/InvoiseForm";
import swal from "sweetalert";

const Invoises = () => {
  const clientId = useParams().id;
  const [client, setClient] = useState({});
  const [clientTotalCash, setClientTotalCash] = useState(0);
  const [clientInvoises, setClientInvoises] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [invoiseSals, setInvoiseSals] = useState([]);
  const [sals, setSals] = useState([]);
  const [deletedInvoiseSalsId, setDeletedInvoiseSalsId] = useState("");
  const [search, setSearch] = useState("");
  const [dropDownOne, setDropDownOne] = useState(true);
  const [showSal, setShowSal] = useState(false);
  const [showInvoiseForm, setShowInvoiseForm] = useState(false);
  const [showEditInvoiseForm, setShowEditInvoiseForm] = useState(false);
  const [updatedInvoise, setUpdatedInvoise] = useState({});

  useEffect(() => {
    getClient();
    getInvoisesSals();
    getSals();
    getClientInvoises();
    setClientTotalCash(client["totalCash"]);
  }, []);

  useEffect(() => {
    if (showInvoiseForm === true) {
      if (sals.length === 0) {
        showSalsMess();
      }
    }
  }, [showInvoiseForm]);

  const getClient = async () => {
    const res = await api.get(`api/clients/${clientId}`);
    setClient(res.data[0]);
  };
  const getClientInvoises = async () => {
    setIsPending(true);
    const res = await api.get(`api/invoises/${clientId}`);
    const data = await res.data;
    setIsPending(false);
    setClientInvoises(data);
  };
  const getInvoisesSals = async () => {
    const res = await api.get("api/invoisesalaries/");
    const data = await res.data;
    setInvoiseSals(data);
  };
  const getSals = async () => {
    const res = await api.get("api/salaries/");
    const data = await res.data;
    console.log(data);
    setSals(data);
  };
  const showSalsMess = async () => {
    swal({
      title: "يجب وضع الاسعار قبل اضافه الفواتير !",
      icon: "warning",
    });
  };

  const invoiseClicked = (invoise) => {
    setSearch(invoise.name);
    setDropDownOne(false);
    searchInvoise([invoise]);
  };

  const searchInvoise = (value) => {
    setSearch("");
    setDropDownOne(true);
    if (typeof value === "string") {
      if (clientInvoises.find((obj) => obj.name === value)) {
        const searchedInvoise = clientInvoises.find(
          (obj) => obj.name === value
        );
        setClientInvoises([searchedInvoise]);
      } else {
        swal({
          title: "لا يوجد فاتوره بهذا الاسم",
          icon: "error",
        });
      }
    } else {
      setClientInvoises(value);
    }
  };

  const updateInvoise = (invoise) => {
    setUpdatedInvoise(invoise);
    setShowEditInvoiseForm(true);
  };

  const deleteAlert = (invoise) => {
    swal({
      title: "هل انت متأكد من مسح هذه الفاتوره ؟",
      text: `(${invoise.name})`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteInvoise(invoise);
      } else {
        swal("لم يتم مسح الفاتوره!");
      }
    });
  };

  const deleteInvoise = (invoise) => {
    invoiseSals.filter((sal) => {
      sal.invoise === invoise.name ? setDeletedInvoiseSalsId(sal.id) : "";
    });
    api.delete(`/api/invoises/delete/${invoise.id}`);
    api.delete(`/api/invoisesalaries/${deletedInvoiseSalsId}`);
    window.location.reload();
  };

  return (
    <div className="invoises-page">
      <h1 className="page-title">الفواتير</h1>
      <div className="search-bar">
        <img onClick={() => searchInvoise(search)} src={img} alt="" />
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="أبحث عن فاتورة ..."
        />
        {search && dropDownOne && (
          <div className="search-drop-menu">
            {clientInvoises
              .filter((invoise) => {
                const value = search.toLowerCase();
                const c = invoise.name.toLowerCase();

                return value && c.startsWith(value) && c;
              })
              .map((invoise) => (
                <span onClick={() => invoiseClicked(invoise)} key={invoise.id}>
                  {invoise.name}
                </span>
              ))}
          </div>
        )}
      </div>
      <div className="page-content">
        <div onClick={() => setShowInvoiseForm(true)} className="add-btn">
          اضافة فاتوره جديده
        </div>
        {showInvoiseForm && (
          <>
            <span className="over-layout"></span>
            <div className="invoise-form focused">
              <span onClick={() => setShowInvoiseForm(false)}>
                <i className="fa-solid fa-xmark"></i>
              </span>
              <InvoiseForm
                route={`/api/invoises/`}
                method="add"
                client={clientId}
              />
            </div>
          </>
        )}
        {showEditInvoiseForm && (
          <>
            <span className="over-layout"></span>
            <div className="invoise-form focused">
              <span onClick={() => setShowEditInvoiseForm(false)}>
                <i className="fa-solid fa-xmark"></i>
              </span>
              <InvoiseForm
                route={`/api/invoises/update/${updatedInvoise.id}`}
                slasRoute={`/api/invoisesalaries/${invoiseSals.id}`}
                method="edit"
                client={clientId}
                invoise={updatedInvoise}
              />
            </div>
          </>
        )}
        <div className="sal-btn" onClick={() => setShowSal(!showSal)}>
          الاسعار
        </div>
        {showSal && (
          <>
            <span className="over-layout"></span>
            <div className="sal-form focused">
              <span onClick={() => setShowSal(!showSal)}>
                <i className="fa-solid fa-xmark"></i>
              </span>
              <SalariesForm route={"api/salaries/"} />
            </div>
          </>
        )}
        <span className="heighlight-heading"> {client.name} </span>
        <div className="total-cash not-border">
          <span>اجمالي حساب العميل</span>
          <span className="heighlight-text">{client.totalCash}</span>
        </div>
        <table className="table">
          <thead>
            <tr>
              <td>رقم الفاتوره</td>
              <td>اسم الفاتوره</td>
              <td>التاريخ</td>
              <td>الحساب</td>
              <td>الدفع</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {clientInvoises.length != 0 ? (
              clientInvoises.map((invoise) => (
                <tr key={invoise.id} className="sorted-row">
                  <InvoiseRow invoise={invoise} />
                  <td>
                    <i
                      onClick={() => updateInvoise(invoise)}
                      className="fa-solid fa-pen-to-square"
                    ></i>
                    <i
                      onClick={() => deleteAlert(invoise)}
                      className="fa-solid fa-trash"
                    ></i>
                  </td>
                </tr>
              ))
            ) : isPending ? (
              <span className="loading table-loading"></span>
            ) : (
              <tr key={0} className="notfound">
                <td>لا يوجد فواتير مضافة</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Invoises;
