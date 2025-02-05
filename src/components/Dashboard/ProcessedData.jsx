import errorData from "../../errors4.json";
import { useSelector } from "react-redux";


const ProcessedData = () => {
  // console.log(start,endDate)
  const selectedCategoryStore = useSelector(
    (state) => state.user.multiSelect.selectedValues
  );
  // console.log(selectedCategoryStore)
  const selectedErrorsStore = useSelector(
    (state) => state.user.multiSelectErrors.selectedErrors
  );

  const dateRangeStore = useSelector((state) => state.user.dateRange);
  
  const start = new Date(dateRangeStore.start);
  const end = new Date(dateRangeStore.end);
  console.log(selectedCategoryStore);
  console.log(selectedErrorsStore);

  // console.log("Start Date (ISO):", start, "End Date (ISO):", end);
  const filteredData = errorData.filter((error) => {
    const errorDate = new Date(error.timestamp);
    const isInDateRange = errorDate >= start && errorDate <= end;

    if (
      selectedCategoryStore.length !== 0 &&
      selectedErrorsStore.length !== 0
    ) {
      const matchesText = selectedCategoryStore.some(
        (item) => item.text === error.error_subcategory
      );
      const matchesErrorCode = selectedErrorsStore.some(
        (item) => item.value === error.error_code
      );
      return isInDateRange && matchesText && matchesErrorCode;
    } else if (
      selectedCategoryStore.length === 0 &&
      selectedErrorsStore.length > 0
    ) {
      const matchesErrorCode = selectedErrorsStore.some(
        (item) => item.value === error.error_code
      );
      return isInDateRange && matchesErrorCode;
    } else if (
      selectedCategoryStore.length > 0 &&
      selectedErrorsStore.length === 0
    ) {
      const matchesText = selectedCategoryStore.some(
        (item) => item.text === error.error_subcategory
      );
      return isInDateRange && matchesText;
    }
  });
  // console.log(filteredData)

  const errorDataMap = filteredData.reduce((acc, error) => {
    if (!acc[error.error_subcategory]) {
      acc[error.error_subcategory] = {
        count: 0,
        error_code: error.error_code,
      };
    }
    acc[error.error_subcategory].count += 1;
    return acc;
  }, {});

  // console.log(errorDataMap);

  const result = Object.keys(errorDataMap).map((errorType) => ({
    error_type: errorType,
    count: errorDataMap[errorType].count,
    error_code: errorDataMap[errorType].error_code,
  }));

  // console.log("Processed Result:", result);
  return result;
};

export default ProcessedData;
