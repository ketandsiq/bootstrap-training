import errorData from "../../errors.json";


const ProcessedData = () => {
    const errorCount = errorData.reduce((acc, error) => {
      // If the error_type exists in the accumulator, increment it
      if (acc[error.error_type]) {
        acc[error.error_type]++;
      } else {
        // If it's the first time encountering this error_type, set the count to 1
        acc[error.error_type] = 1;
      }
      return acc;
    }, {});

    // Convert to desired format [{error_type: "ERROR", count: 2}, ...]
    const result = Object.keys(errorCount).map((errorType) => ({
      error_type: errorType,
      count: errorCount[errorType],
    }));
  return (
    result
  )
}

export default ProcessedData