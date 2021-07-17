import React, { useRef, useEffect } from "react";
import "../styles/AuthContent.css";
import CloseIcon from "@material-ui/icons/Close";
import { useMutation } from "@apollo/client";
import mutations from "../graphql/Mutations";
import { useAlert } from "react-alert";
import { useDispatch } from "react-redux";
import { closeModal, loginUser } from "../features/authSlice";
import { useHistory } from "react-router-dom";

const alertStyle = {
  minWidth: "32vw",
  padding: "13px 15px",
  fontSize: "0.85rem",
  fontWeight: 600,
  color: "white",
  borderRadius: "3px",
  textAlign: "center",
};

const AuthContent = ({ title, operation, setIsOpenedAuthModal }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const alert = useAlert();
  const dispatch = useDispatch();
  const history = useHistory();

  const [registerOrLogin, { loading, error, data }] = useMutation(
    operation === "Register" ? mutations.REGISTER_ACCOUNT : mutations.LOGIN_USER
  );

  useEffect(() => {
    let authData;
    if (data) authData = data.registerAccount || data.loginUser;
    console.log(authData);
    data &&
      !authData.success &&
      alert.show(
        <div style={{ ...alertStyle, backgroundColor: "#d9534f" }}>
          {(authData.errors && authData.errors[0].message) || authData.message}
        </div>
      );
    dispatch(loginUser(authData?.user));
    history.push("/");
    data &&
      authData.success &&
      alert.show(
        <div style={{ ...alertStyle, backgroundColor: "#5cb85c" }}>
          {authData.message}
        </div>
      );
    setTimeout(() => {
      dispatch(closeModal());
    }, 3500);
  }, [loading, data]);

  const handleRegisterAndLogin = async (e) => {
    e.preventDefault();
    if (operation === "Register") {
      // handle registration
      await registerOrLogin({
        variables: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
          confirmPassword: confirmPasswordRef.current.value,
        },
      });
    } else if (operation === "Login") {
      // handle login
      await registerOrLogin({
        variables: {
          email: emailRef.current.value,
          password: passwordRef.current.value,
        },
      });
      data && data.loginUser.success && dispatch(closeModal());
    }
  };

  if (error) return <div>Error occurred</div>;
  data && console.log(data.authMutationFunc);

  return (
    <div className="auth-content">
      <CloseIcon onClick={() => dispatch(closeModal())} />
      <h3 className="auth-content__title">{title}</h3>
      <form className="auth-content__form" onSubmit={handleRegisterAndLogin}>
        <input
          type="text"
          name="email"
          placeholder="Your email.."
          ref={emailRef}
        />
        <input
          type="password"
          name="password"
          placeholder="Your password.."
          ref={passwordRef}
        />
        {operation === "Register" && (
          <input
            type="password"
            name="conf_password"
            placeholder="Confirm your password.."
            ref={confirmPasswordRef}
          />
        )}
        <button
          className="auth-content__submitBtn"
          type="submit"
          disabled={loading}
        >
          {operation === "Login"
            ? loading
              ? "Please wait.."
              : "Login"
            : loading
            ? "Please wait.."
            : "Register"}
        </button>
      </form>
      <div className="auth-content__forgotPwd">
        Forgot password? Click here.
      </div>
    </div>
  );
};

export default AuthContent;
