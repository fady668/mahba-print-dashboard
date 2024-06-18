import React from "react";

const AdditionalRow = (props) => {
  const additional = props.additional;
  return (
    <>
      <td></td>
      <td>{additional.additional_type}</td>
      <td>{additional.count}</td>
      <td>{additional.salary_of_one}</td>
      <td>{additional.total}</td>
    </>
  );
};

export default AdditionalRow;
