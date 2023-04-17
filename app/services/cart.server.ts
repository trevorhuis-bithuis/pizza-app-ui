import { Redis } from "@upstash/redis";
import jwt_decode from "jwt-decode";
import shortUUID from "short-uuid";
import { crustChoices, sizeChoices, toppingsChoices } from "~/constants";
import type { Crust, Pizza, PizzaFormData, Size } from "~/types";
import { deleteOrder, postPizzaOrder } from "./pizzaApi.server";

const redis = new Redis({
  url: "https://us1-amusing-ewe-37931.upstash.io",
  token: process.env.UPSTASH_TOKEN,
});

export async function createCart(accessToken: string) {
  const sessionToken = getRedisSessionToken(accessToken);
  await redis.json.set(sessionToken, "$", { pizzas: [] });
  return sessionToken;
}

export async function addPizzaToCart(
  accessToken: string,
  pizza: PizzaFormData
) {
  const sessionToken = getRedisSessionToken(accessToken);
  const pizzaFull = createFullPizzaInfo(pizza);

  await redis.json.arrappend(
    sessionToken,
    "$.pizzas",
    JSON.stringify(pizzaFull)
  );
}

export async function removePizzaFromCart(
  sessionToken: string,
  pizzaId: string
) {
  const cart: any = await getCart(sessionToken);

  const filteredPizzas = cart.pizzas.filter(
    (pizza: Pizza) => pizza.id !== pizzaId
  );

  await redis.json.set(
    sessionToken,
    "$.pizzas",
    JSON.stringify(filteredPizzas)
  );
}

export async function getCart(sessionToken: string) {
  const cart: any = await redis.json.get(sessionToken, "$");
  return cart[0];
}

export function createFullPizzaInfo(pizza: PizzaFormData): Pizza {
  return {
    id: shortUUID.uuid(),
    price: parseInt(pizza.price),
    crust: crustChoices.find((c) => c.id === pizza.crust) as Crust,
    toppings: pizza.toppings
      ? toppingsChoices.filter((t) => pizza.toppings.includes(t.id))
      : [],
    size: sizeChoices.find((s) => s.id === pizza.size) as Size,
  };
}

export async function purchaseCart(
  sessionToken: string,
  tableId: number,
  accessToken: string
) {
  const cart: any = await getCart(sessionToken);
  let isError = false;
  const orderedPizzas: any[] = [];

  for await (const pizza of cart.pizzas) {
    const { data, error } = await postPizzaOrder(pizza, tableId, accessToken);
    if (error) {
      isError = true;
    } else {
      orderedPizzas.push(data);
    }
  }

  if (isError) {
    for await (const pizza of orderedPizzas) {
      await deleteOrder(pizza.Order_ID);
    }
  } else {
    await redis.json.set(sessionToken, "$.pizzas", JSON.stringify([]));
  }

  return {
    error: isError,
    data: cart.pizzas,
  };
}

export function getRedisSessionToken(accessToken: string) {
  const decoded: any = jwt_decode(accessToken);
  return decoded["jti"];
}
