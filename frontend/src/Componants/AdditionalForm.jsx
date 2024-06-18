import React, { useEffect, useState } from "react";
import api from "../api";

const AdditionalForm = (props) => {
  const route = props.route;
  const method = props.method;
  const additional = props.add;
  const client = props.client;
  const formTitle = method === "add" ? "أضافة جديدة" : "تعديل أضافة";

  const [additional_type, setAdditional_type] = useState("");
  const [count, setCount] = useState("");
  const [salary_of_one, setSalary_of_one] = useState("");

  useEffect(() => {
    if (method === "edit") {
      setAdditional_type(additional.additional_type);
      setCount(additional.count);
      setSalary_of_one(additional.salary_of_one);
    }
  }, []);

  const formSubmit = () => {
    const additional = {
      additional_type,
      count,
      salary_of_one,
      client,
    };

    if (method === "add") {
      api.post(route, additional).catch((e) => console.log(e.response.data));
    } else {
      api.patch(route, additional).catch((e) => console.log(e.response.data));
    }
  };

  return (
    <form onSubmit={() => formSubmit()}>
      <h1 className="form-head">{formTitle}</h1>
      <label className="form-label">الصنف</label>
      <input
        type="text"
        className="small-form-input"
        value={additional_type}
        onChange={(e) => setAdditional_type(e.target.value)}
        name="additional_type"
      />
      <label className="form-label">العدد</label>
      <input
        type="text"
        className="small-form-input"
        value={count}
        onChange={(e) => setCount(e.target.value)}
        name="count"
      />
      <label className="form-label">سعر الوحده</label>
      <input
        type="text"
        className="small-form-input"
        value={salary_of_one}
        onChange={(e) => setSalary_of_one(e.target.value)}
        name="salary_of_one"
      />
      <button className="form-button">
        {method === "add" ? "حفظ الاضافة" : "تعديل الاضافة"}
      </button>
    </form>
  );
};

export default AdditionalForm;
