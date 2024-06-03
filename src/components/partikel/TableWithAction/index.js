import React from "react";
import { Table } from "react-bootstrap";
import Pagination from "../Pagination";
import Tbody from "../TbodyWithAction";
import Thead from "../Thead";

function TableActionSecond({
  withoutPagination,
  handlePageClick,
  actionNotDisplay,
  data,
  thead,
  tbody,
  deleteAction,
  Detail,
  status,
  pages,
}) {
  return (
    <>
      <Table striped bordered variant="light" hover>
        <Thead text={thead} />
        <Tbody
          status={status}
          data={data}
          display={tbody}
          deleteAction={deleteAction}
          actionNotDisplay={actionNotDisplay}
          Detail={Detail}
        />
      </Table>
      {!withoutPagination && data.length ? (
        <Pagination pages={pages} handlePageClick={handlePageClick} />
      ) : (
        ""
      )}
    </>
  );
}

export default TableActionSecond;
