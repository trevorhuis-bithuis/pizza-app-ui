import type { LoaderArgs } from "@remix-run/node";
import Navbar from "~/components/navbar";
import { authenticator } from "~/services/auth.server";
import OrderSelect from "~/components/orderSelect";
// import { useState } from "react";

export async function loader({ request }: LoaderArgs) {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
};

const sizes = [
    { id: 'small', name: 'Small', price: 10, apiVersion: 'S' },
    { id: 'medium', name: 'Medium', price: 13, apiVersion: 'M' },
    { id: 'large', name: 'Large', price: 15, apiVersion: 'L' },
    { id: 'extra-large', name: 'Extra Large', price: 18, apiVersion: 'XL' },
]

const toppings = [
    { id: 'pepperoni', name: 'Pepperoni', price: 2, apiVersion: 'PEPPERONI' },
    { id: 'sausage', name: 'Sausage', price: 2, apiVersion: 'SAUSAGE' },
    { id: 'mushrooms', name: 'Mushrooms', price: 1, apiVersion: 'MUSHROOMS' },
    { id: 'onions', name: 'Onions', price: 1, apiVersion: 'ONIONS' },
    { id: 'green-peppers', name: 'Green Peppers', price: 1, apiVersion: 'GREEN_PEPPERS' },
]

const crusts = [
    { id: 'normal', name: 'Normal', price: 0, shortened: 'NORMAL' },
    { id: 'thin', name: 'Thin', price: 2, apiVersion: 'THIN' },
    { id: 'detroit', name: 'Detroit Style', price: 4, apiVersion: 'DETROIT' },
]

export default function Order() {
    // const [size, setSize] = useState(sizes[0]);
    // const [crust, setCrust] = useState(crusts[0]);
    // const [flavor, setFlavor] = useState(toppings[0]);

    // const addCartItem = async () => {
    //     const cart = JSON.parse(window.localStorage.getItem('cart') || '[]');
    //     cart.push({ id: 1, name: 'Pizza', price: 10 });

    //     window.localStorage.setItem('cart', JSON.stringify(cart));
    // }

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <div className="my-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Order</h1>
                </div>

                <div className="space-y-6">
                    <OrderSelect items={sizes} name="Size" setSelected={() => console.log('change')} />

                    <OrderSelect items={crusts} name="Crust" setSelected={() => console.log('change')} />

                    <div>
                        <h2 className="text-lg">Toppings</h2>
                        <fieldset>
                            <legend className="sr-only">Toppings</legend>
                            <div className="space-y-2">
                                {toppings.map((topping) => (
                                    <div key={topping.id} className="relative flex items-start">
                                        <div className="flex h-6 items-center">
                                            <input
                                                id="comments"
                                                aria-describedby="comments-description"
                                                name="comments"
                                                type="checkbox"
                                                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                            />
                                        </div>
                                        <div className="ml-3 text-sm leading-6">
                                            <label htmlFor="comments" className="font-medium text-gray-900">
                                                {topping.name}
                                            </label>{' '}
                                            <span id={`${topping.id}-description`} className="text-gray-500">
                                                ${topping.price}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </fieldset>
                    </div>

                </div>



            </div>
        </>

    );
}