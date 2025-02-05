import * as React from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { Hint } from "@progress/kendo-react-labels";
import errorData from "../../../../errors4.json";
// import { useDispatch,  } from "react-redux";
// import { setStoreValue } from "../../../store/reducer/errorCodeSlice.jsx";
const getUniqueErrorCodes = () => {
  const uniqueErrors = new Map(); // Use a Map to ensure uniqueness

  errorData.forEach(error => {
    if (error.error_code && !uniqueErrors.has(error.error_code)) {
      uniqueErrors.set(error.error_code, {
        text: String(error.error_code), // Display text
        value: error.error_code // Actual value
      });
    }
  });
    return Array.from(uniqueErrors.values());
};

const ErrorCodeDropdown = () => {
  const errorCodes = React.useMemo(getUniqueErrorCodes, []);
  const [value, setValue] = React.useState([]);

  const onChange = (event) => {
    setValue([...event.value]);
    console.log("Selected Error Codes:", event.value);
  };

  return (
    <div className="w-25">
      <div>Filter by error code</div>
      <MultiSelect
        style={{ marginTop: "12px" }}
        data={errorCodes}
        textField="text"
        dataItemKey="value"
        onChange={onChange}
        value={value}
        placeholder="Please select ..."
      />
      <Hint>You can choose more than one option</Hint>
    </div>
  );
};

export default ErrorCodeDropdown;