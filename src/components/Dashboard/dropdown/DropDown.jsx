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

import { useDispatch, useSelector } from "react-redux";
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
  const dispatch = useDispatch();

  // Selecting state from Redux store
  const selectedValues = useSelector(
    (state) => state.user.multiSelect.selectedValues
  );
  const expandedStateValues = useSelector(
    (state) => state.user.multiSelect.expanded || []
  );
  const filterValue = useSelector(
    (state) => state.user.multiSelect.filter || null
  );
  // console.log(selectedValues)
  const onChange = (event) => {
    const newValue = getMultiSelectTreeValue(treeData, {
      ...fields,
      ...event,
      value: selectedValues,
    });
    dispatch(setStoreValue(newValue));
  };

  const onExpandChange = React.useCallback(
    (event) => {
      dispatch(
        setStoreValue({
          expanded: expandedState(event.item, dataItemKey, expandedStateValues),
        })
      );
    },
    [dispatch, expandedStateValues]
  );

  const treeData = React.useMemo(() => {
    const transformedData = transformToTreeData(data) || [];

    return processMultiSelectTreeData(transformedData, {
      expanded: expandedStateValues,
      value: selectedValues,
      filter: filterValue,
      ...fields,
    });
  }, [selectedValues, expandedStateValues, filterValue]);

  const onFilterChange = (event) => {
    dispatch(setStoreValue({ filter: event.filter }));
  };

  return (
    <div className="w-25">
      <div>Categories:</div>
      <MultiSelectTree
        style={{
          marginTop: "12px",
        }}
        data={treeData}
        value={selectedValues}
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
