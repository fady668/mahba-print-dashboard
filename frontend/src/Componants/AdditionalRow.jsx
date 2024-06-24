import React from "react";

const AdditionalRow = (props) => {
  const additional = props.additional;
  const done = additional.done ? "تم الدفع" : "لم يتم الدفع";
  return (
    <>
      <td></td>
      <td>{additional.additional_type}</td>
      <td>{additional.count}</td>
      <td>{parseFloat(additional.salary_of_one)}</td>
      <td>{parseFloat(additional.total)}</td>
      <td>{done}</td>
    </>
  );
};

export default AdditionalRow;
