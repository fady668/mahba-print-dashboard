import React, { useEffect, useState } from "react";
import api from "../api";

const ReceivedCashFrom = (props) => {
  const route = props.route;
  const method = props.method;
  const client = props.client;
  const cash = props.cash;
  const formTitle = method === "add" ? "دفعة جديدة" : "تعديل دفعة";

  const [received_value, setReceived_value] = useState("");
  const [push_way, setPush_way] = useState("");

  useEffect(() => {
    if (method === "edit") {
      setReceived_value(cash.received_value);
      setPush_way(cash.push_way);
    }
  }, []);

  const formSubmit = () => {
    const receivedCash = {
      received_value,
      push_way,
      client,
    };
    if (method === "add") {
      api.post(route, receivedCash).catch((e) => console.log(e.response.data));
    } else {
      api.patch(route, receivedCash).catch((e) => console.log(e.response.data));
    }
  };

  return (
    <form onSubmit={() => formSubmit()}>
      <h1 className="form-head">{formTitle}</h1>
      <label className="form-label">النقديه</label>
      <input
        className="small-form-input"
        type="text"
        value={received_value}
        onChange={(e) => setReceived_value(e.target.value)}
        name="Received Value"
        required
      />
      <label className="form-label">طريقة الدفع</label>
      <select
        className="small-form-input"
        value={push_way}
        onChange={(e) => setPush_way(e.target.value)}
        name="Push Way"
      >
        <option value="" selected></option>
        <option value="كاش">كاش</option>
        <option value="محفظه الكترونيه">محفظه الكترونيه</option>
      </select>
      {method === "add" ? (
        <button type="submit" className="form-button">
          حفظ الدفعة
        </button>
      ) : (
        <button type="submit" className="form-button">
          تعديل الدفعة
        </button>
      )}
    </form>
  );
};

export default ReceivedCashFrom;
