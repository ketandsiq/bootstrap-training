import * as React from "react";
import {
  MultiSelectTree,
  getMultiSelectTreeValue,
} from "@progress/kendo-react-dropdowns";
import {
  processMultiSelectTreeData,
  expandedState,
} from "./DDMultiSelectTreeOptions.jsx";
import transformErrors from "./FilterJson.jsx";

import { useDispatch } from "react-redux";
import { setStoreValue } from "../../../store/reducer/categorySlice.jsx";

const dataItemKey = "id";
const checkField = "checkField";
const checkIndeterminateField = "checkIndeterminateField";
const subItemsField = "items";
const expandField = "expanded";
const textField = "text";
const fields = {
  dataItemKey,
  checkField,
  checkIndeterminateField,
  expandField,
  subItemsField,
};

// Sample Data Transformation
const data = transformErrors();

// Transforming the data into the required tree structure
const transformToTreeData = (data) => {
  if (!Array.isArray(data)) return []; // Prevents undefined errors

  return data.map((category, index) => ({
    id: index.toString(),
    text: category.category || "Unknown Category", // Fallback for missing category
    expanded: false, // Ensure expanded is defined
    checkField: false, // Ensure checkField is defined
    checkIndeterminateField: false, // Ensure checkIndeterminateField is defined
    items: Array.isArray(category.sub_category)
      ? category.sub_category.map((subCategory, subIndex) => ({
          id: `${index}-${subIndex}`,
          text: subCategory || "Unknown Subcategory",
          expanded: false,
          checkField: false,
          checkIndeterminateField: false,
        }))
      : [],
  }));
};

const DropDown = () => {
  const [value, setValue] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);

  const [filter, setFilter] = React.useState(null);

  const dispatch = useDispatch();

  
  React.useEffect(() => {
    // Only dispatch when value changes
    dispatch(setStoreValue(value));
  });


  // console.log(storeValue);
  const onChange = (event) => {
    const newValue = getMultiSelectTreeValue(treeData, {
      ...fields,
      ...event,
      value,
    });
    setValue(newValue);
    dispatch(setStoreValue(newValue));
  };





  const onExpandChange = React.useCallback(
    (event) => {
      setExpanded((prevExpanded) =>
        expandedState(event.item, dataItemKey, prevExpanded || [])
      );
    },
    [setExpanded]
  );

  const treeData = React.useMemo(() => {
    const transformedData = transformToTreeData(data) || [];

    return processMultiSelectTreeData(transformedData, {
      expanded: expanded || [], // Ensure expanded is always an array
      value: value || [], // Ensure value is always an array
      filter: filter || null, // Default filter to null
      ...fields, // Spread required fields
    });
  }, [expanded, value, filter]);
  // console.log("Transformed Data:", transformToTreeData(data));
  // console.log("Processed Tree Data:", treeData);
  // console.log("Expanded State:", expanded);
  // console.log("Selected Values:", value);

  const onFilterChange = (event) => setFilter(event.filter);

  return (
    <div>
      <div>Categories:</div>
      <MultiSelectTree
        style={{
          width: "300px",
        }}
        data={treeData}
        value={value}
        onChange={onChange}
        placeholder="Please select ..."
        textField={textField}
        dataItemKey={dataItemKey}
        checkField={checkField}
        checkIndeterminateField={checkIndeterminateField}
        expandField={expandField}
        subItemsField={subItemsField}
        onExpandChange={onExpandChange}
        filterable={true}
        onFilterChange={onFilterChange}
      />
    </div>
  );
};

export default DropDown;
