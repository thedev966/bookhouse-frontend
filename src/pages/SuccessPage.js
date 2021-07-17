import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import Header from "../components/Header";
import "../styles/SuccessPage.css";
import { useLazyQuery } from "@apollo/client";
import queries from "../graphql/Queries";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

const SuccessPage = () => {
  const location = useLocation();
  const [sessionID, setSessionID] = useState("");
  const user = useSelector(selectUser);
  const history = useHistory();
  const [orderDetails, { loading, data }] = useLazyQuery(queries.ORDER_DETAILS);

  useEffect(() => {
    setSessionID(location.search.split("=")[1]);
    user &&
      orderDetails({
        variables: {
          orderDetailsInput: {
            sessionID,
            userID: user.id,
          },
        },
      });

    data && data.orderDetails.success && localStorage.removeItem("basket");
  }, [user, data]);

  data && console.log(data);
  return (
    <div className="success">
      <Header />
      <div className="wrapper">
        <div className="success__messageContainer">
          {loading ? (
            <div>Loading...</div>
          ) : (
            data &&
            data.orderDetails.success && (
              <p className="success__message">
                Your order id{" "}
                <span className="success__orderID">
                  #{data?.orderDetails.orderID.split("_")[1]}
                </span>{" "}
                has been completed successfully. If you would like to review all
                your orders, click on the button down below.
                <button
                  className="success_goToOrdersBtn"
                  onClick={() => history.push("/orders")}
                >
                  Go to Orders
                </button>
              </p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
