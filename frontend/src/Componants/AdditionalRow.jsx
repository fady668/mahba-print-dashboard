import React from "react";

const AdditionalRow = (props) => {
    const additional = props.additional;
    const done = additional.done ? "تم الدفع" : "لم يتم الدفع";
    return (
        <>
            <td></td>
            <td>{additional.additional_type}</td>
            <td>{additional.count}</td>
            <td>{additional.salary_of_one}</td>
            <td>{additional.total}</td>
            <td>{done}</td>
        </>
    );
};

export default AdditionalRow;
