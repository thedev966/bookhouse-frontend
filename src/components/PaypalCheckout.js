import React, { useRef, useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import mutations from "../graphql/Mutations";
import { useSelector } from "react-redux";
import { selectUser } from "../features/authSlice";

export default function PaypalCheckout({ products }) {
  const paypal = useRef();
  const [items, setItems] = useState([]);
  const user = useSelector(selectUser);
  const [paypalCheckout, { loading, data }] = useMutation(
    mutations.PAYPAL_CHECKOUT
  );

  console.log(products);

  useEffect(() => {
    const items = [];
    products.forEach((p) => {
      items.push({
        reference_id: p.id,
        description: `${p.title} (Quantity: ${p.quantity})`,
        amount: {
          currency_code: "USD",
          value: p.price * p.quantity,
        },
      });
    });

    items.length > 0 &&
      window.paypal
        .Buttons({
          style: {
            shape: "rect",
            color: "gold",
            label: "pay",
          },
          createOrder: (data, actions, err) => {
            return actions.order.create({
              intent: "CAPTURE",
              purchase_units: items,
            });
          },
          onApprove: async (data, actions) => {
            const order = await actions.order.capture();
            console.log(order);
            if (order.status === "COMPLETED") {
              // save the order in the db and show success alert
              paypalCheckout({
                variables: {
                  userID: user.id,
                  order: JSON.stringify(order),
                },
              });
            }
          },
          onError: (err) => {
            console.log(err);
          },
        })
        .render(paypal.current);
  }, [products]);

  useEffect(() => {
    if (data?.paypalCheckout.success) {
      localStorage.removeItem("basket");
      window.location.reload();
    }
  }, [data]);

  data && console.log(data.paypalCheckout);
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
}
