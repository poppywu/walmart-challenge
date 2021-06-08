import React from "react";
import Table from "react-bootstrap/Table";
import "./MyTable.css";

function MyTable({ tableHeader, data }) {
  return (
    <Table>
      <thead>
        <tr>
          {tableHeader &&
            tableHeader.map((h, index) => {
              return <th key={index}>{h}</th>;
            })}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.map((item, index) => (
            <tr key={index}>
              {Object.values(item).map((el, index) => (
                <td key={index}>{el}</td>
              ))}
            </tr>
          ))}
      </tbody>
    </Table>
  );
}

export default MyTable;
