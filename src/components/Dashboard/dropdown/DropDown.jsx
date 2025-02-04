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
  return data.map((category, index) => ({
    id: index.toString(), // Unique ID for each category
    text: category.category, // Category name as the text
    items: category.sub_category.map((subCategory, subIndex) => ({
      id: `${index}-${subIndex}`, // Unique ID for each sub-category
      text: subCategory, // Subcategory name as text
    })),
  }));
};

const DropDown = () => {
  const [value, setValue] = React.useState([]);
  const [expanded, setExpanded] = React.useState([]);
  const [filter, setFilter] = React.useState(null);

  const onChange = (event) =>
    setValue(
      getMultiSelectTreeValue(data, {
        ...fields,
        ...event,
        value,
      })
    );

  const onExpandChange = React.useCallback(
    (event) => setExpanded(expandedState(event.item, dataItemKey, expanded)),
    [expanded]
  );

  const treeData = React.useMemo(
    () =>
      processMultiSelectTreeData(transformToTreeData(data), {
        expanded,
        value,
        filter,
        ...fields,
      }),
    [expanded, value, filter]
  );

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
