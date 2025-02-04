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

  // console.log("Filtered Data:", filteredData);

  // Count occurrences of each error type
  const errorCount = filteredData.reduce((acc, error) => {
    acc[error.error_subcategory] = (acc[error.error_subcategory] || 0) + 1;
    return acc;
  }, {});

  // Convert to desired format
  const result = Object.keys(errorCount).map((errorType) => ({
    error_type: errorType,
    count: errorCount[errorType],
  }));

  // console.log("Processed Result:", result);
  return result;
};

export default ProcessedData
