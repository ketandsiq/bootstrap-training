import * as React from "react";
import { process } from "@progress/kendo-data-query";
import {
  Grid,
  GridColumn as Column,
  GridToolbar,
} from "@progress/kendo-react-grid";
import { Input } from "@progress/kendo-react-inputs";
import { Button } from "@progress/kendo-react-buttons";
import { ExcelExport } from "@progress/kendo-react-excel-export";
import { GridPDFExport } from "@progress/kendo-react-pdf";
import errorsData from "../../../errors4.json"; // Import your error data


// Add a unique id to each error object
const errors = errorsData.map((error, i) => ({
  ...error,
  id: i,
}));

// Use the new 'id' field as the unique key for each data item
const DATA_ITEM_KEY = "id";

// Define the initial data state with an initial sort on error_code (ascending)
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
    let pdfExportRef;
  // Handle grid data state changes (paging, sorting, filtering)
  const dataStateChange = (event) => {
    setDataState(event.dataState);
    setGridData(process(errors, event.dataState));
  };

  // Handle filtering (search in all columns)
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
    // Reset paging on filter change if desired
    const newDataState = { ...dataState, skip: 0 };
    setDataState(newDataState);
    setGridData(process(filteredErrors, newDataState));
  };


  const exportExcel = () => {
    if (excelExportRef) {
      excelExportRef.save();
    }
  };

  // Export to PDF.
  const exportPDF = () => {
    if (pdfExportRef) {
      pdfExportRef.save();
    }
  };

  return (
    <div>
      <Grid
        data={gridData}
        pageable={{ pageSizes: true }}
        sortable={true} // Enable sorting on the grid
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
          <Button onClick={exportPDF}>Export to PDF</Button>
        </GridToolbar>

        {/* Define columns corresponding to your error data */}
        <Column field="id" title="ID"  />
        <Column field="error_category" title="Category"  />
        <Column field="error_subcategory" title="Subcategory" />
        {/* The error_code column will be sortable */}
        <Column field="error_code" title="Error Code"  />
        <Column field="error_message" title="Message"/>
        <Column field="spider" title="Spider" />
        <Column field="url" title="URL" />
        <Column field="timestamp" title="Timestamp" />
      </Grid>
    </div>
  );
};

export default DataGrid;
