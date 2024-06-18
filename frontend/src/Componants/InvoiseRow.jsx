import React from "react";

const InvoiseRow = (props) => {
  const invoise = props.invoise;
  const date = invoise.date.slice(0, 10).replace("-", "/").replace("-", "/");
  const done = invoise.done ? "تم الدفع" : "لم يتم الدفع";
  return (
    <>
      <td></td>
      <td>{invoise.name}</td>
      <td>{date}</td>
      <td>{invoise.total_cash}</td>
      <td>{done}</td>
    </>
  );
};

export default InvoiseRow;
