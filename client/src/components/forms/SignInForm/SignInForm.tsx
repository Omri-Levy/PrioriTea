import { Form, Formik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/AuthContext/useAuthContext";
import { useLoadingContext } from "../../../context/LoadingContext/useLoadingContext";
import { fetchFn } from "../../../static/js/requests/fetch-fn/fetch-fn";
import { signInSchema } from "../../../static/js/validation/sign-in-schema/sign-in-schema";
import { FormikInput } from "../../FormikInput/FormikInput";

export const SignInForm = () => {
  const { signIn, signOut } = useAuthContext();
  const { startLoading, stopLoading, loading } = useLoadingContext();
  const [error, setError] = useState(null);
  const signInUrl = `${process.env.REACT_APP_API_AUTH}/sign-in`;
  const setIsSignedInUrl = `${process.env.REACT_APP_API}/auth`;
  const navigate = useNavigate();

  return (
    <main className="body-container">
      <div className="form-container">
        <Formik
          initialValues={{
            email: "",
            fullName: "",
            password: "",
            passwordConfirmation: "",
          }}
          validationSchema={signInSchema}
          onSubmit={async (data) => {
            startLoading();

            const signInOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: data.email,
                password: data.password,
              }),
              credentials: "include",
            };

            const setIsSignedInOptions = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              credentials: "include",
            };

            try {
              const { data: signInData } = await fetchFn(
                signInUrl,
                signInOptions
              );
              console.log(signInData);
              if (
                signInData.message &&
                signInData.message.includes("Email or password are wrong")
              ) {
                setError(signInData.message);
              }

              const { data: setIsSignedInData } = await fetchFn(
                setIsSignedInUrl,
                setIsSignedInOptions
              );

              if (setIsSignedInData && setIsSignedInData.isSignedIn) {
                signIn();
                navigate("/");
              } else {
                signOut();
                navigate("/sign-in");
              }
            } catch (err) {
              console.error(err);
            }
            stopLoading();
          }}
        >
          {() => (
            <Form className="sign-in-form">
              <p className="required-fields-msg">Indicates required fields</p>
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
              <button disabled={loading} type="submit" className="primary-btn">
                {loading ? (
                  <i className="fas fa-spinner fa-spin" />
                ) : (
                  <p className="custom-span link-underline">Sign in</p>
                )}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};
