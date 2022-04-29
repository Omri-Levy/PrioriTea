import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../../../api/auth-api";
import { useAuthContext } from "../../../context/AuthContext/useAuthContext";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
// import { signInSchema } from "../../../static/js/validation/sign-in-schema/sign-in-schema";
import { FormikInput } from "../../FormikInput/FormikInput";

export const SignInForm = () => {
  const { signIn } = useAuthContext();
  const { startLoading, stopLoading, isLoading } = useLoadingContext();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  return (
    <div className="form-container">
      <Formik
        initialValues={{
          email: "",
          fullName: "",
          password: "",
          passwordConfirmation: "",
        }}
        // validationSchema={signInSchema}
        onSubmit={async ({ email, password }) => {
          startLoading();

          const { errors } = await AuthApi.signIn(email, password);

          stopLoading();

          if (
            errors?.[0].message &&
            errors?.[0].message === "Email or password are wrong"
          ) {
            setError(errors[0].message);

            return;
          }

          signIn();
          navigate("/");
        }}
      >
        {() => (
          <Form className="sign-in-form">
            <p className="required-fields-msg">
              Indicates required fields
            </p>
            {error && <div className="error">{error}</div>}
            <FormikInput
              maxLength={320}
              autoFocus={true}
              label="Email"
              name="email"
              type="text"
              required
              isRequired={true}
              autoComplete="on"
              placeholder="Email"
            />
            <FormikInput
              maxLength={256}
              label="Password"
              name="password"
              type="password"
              required
              isRequired={true}
              autoComplete="new-password"
              placeholder="Password"
            />
            <button disabled={isLoading} type="submit" className="primary-btn">
              {isLoading ? (
                <i className="fas fa-spinner fa-spin" />
              ) : (
                <p className="custom-span link-underline">Sign in</p>
              )}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};
