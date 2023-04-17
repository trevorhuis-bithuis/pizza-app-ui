import type { LoaderArgs } from "@remix-run/node";
import Navbar from "~/components/navbar";
import { authenticator } from "~/services/auth.server";
import { deleteOrder, getOrders } from "~/services/hebPizzaApi";
import { Form, useLoaderData } from "@remix-run/react";
import { TrashIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import type { PizzaOrderHistory } from "~/types";
import { useEffect, useState } from "react";

export async function loader({ request }: LoaderArgs) {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });

  return await getOrders();
}

export async function action({ request }: LoaderArgs) {
  let formData = await request.formData();
  let { ...values } = Object.fromEntries(formData);

  await deleteOrder(parseInt(values.orderId as string));

  return null;
}

export default function Orders() {
  const loadedOrders: any = useLoaderData();
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState(loadedOrders);

  useEffect(() => {
    if (search !== "") {
      const orders = loadedOrders.filter((order: PizzaOrderHistory) => {
        return (
          order.searchToken && order.searchToken.includes(search.toLowerCase())
        );
      });
      setOrders(orders);
    } else {
      setOrders(loadedOrders);
    }
  }, [search, loadedOrders]);

  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-5xl px-4 pt-16 sm:px-6 lg:px-8">
        <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Order History
        </h1>
        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
          <div className="mb-8">
            <label
              htmlFor="search"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Search
            </label>
            <div className="relative mt-2 flex items-center">
              <input
                type="text"
                name="search"
                id="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <Form method="post">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {orders.map((order: any) => (
                <li
                  key={order.id}
                  className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
                >
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="mt-6 text-sm font-medium text-gray-900">
                      {order.size?.name} Pizza
                    </h3>
                    <dl className="mt-1 flex flex-grow flex-col justify-between">
                      <dt className="sr-only">Table:</dt>
                      <dd className="text-sm text-gray-500">
                        Table {order.table}
                      </dd>
                      <dt className="sr-only">Crust</dt>
                      <dd className="text-sm text-gray-500">
                        {order.crust?.name} Crust
                      </dd>
                      <dt className="sr-only">Order Date:</dt>
                      <dd className="text-sm text-gray-500">{`Order Date: ${dayjs(
                        order.timestamp
                      ).format("MMMM D, YYYY")}`}</dd>
                      <dt className="sr-only">Toppings</dt>
                      <dd className="mt-3">
                        <span className="text-sm text-gray-500">
                          Toppings:{" "}
                          {order.toppings
                            .map((topping: any) => topping?.name)
                            .join(", ")}
                        </span>
                      </dd>
                    </dl>
                  </div>
                  <div>
                    <div className="mt-auto flex divide-x divide-gray-200">
                      <div className="flex w-0 flex-1">
                        <button
                          type="submit"
                          className="relative inline-flex w-0 flex-1 items-end justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900"
                        >
                          <TrashIcon
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                          <input
                            type="hidden"
                            name="orderId"
                            value={order.id}
                          />
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Form>
        </div>
      </div>
    </>
  );
}
