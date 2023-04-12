import { Authenticator } from "remix-auth";
import { sessionStorage } from "~/services/session.server";
import { FormStrategy } from "remix-auth-form";


type AccessToken = {
    "accessToken": string;
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
    if (!response.ok) {
        throw new Error("Login failed");
    }
    const responseJson = await response.json();
    return { accessToken: responseJson["access_token"] } as AccessToken;
}

export let authenticator = new Authenticator<AccessToken>(sessionStorage);

authenticator.use(
    new FormStrategy(async ({ form }) => {
        let username = form.get("username");
        let password = form.get("password");
        let accessToken = await login(username, password);
        return accessToken;
    }),
    "user-pass"
);