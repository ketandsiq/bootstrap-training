import * as React from "react";
import { process } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import errorsData from "../../../errors4.json";

const errors = errorsData.map((error, i) => ({
  ...error,
  id: i,
}));

const DATA_ITEM_KEY = "id";

const initialDataState = {
  take: 10,
  skip: 0,
  sort: [{ field: "error_code", dir: "asc" }],
};

const DataGrid = () => {
  const [filterValue, setFilterValue] = React.useState("");
  const [dataState, setDataState] = React.useState(initialDataState);
  const [gridData, setGridData] = React.useState(
    process(errors, initialDataState)
  );

  let excelExportRef;

  const dataStateChange = (event) => {
    setDataState(event.dataState);
    setGridData(process(errors, event.dataState));
  };

  const onFilterChange = (ev) => {
    const value = ev.value;
    setFilterValue(value);

    const filteredErrors = errors.filter((item) => {
      let match = false;
      for (const key in item) {
        if (
          item[key] &&
          item[key].toString().toLowerCase().includes(value.toLowerCase())
        ) {
          match = true;
        }
      }
      return match;
    });
    const newDataState = { ...dataState, skip: 0 };
    setDataState(newDataState);
    setGridData(process(filteredErrors, newDataState));
  };

  const exportExcel = () => {
    if (excelExportRef) {
      excelExportRef.save();
    }
  };

  return (
    <div>
      <Grid
        data={gridData}
        pageable={{ pageSizes: true }}
        sortable={true}
        onDataStateChange={dataStateChange}
        {...dataState}
        dataItemKey={DATA_ITEM_KEY}
      >
        <GridToolbar>
          <Input
            value={filterValue}
            onChange={onFilterChange}
            placeholder="Search in all columns..."
            style={{ width: "210px", marginRight: "10px" }}
          />
          <Button onClick={exportExcel} style={{ marginRight: "10px" }}>
            Export to Excel
          </Button>
        </GridToolbar>
        <Column field="id" title="ID" />
        <Column field="error_category" title="Category" />
        <Column field="error_subcategory" title="Subcategory" />
        <Column field="error_code" title="Error Code" />
        <Column field="error_message" title="Message" />
        <Column field="spider" title="Spider" />
        <Column field="url" title="URL" />
        <Column field="timestamp" title="Timestamp" />
      </Grid>
      {/* <ExcelExport
        data={gridData}
        collapsible={true}
        fileName="Errors.xlsx"
        ref={excelExportRef}
      >
        <ExcelExportColumn field="id" title="ID" width={200} />
        <ExcelExportColumn field="error_category" title="Category" />
        <ExcelExportColumn field="error_subcategory" title="Subcategory" />
        <ExcelExportColumn field="error_code" title="Error Code" />
        <ExcelExportColumn field="error_message" title="Message" />
        <ExcelExportColumn field="spider" title="Spider" />
        <ExcelExportColumn field="url" title="URL" />
        <ExcelExportColumn field="timestamp" title="Timestamp" />
      </ExcelExport> */}
    </div>
  );
};

export default DataGrid;
