import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";


type User = {
    "access_token": string;
}

async function login(username: FormDataEntryValue | null, password: FormDataEntryValue | null) {
    const response = await fetch("https://pizza-api-app.herokuapp.com/api/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username,
            password,
        }),
    });
    const user = await response.json();
    return user;
}

export let authenticator = new Authenticator<User>(sessionStorage);

authenticator.use(
    new FormStrategy(async ({ form }) => {
        let username = form.get("username");
        let password = form.get("password");
        let user = await login(username, password);
        return user;
    }),
    "user-pass"
);