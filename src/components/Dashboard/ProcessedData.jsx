import errorData from "../../errors4.json";
import { useSelector } from "react-redux";
import DateRangeLineChart from "./charts/lineChart/dateRangeLineChart";

const ProcessedData = () => {
  const selectedCategoryStore = useSelector(
    (state) => state.user.multiSelect.selectedValues
  );

  const selectedErrorsStore = useSelector(
    (state) => state.user.multiSelectErrors.selectedErrors
  );

  const dateRangeStore = useSelector((state) => state.user.dateRange);

  // Get breakpoints from DateRangeLineChart
  const breakpointData = DateRangeLineChart();
  const hasBreakpoints = breakpointData.length > 0;

  // If breakpoints exist, extract step and dates; otherwise, use empty arrays
  const dates = hasBreakpoints ? breakpointData[0].dates : [];
  console.log(dates);
  const start = new Date(dateRangeStore.start);
  const end = new Date(dateRangeStore.end);

  // Filter data based on selected categories and errors
  const filteredData = errorData.filter((error) => {
    const errorDate = new Date(error.timestamp);
    const isInDateRange = errorDate >= start && errorDate <= end;

    if (selectedCategoryStore.length && selectedErrorsStore.length) {
      return (
        selectedCategoryStore.some(
          (item) => item.text === error.error_subcategory
        ) &&
        selectedErrorsStore.some((item) => item.value === error.error_code) &&
        isInDateRange
      );
    } else if (!selectedCategoryStore.length && selectedErrorsStore.length) {
      return (
        selectedErrorsStore.some((item) => item.value === error.error_code) &&
        isInDateRange
      );
    } else if (selectedCategoryStore.length && !selectedErrorsStore.length) {
      return (
        selectedCategoryStore.some(
          (item) => item.text === error.error_subcategory
        ) && isInDateRange
      );
    }
  });

  // Initialize an object to group errors by subcategory
  const errorDataMap = {};

  // Iterate over breakpoints if they exist; otherwise, skip this logic
  if (hasBreakpoints) {
    filteredData.forEach((error) => {
      const errorDateStr = new Date(error.timestamp)
        .toISOString()
        .split("T")[0]; // Get 'YYYY-MM-DD' format
      const dateIndex = dates.indexOf(errorDateStr); // Find its index in the breakpoints array

      if (dateIndex !== -1) {
        const errorType = error.error_subcategory;

        if (!errorDataMap[errorType]) {
          errorDataMap[errorType] = {
            count: 0,
            error_code: error.error_code,
            line_data: {
              count_per_date: Array(dates.length).fill(0),
              dates: dates,
            },
          };
        }

        // Increment overall count
        errorDataMap[errorType].count += 1;

        // Increment count for the exact date index
        errorDataMap[errorType].line_data.count_per_date[dateIndex] += 1;
      }
    });
  }

  // Process final results
  const result = filteredData.reduce((acc, error) => {
    const errorType = error.error_subcategory;
    if (!acc[errorType]) {
      acc[errorType] = {
        count: 0,
        error_code: error.error_code,
        line_data: {
          count_per_date: hasBreakpoints ? Array(dates.length - 1).fill(0) : [],
          dates: hasBreakpoints ? dates : [],
        },
      };
    }
    acc[errorType].count += 1;
    return acc;
  }, errorDataMap);

  // Convert object to array format
  return Object.keys(result).map((errorType) => ({
    error_type: errorType,
    count: result[errorType].count,
    error_code: result[errorType].error_code,
    line_data: result[errorType].line_data,
  }));
};

export default ProcessedData;
