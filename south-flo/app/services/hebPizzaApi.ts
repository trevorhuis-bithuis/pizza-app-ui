import type { Pizza, PizzaApiData } from "~/types";

const API_BASE = "https://pizza-api-app.herokuapp.com/api"

export async function postPizzaOrder(pizza: Pizza, table: number, accessToken: string) {
    const toppingApiVersions = pizza.toppings.map((topping) => topping.apiVersion);

    const data: PizzaApiData = {
        Crust: pizza.crust.apiVersion,
        Flavor: `CHEESE${toppingApiVersions.length > 0 ? '-' : ''}${toppingApiVersions.join("-")}`,
        Size: pizza.size.apiVersion,
        Table_No: table,
    }

    const response = await fetch(`${API_BASE}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${accessToken}`,
        },
        body: JSON.stringify(data),
    })
    console.log(response);
}

export async function loginHeb(username: FormDataEntryValue | null, password: FormDataEntryValue | null): Promise<string> {
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
