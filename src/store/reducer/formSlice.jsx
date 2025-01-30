import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  validated: false,
  errors: {
    email: "",
    password: "",
  },
};

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    validateForm: (state, action) => {
      const { email, password } = action.payload;
      let newErrors = { email: "", password: "" };
      let isValid = true;

      // Email validation
      if (!email) {
        newErrors.email = "Email is required.";
        isValid = false;
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Please enter a valid email address.";
        isValid = false;
      }

      // Password validation
      if (!password) {
        newErrors.password = "Password is required.";
        isValid = false;
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters.";
        isValid = false; //eslint-disable-line
      }

      state.errors = newErrors;
      state.validated = true;
    },
      submitForm: (state, action) => {

        const fromData = action.payload;
      if (!state.errors.email && !state.errors.password) {
        if (
          fromData.email === "test@test.com" &&
          fromData.password === "password"
        ) {
          alert("Form submitted successfully!");
        } else {
          alert("Invalid credentials!");
        }
      }
    },
  },
});

export const { validateForm, submitForm } = formSlice.actions;
export default formSlice.reducer;
