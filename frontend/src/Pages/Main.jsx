import React, { useEffect, useState } from "react";
import api from "../api";

const Main = () => {
  const [totalCash, setTotalCash] = useState(parseFloat(0));
  const [totalReceivedCash, setTotalReceivedCash] = useState("0");
  const [totalRemainingCash, setTotalRemainingCash] = useState("0");
  const [isPending, setIsPending] = useState(false);
  const [allClients, setAllClients] = useState([]);
  const [clients, setClients] = useState([]);
  const [invoises, setInvoises] = useState([]);
  const [additionals, setAdditionals] = useState([]);
  const [receivedCash, setReceivedCash] = useState([]);

  useEffect(() => {
    getClients();
    getInvoises();
    getReceievedCash();
    getAdditionals();
  }, []);

  const getClients = async () => {
    setIsPending(true);
    const res = await api.get("api/clients/");
    setIsPending(false);
    const returnedData = [...returnSomeData(res.data)];
    setClients(returnedData.slice(1));
    setAllClients(res.data);
    countTotalOfMoney(res.data);
  };

  const getInvoises = async () => {
    setIsPending(true);
    const res = await api.get(`api/invoises/`);
    const data = await res.data;
    setIsPending(false);
    const returnedData = [...returnSomeData(res.data)];
    setInvoises(returnedData.slice(1));
  };

  const getReceievedCash = async () => {
    setIsPending(true);
    const res = await api.get(`/api/receivedcash/`);
    setIsPending(false);
    const returnedData = [...returnSomeData(res.data)];
    setReceivedCash(returnedData.slice(1));
  };

  const getAdditionals = async () => {
    setIsPending(true);
    const res = await api.get(`api/additionals/`);
    const data = await res.data;
    setIsPending(false);
    const returnedData = [...returnSomeData(res.data)];
    setAdditionals(returnedData.slice(1));
  };

  const countTotalOfMoney = (data) => {
    let counter = 0;
    let totReceivedCash = 0;
    let totReaminingCash = 0;
    for (let x = 0; x < data.length; x++) {
      const clientTotalCash = parseFloat(data[x].totalCash);
      const clientReceivedCash = parseFloat(data[x].receivedCash);
      const total = clientTotalCash + clientReceivedCash;
      totReceivedCash += clientReceivedCash;
      totReaminingCash += clientTotalCash;
      counter += total;
      setTotalReceivedCash(totReceivedCash);
      setTotalRemainingCash(totReaminingCash);
      setTotalCash(counter);
    }
  };

  const returnSomeData = (data) => {
    let list = [];
    if (data) {
      if (data.length >= 3) {
        for (let x = 0; x <= 3; x++) {
          let len = data.length;
          list.push(data[len - x]);
        }
      } else if (data.length < 3) {
        for (let x = 0; x <= data.length; x++) {
          let len = data.length;
          list.push(data[len - x]);
        }
      }
      return list;
    }
  };

  return (
    <div className="main-page">
      <h1 className="page-title">الصفحه الرئيسيه</h1>
      {totalCash === 0 && (
        <span className="new-user-mess">
          لا يوجد تعاملات ماليه علي هذا الحساب
        </span>
      )}
      <div className="grid">
        <div className="user-total-cash">
          <h2>اجمالي حساب التعاملات</h2>
          <span>{totalCash}</span>
        </div>
        <div className="cash-sec">
          <div className="total-received cash">
            <h3>اجمالي النقديه المستلمه</h3>
            <span className="value">{totalReceivedCash}</span>
          </div>
          <div className="total-remaining cash">
            <h3>اجمالي النقديه المتبقيه</h3>
            <span className="value">{totalRemainingCash}</span>
          </div>
        </div>
        <div className="invoises sec">
          <h2>اخر الفواتير المضافه</h2>
          <table className="table">
            <thead>
              <tr>
                <td>العميل</td>
                <td>الفاتوره</td>
                <td>الحساب</td>
              </tr>
            </thead>
            <tbody>
              {invoises.length !== 0 ? (
                invoises.map((invoise) => {
                  const client = allClients.find(
                    (c) => c.id === invoise.client
                  );
                  return (
                    <tr key={invoise.id}>
                      <td>{client && client.name}</td>
                      <td>{invoise.name}</td>
                      <td>{invoise.total_cash}</td>
                    </tr>
                  );
                })
              ) : isPending ? (
                <tr>
                  <td colSpan="3">
                    <span className="loading table-loading main-loading"></span>
                  </td>
                </tr>
              ) : (
                <tr key={0} className="notfound">
                  <td colSpan="3">لا يوجد فواتير مضافة</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="received-cash sec">
          <h2>اخر النقديه المستلمه</h2>
          <table className="table">
            <thead>
              <tr>
                <td>العميل</td>
                <td>قيمة الدفعة</td>
                <td>طريقة الدفع</td>
              </tr>
            </thead>
            <tbody>
              {receivedCash.length !== 0 ? (
                receivedCash.map((cash) => {
                  const client = allClients.find((c) => c.id === cash.client);
                  return (
                    <tr key={cash.id}>
                      <td>{client && client.name}</td>
                      <td>{cash.received_value}</td>
                      <td>{cash.push_way}</td>
                    </tr>
                  );
                })
              ) : isPending ? (
                <tr>
                  <td colSpan="3">
                    <span className="loading table-loading main-loading"></span>
                  </td>
                </tr>
              ) : (
                <tr key={0} className="notfound">
                  <td colSpan="3">لا يوجد دفعات قديمه</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="clients sec">
          <h2>العملاء المضافه مأخراً</h2>
          <table className="table">
            <thead>
              <tr>
                <td>اسم العميل</td>
                <td>رقم الهاتف</td>
              </tr>
            </thead>
            <tbody>
              {clients.length !== 0 ? (
                clients.map((client) => {
                  const phone = client.phone
                    ? client.phone.length != 0
                    : "----";
                  return (
                    <tr key={client.id}>
                      <td>{client.name}</td>
                      <td>{phone}</td>
                    </tr>
                  );
                })
              ) : isPending ? (
                <tr>
                  <td colSpan="3">
                    <span className="loading table-loading main-loading"></span>
                  </td>
                </tr>
              ) : (
                <tr key={0} className="notfound">
                  <td colSpan="3">لا يوجد عملاء مضافة</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="additionals sec">
          <h2>اخر الاضافات الخارجيه</h2>
          <table className="table">
            <thead>
              <tr>
                <td>العميل</td>
                <td>قيمة الدفعة</td>
                <td>طريقة الدفع</td>
              </tr>
            </thead>
            <tbody>
              {additionals.length !== 0 ? (
                additionals.map((add) => {
                  const client = allClients.find((c) => c.id === add.client);
                  return (
                    <tr key={add.id}>
                      <td>{client && client.name}</td>
                      <td>{add.additional_type}</td>
                      <td>{add.total}</td>
                    </tr>
                  );
                })
              ) : isPending ? (
                <tr>
                  <td colSpan="3">
                    <span className="loading table-loading"></span>
                  </td>
                </tr>
              ) : (
                <tr key={0} className="notfound">
                  <td colSpan="3">لا يوجد اضافات خارجيه</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Main;
