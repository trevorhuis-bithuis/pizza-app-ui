import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";
import { createCart } from "~/services/cart.server";
import { loginHeb } from "./hebPizzaApi";

type User = {
    "accessToken": string;
}

async function login(username: FormDataEntryValue | null, password: FormDataEntryValue | null) {
    const accessToken = await loginHeb(username, password);

    const sessionToken = await createCart(accessToken);

    return { accessToken, sessionToken } as User;
}

export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
    new FormStrategy(async ({ form }) => {
        let username = form.get("username");
        let password = form.get("password");
        let accessToken = await login(username, password);
        return accessToken;
    }),
    "user-pass"
);