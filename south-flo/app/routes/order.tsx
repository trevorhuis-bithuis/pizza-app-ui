import type { LoaderArgs } from "@remix-run/node";
import Navbar from "~/components/navbar";
import { authenticator } from "~/services/auth.server";

export async function loader({ request }: LoaderArgs) {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
};
export default function Order() {
    const addCartItem = async () => {
        const cart = JSON.parse(window.localStorage.getItem('cart') || '[]');
        cart.push({ id: 1, name: 'Pizza', price: 10 });

        window.localStorage.setItem('cart', JSON.stringify(cart));
    }

    return (
        <>
            <Navbar />
            <div className="m-2 ">
                <button className="rounded-md" onClick={addCartItem}>Order</button>
            </div>
        </>

    );
}