import { Form, Field, FormElement } from "@progress/kendo-react-form";
import { Input } from "@progress/kendo-react-inputs";
import { Error } from "@progress/kendo-react-labels";
import { Button } from "@progress/kendo-react-buttons";
import { Container } from "react-bootstrap";

const emailRegex = new RegExp(/\S+@\S+\.\S+/);
const passwordRegex = new RegExp(
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
);

const emailValidator = (value) =>
  emailRegex.test(value) ? "" : "Please enter a valid email.";

const passwordValidator = (value) =>
  passwordRegex.test(value)
    ? ""
    : "Password must be atleast 8 characters long and contain at least one letter and one number and one special character.";

const InputComponent = (fieldRenderProps) => {
  const { validationMessage, visited, ...others } = fieldRenderProps;

  return (
    <div>
      <Input {...others} />
      {visited && validationMessage && <Error>{validationMessage}</Error>}
    </div>
  );
};

const LoginTest = () => {
  const handleSubmit = (dataItem) => alert(JSON.stringify(dataItem, null, 2));

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Container
        className="shadow-lg d-flex justify-content-center bg-dark-subtle p-5 rounded-4 m-3"
        style={{ maxWidth: "20%", width: "100%" }}
      >
        <Form
          onSubmit={handleSubmit}
          render={(formRenderProps) => (
            <FormElement
              style={{
                maxWidth: 650,
                width: "100%",
              }}
            >
              <fieldset className={"k-form-fieldset"}>
                <legend
                  className={
                    "k-form-legend d-flex justify-content-center fw-bold fs-3 mb-1"
                  }
                >
                  Login
                </legend>
                <div className="mb-3">
                  <Field
                    name={"email"}
                    type={"email"}
                    component={InputComponent}
                    label={"Email"}
                    validator={emailValidator}
                  />
                  <Field
                    name={"password"}
                    type={"password"}
                    component={InputComponent}
                    label={"Password"}
                    validator={passwordValidator}
                  />
                </div>
              </fieldset>
              <div className="k-form-buttons">
                <Button disabled={!formRenderProps.allowSubmit}>Submit</Button>
              </div>
            </FormElement>
          )}
        />
      </Container>
    </div>
  );
};
export default LoginTest;
