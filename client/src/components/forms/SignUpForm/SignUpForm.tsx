import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { AuthApi } from "../../../api/auth-api";
import { useAuthContext } from "../../../context/AuthContext/useAuthContext";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { fetchFn } from "../../../static/js/requests/fetch-fn/fetch-fn";
import { signUpSchema } from "../../../static/js/validation/sign-up-schema/sign-up-schema";
import { EmailExists } from "../../EmailExists/EmailExists";
import { FormikInput } from "../../FormikInput/FormikInput";

export const SignUpForm = () => {
  const { displayEmailExistsMsg, toggleEmailExistsMsg } = useAuthContext();
  const { startLoading, stopLoading, loading } = useLoadingContext();
  const navigate = useNavigate();

  return (
    <main className="body-container">
      <div className="form-container">
        {displayEmailExistsMsg && <EmailExists />}
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={async ({email, fullName, password, passwordConfirmation}) => {
            startLoading();

            const { errors } = await AuthApi.signUp(
              email,
              fullName,
              password,
              passwordConfirmation
            );

            stopLoading();

            if (errors && errors[0].message === "Email already exists.") {
              toggleEmailExistsMsg(true);

              return;
            }

            toggleEmailExistsMsg(true);
            navigate("/sign-in");
          }}
        >
          {() => (
            <Form className="sign-up-form">
              <p className="required-fields-msg">Indicates required fields</p>
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
                maxLength={70}
                label="Full name"
                name="fullName"
                type="text"
                required
                isRequired={true}
                autoComplete="on"
                placeholder="Full Name"
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
              <FormikInput
                maxLength={256}
                id="password-confirmation"
                label="Password Confirmation"
                name="passwordConfirmation"
                type="password"
                required
                isRequired={true}
                autoComplete="new-password"
                placeholder="Confirm Password"
              />
              <button disabled={loading} type="submit" className="primary-btn">
                {loading ? (
                  <i className="fas fa-spinner fa-spin" />
                ) : (
                  <p className="custom-span link-underline">Sign up</p>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};
