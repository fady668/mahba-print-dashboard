import React from "react";

const ReceivedCashRow = (props) => {
    const cash = props.cash;
    const date = cash.date.slice(0, 10).replace("-", "/").replace("-", "/");
    return (
        <>
            <td></td>
            <td>{parseFloat(cash.received_value)}</td>
            <td>{date}</td>
            <td>{cash.push_to}</td>
            <td>{cash.push_way}</td>
        </>
    );
};

export default ReceivedCashRow;
