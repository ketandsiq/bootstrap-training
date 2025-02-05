import * as React from "react";
import { MultiSelect } from "@progress/kendo-react-dropdowns";
import { Hint } from "@progress/kendo-react-labels";
import errorData from "../../../../errors4.json";
import { useDispatch, useSelector } from "react-redux";
import { setStoreValue } from "../../../../store/reducer/errorCodeSlice.jsx";

const getUniqueErrorCodes = () => {
  const uniqueErrors = new Map();

  errorData.forEach((error) => {
    if (error.error_code && !uniqueErrors.has(error.error_code)) {
      uniqueErrors.set(error.error_code, {
        text: String(error.error_code),
        value: error.error_code,
      });
    }
  });

  return Array.from(uniqueErrors.values());
};

const ErrorCodeDropdown = () => {
  const dispatch = useDispatch();
  const errorCodes = React.useMemo(getUniqueErrorCodes, []);

  // Use Redux state instead of component state
  const selectedErrors = useSelector(
    (state) => state.user.multiSelectErrors.selectedErrors
  );
  console.log(selectedErrors);
  
  const onChange = (event) => {
    dispatch(setStoreValue(event.value)); // Update Redux store
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
        value={selectedErrors} 
        placeholder="Please select ..."
        
      />
      <Hint>You can choose more than one option</Hint>
    </div>
  );
};

export default ErrorCodeDropdown;
