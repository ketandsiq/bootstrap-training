import data from "../../../errors4.json";

function createErrorArray(data) {
  const result = [];

  Object.keys(data).forEach((category) => {
    const categoryData = data[category];
    const subCategories = categoryData.errors.map(
      (error) => error.error_subcategory
    );

    result.push({
      category: categoryData.error_category,
      sub_category: subCategories,
    });
  });

  return result;
}

function transformErrors() {
  const groupedErrors = data.reduce((acc, error) => {
    const category = error.error_category.toLowerCase();
    if (!acc[category]) {
      acc[category] = { error_category: category, errors: [] };
    }
    if (
      !acc[category].errors.some(
        (e) => e.error_subcategory === error.error_subcategory
      )
    ) {
      acc[category].errors.push({ error_subcategory: error.error_subcategory });
    }
    return acc;
  }, {});

  return createErrorArray(groupedErrors);
}


export default transformErrors;
