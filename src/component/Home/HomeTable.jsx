import { Button, Table } from "antd";
import moment from "moment";
import React, { memo } from "react";
import * as XLSX from "xlsx";

function HomeTable({ taskItem, columns, tableRef }) {
  const exportToExcel = () => {
    const data = taskItem.map((item) => ({
      user: item?.user,
      title: item?.title,
      date: moment(item?.duedate).format("DD/MM/YYYY"),
      attachment: item?.attachment,
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  return (
    <>
      <Button onClick={exportToExcel} type="primary" danger>
        Export to Excel
      </Button>
      <Table dataSource={taskItem} columns={columns} ref={tableRef} />
    </>
  );
}

export default memo(HomeTable);
