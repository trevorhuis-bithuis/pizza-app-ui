import type { LoaderArgs } from "@remix-run/node";
import Navbar from "~/components/navbar";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
};

export default function History() {
    return (
        <>
            <Navbar />
            <p>history</p>
        </>

    );
}