import { crustChoices, sizeChoices, toppingsChoices } from "~/constants";
import type { Pizza, PizzaApiData } from "~/types";
import dayjs from "dayjs";

const API_BASE = "https://pizza-api-app.herokuapp.com/api";

export async function postPizzaOrder(
  pizza: Pizza,
  table: number,
  accessToken: string
) {
  const toppingApiVersions = pizza.toppings.map(
    (topping) => topping.apiVersion
  );

  const data: PizzaApiData = {
    Crust: pizza.crust.apiVersion,
    Flavor: `CHZ${
      toppingApiVersions.length > 0 ? "-" : ""
    }${toppingApiVersions.join("-")}`,
    Size: pizza.size.apiVersion,
    Table_No: table,
  };

  const response = await fetch(`${API_BASE}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  return response.json();
}

export async function loginHeb(
  username: FormDataEntryValue | null,
  password: FormDataEntryValue | null
): Promise<string> {
  const response = await fetch(`${API_BASE}/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const responseJson = await response.json();
  return responseJson["access_token"];
}

export async function getOrders() {
  const response = await fetch(`${API_BASE}/orders`);
  const orders: any = await response.json();

  let ordersFull = orders.map((order: any) => createFullPizzaDisplay(order));

  ordersFull = ordersFull.map((order: any) => {
    const newOrder = {
      ...order,
      searchToken: `${order.size?.name} ${order.crust?.name} ${order.toppings
        .map((topping: any) => topping?.name)
        .join(" ")} ${order.table}`.toLowerCase(),
    };
    return newOrder;
  });

  return ordersFull;
}

export async function deleteOrder(orderId: number) {
  const response = await fetch(`${API_BASE}/orders/${orderId}`, {
    method: "DELETE",
  });
  return response.json();
}

export function createFullPizzaDisplay(pizzaApi: PizzaApiData) {
  let flavors = pizzaApi.Flavor.split("-");

  return {
    id: `${pizzaApi.Order_ID}`,
    size: sizeChoices.find((size) => size.apiVersion === pizzaApi.Size),
    crust: crustChoices.find((crust) => crust.apiVersion === pizzaApi.Crust),
    toppings: flavors
      .slice(1)
      .map((topping) =>
        toppingsChoices.find(
          (toppingChoice) => toppingChoice.apiVersion === topping
        )
      ),
    table: pizzaApi.Table_No,
    timestamp: dayjs(pizzaApi.Timestamp),
    searchToken: "",
  };
}
