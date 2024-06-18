import React from "react";

const ClientRow = (props) => {
  const client = props.client;
  if (!client.phone) {
    client.phone = "----------";
  }
  return (
    <>
      <td>{client.name}</td>
      <td>{client.phone}</td>
      <td>{client.receivedCash}</td>
      <td>{client.totalCash}</td>
    </>
  );
};

export default ClientRow;
