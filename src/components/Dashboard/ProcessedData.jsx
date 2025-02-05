import errorData from "../../errors4.json";
import {useSelector} from "react-redux"

const ProcessedData = (startDate, endDate) => {
  // console.log(startDate,endDate)
  const store = useSelector((state) => state.user.multiSelect.selectedValues);
  console.log(store)

  const start = new Date(startDate); // Extract only YYYY-MM-DD
  const end = new Date(endDate);// Extract only YYYY-MM-DD

  // console.log("Start Date (ISO):", start, "End Date (ISO):", end);

  // Filter errors within the date range
  const filteredData = errorData.filter((error) => {
    const errorDate = new Date(error.timestamp); // Normalize to YYYY-MM-DD
    const isInDateRange = errorDate >= start && errorDate <= end;

    // Check if store contains the error's subcategory
    const matchesText = store.some(
      (item) => item.text === error.error_subcategory
    );

    return isInDateRange && matchesText;
  });


  console.log(filteredData)

  // Count occurrences of each error type
  const errorDataMap = filteredData.reduce((acc, error) => {
    if (!acc[error.error_subcategory]) {
      acc[error.error_subcategory] = {
        count: 0,
        error_code: error.error_code, // Store the first occurrence of error_code
      };
    }
    acc[error.error_subcategory].count += 1;
    return acc;
  }, {});

  console.log(errorDataMap);


  const result = Object.keys(errorDataMap).map((errorType) => ({
    error_type: errorType,
    count: errorDataMap[errorType].count,
    error_code: errorDataMap[errorType].error_code,
  }));

  // console.log("Processed Result:", result);
  return result;
};

export default ProcessedData
