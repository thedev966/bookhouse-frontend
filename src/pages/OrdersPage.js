import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import "../styles/OrdersPage.css";
import { useLazyQuery } from "@apollo/client";
import queries from "../graphql/Queries";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

const OrdersPage = () => {
  const user = useSelector(selectUser);
  const [allOrders, { loading, data }] = useLazyQuery(queries.ALL_ORDERS);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    user &&
      allOrders({
        variables: {
          userID: user.id,
        },
      });

    data?.allOrders.success && setOrders(data?.allOrders.orders);
  }, [user, data]);

  return (
    <div className="orders">
      <Header />
      <div className="wrapper">
        <div className="orders__list">
          {loading ? (
            <div>Loading..</div>
          ) : (
            orders.map((o) => (
              <div className="orders__listItem" key={o.orderID}>
                <div className="orders__orderID">
                  <label>Order ID:</label> <span>{o.orderID}</span>
                </div>
                <div className="orders__orderMethod">
                  <span>Method: </span>
                  <img
                    src={
                      o.method === "Stripe"
                        ? "https://www.kreezalid.com/img/home/stripe-solution.png"
                        : "https://digistatement.com/wp-content/uploads/2021/04/paypal-logo.png"
                    }
                  />
                </div>
                <div className="orders__orderDate">
                  <label>Date:</label>{" "}
                  <span>
                    {new Date(parseInt(o.createdAt)).toLocaleDateString(
                      "en-Us"
                    )}
                  </span>
                </div>
                <div className="orders__orderStatus">
                  <label>Status:</label>{" "}
                  <span
                    style={{
                      color: o.status === "paid" ? "#ffab00" : "darkslategray",
                    }}
                  >
                    {o.status.toUpperCase()}
                  </span>
                </div>
                <div className="orders__orderTotal">
                  <label>Total:</label> <span>{o.total}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
