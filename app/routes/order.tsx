import type { LoaderArgs } from "@remix-run/node";
import { useState } from "react";
import { Form, type V2_MetaFunction } from "@remix-run/react";
import Navbar from "~/components/navbar";
import OrderAddedToCartAlert from "~/components/orderAddedToCart";
import OrderRadioSelect from "~/components/orderRadioSelect";
import { authenticator } from "~/services/auth.server";
import type { Size, Topping, Crust, PizzaFormData } from "~/types";
import { crustChoices, sizeChoices, toppingsChoices } from "~/constants";
import { addPizzaToCart } from "~/services/cart.server";
import { getSession } from "~/services/session.server";
import OrderSummaryTable from "~/components/orderSummaryTable";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Order" }];
};

export async function loader({ request }: LoaderArgs) {
  return await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
}

export async function action({ request }: LoaderArgs) {
  let formData = await request.formData();
  const form = Object.fromEntries(formData.entries());
  const toppings: string[] = [];

  for (const [key, value] of Object.entries(form)) {
    if (key.startsWith("topping")) {
      toppings.push(value as string);
    }
  }

  const session = await getSession(request.headers.get("cookie"));
  const accessToken = session.data.user.accessToken;

  const pizza: PizzaFormData = {
    size: form.size as string,
    crust: form.crust as string,
    toppings: toppings,
    price: form.price as string,
  };

  try {
    addPizzaToCart(accessToken, pizza);
  } catch (error) {
    console.error(error);
  }

  return null;
}

export default function Order() {
  const [size, setSize] = useState<Size>(sizeChoices[0]);
  const [crust, setCrust] = useState<Crust>(crustChoices[0]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [orderComplete, setOrderComplete] = useState(false);

  function calculatePizzaPrice() {
    return (
      size.price +
      toppings.reduce((acc, topping) => acc + topping.price, 0) +
      crust.price
    );
  }

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <Form method="POST">
          <div className="my-6">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Order
            </h1>
          </div>

          {orderComplete && (
            <OrderAddedToCartAlert
              dismissAlert={() => {
                setOrderComplete(false);
                window.location.reload();
              }}
            />
          )}

          <div className="grid lg:grid-cols-2">
            <div className="space-y-6">
              <h1 className="text-xl">SIZE</h1>
              <OrderRadioSelect
                items={sizeChoices}
                name="size"
                setSelected={setSize}
                defaultChoice="small"
              />
              <h1 className="text-xl">CRUST</h1>
              <OrderRadioSelect
                items={crustChoices}
                name="crust"
                setSelected={setCrust}
                defaultChoice="normal"
              />

              <div>
                <h2 className="mb-6 text-lg">TOPPINGS</h2>
                <fieldset>
                  <legend className="sr-only">Toppings</legend>
                  <div className="space-y-2">
                    {toppingsChoices.map((topping, toppingIdx) => (
                      <div
                        key={topping.id}
                        className="relative flex items-start"
                      >
                        <div className="flex h-6 items-center">
                          <input
                            id={`toppings-${toppingIdx}`}
                            aria-describedby={`${topping.id}-description`}
                            name={`topping-${toppingIdx}`}
                            type="checkbox"
                            value={topping.id}
                            className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            onChange={(e) => {
                              if (e.target.checked) {
                                setToppings([...toppings, topping]);
                              } else {
                                setToppings(
                                  toppings.filter((t) => t.id !== topping.id)
                                );
                              }
                            }}
                          />
                        </div>
                        <div className="ml-3 text-sm leading-6">
                          <label
                            htmlFor="toppings"
                            className="font-medium text-gray-900"
                          >
                            {topping.name}
                          </label>{" "}
                          <span
                            id={`${topping.id}-description`}
                            className="text-gray-500"
                          >
                            ${topping.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </fieldset>
              </div>
            </div>

            <div className="my-4 overflow-hidden rounded-lg bg-white shadow">
              <div className="px-4 py-5 sm:px-6">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  Order Summary
                </h2>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Review your order before submitting.
                </p>
              </div>
              <div className="grid-rows-auto mb-4 grid justify-center space-y-4 border-t border-gray-200">
                <OrderSummaryTable
                  size={size}
                  crust={crust}
                  toppings={toppings}
                />
                <div className="text-center">
                  Total: ${calculatePizzaPrice()}
                </div>
                <input
                  type="hidden"
                  name="price"
                  value={calculatePizzaPrice()}
                />
                <button
                  className="w-72 rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
                  type="submit"
                  onClick={() => {
                    setOrderComplete(true);
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </Form>
      </div>
    </>
  );
}
