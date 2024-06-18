import { React, useState, useEffect } from "react";
import api from "../api";
import img from "../Images/search-icon.jpg";
import ClientRow from "../Componants/ClientRow";
import ClientForm from "../Componants/ClientForm";
import paperImg from "../Images/details.png";
import invoisesImg from "../Images/paper-icon.webp";
import addsImg from "../Images/additions-icon.webp";
import receivedcashImg from "../Images/money-icon.webp";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import Invoises from "./Invoises";
import ReceivedCash from "./ReceivedCash";
import Additionals from "./Additionals";

const Clients = () => {
  // Variables
  const [search, setSearch] = useState("");
  const [dropDownOne, setDropDownOne] = useState(true);
  const [clients, setClients] = useState([]);
  const [isPending, setIsPending] = useState(false);
  const [newClient, setNewClient] = useState(false);
  const [showUpdateClient, setShowUpdateClient] = useState(false);
  const [updateClient, setUpdateClient] = useState({});
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedClient, setSelectedClient] = useState({});
  const navigate = useNavigate();
  // Functions

  const showNewClinet = () => {
    setNewClient(!newClient);
  };

  useEffect(() => {
    getClients();
  }, []);

  const toggleDropDown = (clientId) => {
    setSelectedRow(clientId === selectedRow ? null : clientId);
  };

  const getClients = async () => {
    setIsPending(true);
    const res = await api.get("api/clients");
    setIsPending(false);
    setClients(res.data);
  };

  const clientClicked = (client) => {
    setSearch(client.name);
    setDropDownOne(false);
    searchClient([client]);
  };

  const searchClient = (value) => {
    setSearch("");
    setDropDownOne(true);
    if (typeof value === "string") {
      if (clients.find((obj) => obj.name === value)) {
        const searchedClient = clients.find((obj) => obj.name === value);
        setClients([searchedClient]);
      } else {
        swal({
          title: "لا يوجد عميل بهذا الاسم",
          icon: "error",
        });
      }
    } else {
      setClients(value);
    }
  };

  const ClientUpdate = (client) => {
    setShowUpdateClient(!showUpdateClient);
    setUpdateClient(client);
  };

  const deleteAlert = (client) => {
    swal({
      title: "هل انت متأكد من مسح هذا العميل ؟",
      text: `(${client.name})`,
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        swal("تم مسح العميل بنجاح", {
          icon: "success",
        });
        deleteClient(client.id);
      } else {
        swal("لم يتم مسح العميل!");
      }
    });
  };

  const deleteClient = (id) => {
    api.delete(`/api/clients/delete/${id}`);
    setClients(clients.filter((clinet) => clinet.id !== id));
  };

  const getTotalMoney = () => {
    if (clients) {
      let totalMoney = 0.0;
      for (let x = 0; x < clients.length; x++) {
        totalMoney += parseFloat(clients[x].totalCash);
      }
      return totalMoney;
    }
  };
  const getTotalReceivedMoney = () => {
    if (clients) {
      let totalReceivedMoney = 0.0;
      for (let x = 0; x < clients.length; x++) {
        totalReceivedMoney += parseFloat(clients[x].receivedCash);
      }
      return totalReceivedMoney;
    }
  };

  const openInvoisePage = (id) => {
    navigate(`/invoises/${id}`);
  };
  const openReceivedCashPage = (id) => {
    navigate(`/receivedcash/${id}`);
  };
  const openAddtionalsPage = (id) => {
    navigate(`/additionals/${id}`);
  };

  return (
    <div className="clients-page">
      <h1 className="page-title">العملاء</h1>
      <div className="search-bar">
        <img onClick={() => searchClient(search)} src={img} alt="" />
        <input
          type="text"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="أبحث عن عميل ..."
        />
        {search && dropDownOne && (
          <div className="search-drop-menu">
            {clients
              .filter((client) => {
                const value = search.toLowerCase();
                const c = client.name.toLowerCase();

                return value && c.startsWith(value) && c;
              })
              .map((client) => (
                <span onClick={() => clientClicked(client)} key={client.id}>
                  {client.name}
                </span>
              ))}
          </div>
        )}
      </div>
      <div className="page-content">
        <div>
          <button onClick={showNewClinet} className="add-btn">
            أضافة عميل جديد
          </button>
          {newClient && (
            <>
              <span className="over-layout"></span>
              <div className="clinet-form focused">
                <span onClick={showNewClinet}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
                <ClientForm route="/api/clients/" method="addClient" />
              </div>
            </>
          )}
          {showUpdateClient && (
            <>
              <span className="over-layout"></span>
              <div className="clinet-form focused">
                <span onClick={() => setShowUpdateClient(false)}>
                  <i className="fa-solid fa-xmark"></i>
                </span>
                <ClientForm
                  route={`/api/clients/update/${updateClient.id}`}
                  method={"editClient"}
                  clientName={updateClient.name}
                  clientPhone={updateClient.phone}
                />
              </div>
            </>
          )}
          {selectedRow === selectedClient.id && (
            <>
              <span className="over-layout"></span>
              <div key={selectedClient.id} className="drop-menu focused">
                <p onClick={() => openInvoisePage(selectedClient.id)}>
                  <img src={invoisesImg} alt="" />
                  الفواتير
                </p>
                <p onClick={() => openReceivedCashPage(selectedClient.id)}>
                  <img src={receivedcashImg} alt="" />
                  النقديه المستلمه
                </p>
                <p onClick={() => openAddtionalsPage(selectedClient.id)}>
                  <img src={addsImg} alt="" />
                  الاضافات الخارجيه
                </p>
              </div>
            </>
          )}

          <div className="total-cash">
            <span>اجمالي حساب العملاء</span>
            <span className="heighlight-text">{getTotalMoney()}</span>
          </div>
          <div className="total-received-cash">
            <span>اجمالي النقديه المدفوعة</span>
            <span className="heighlight-text">{getTotalReceivedMoney()}</span>
          </div>
        </div>
        <table className="table">
          <thead>
            <tr>
              <td>اسم العميل</td>
              <td>هاتف العميل</td>
              <td>النقديه المدفوعه</td>
              <td>اجمالي الحساب</td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {clients.length != 0 ? (
              clients.map((client) => (
                <tr key={client.id}>
                  <ClientRow client={client} />
                  <td>
                    <img
                      onClick={() => {
                        setSelectedClient(client);
                        toggleDropDown(client.id);
                      }}
                      src={paperImg}
                      alt=""
                    />
                    <i
                      onClick={() => ClientUpdate(client)}
                      className="fa-solid fa-pen-to-square"
                    ></i>
                    <i
                      onClick={() => deleteAlert(client)}
                      className="fa-solid fa-trash"
                    ></i>
                  </td>
                </tr>
              ))
            ) : isPending ? (
              <span className="loading table-loading"></span>
            ) : (
              <tr key={0} className="notfound">
                <td>لا يوجد عملاء مضافة</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Clients;
