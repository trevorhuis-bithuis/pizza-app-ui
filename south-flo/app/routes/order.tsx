import type { LoaderArgs } from "@remix-run/node";
import Navbar from "~/components/navbar";
import { authenticator } from "~/services/auth.server";
import OrderRadioSelect from "~/components/orderRadioSelect";
import { useRef, useState } from "react";
import shortUUID from "short-uuid";
import OrderAddedToCartAlert from "~/components/orderAddedToCart";
import { Form } from "@remix-run/react";
import type { Size, Topping, Crust } from "~/types";


export async function loader({ request }: LoaderArgs) {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
};

const sizeChoices: Size[] = [
    { id: 'small', name: 'Small', price: 10, apiVersion: 'S' },
    { id: 'medium', name: 'Medium', price: 13, apiVersion: 'M' },
    { id: 'large', name: 'Large', price: 15, apiVersion: 'L' },
    { id: 'extra-large', name: 'Extra Large', price: 18, apiVersion: 'XL' },
]

const toppingsChoices: Topping[] = [
    { id: 'pepperoni', name: 'Pepperoni', price: 2, apiVersion: 'PEPPERONI' },
    { id: 'sausage', name: 'Sausage', price: 2, apiVersion: 'SAUSAGE' },
    { id: 'mushrooms', name: 'Mushrooms', price: 1, apiVersion: 'MUSHROOMS' },
    { id: 'onions', name: 'Onions', price: 1, apiVersion: 'ONIONS' },
    { id: 'green-peppers', name: 'Green Peppers', price: 1, apiVersion: 'GREEN_PEPPERS' },
]

const crustChoices: Crust[] = [
    { id: 'normal', name: 'Normal', price: 0, apiVersion: 'NORMAL' },
    { id: 'thin', name: 'Thin', price: 2, apiVersion: 'THIN' },
    { id: 'detroit', name: 'Detroit Style', price: 4, apiVersion: 'DETROIT' },
]

export default function Order() {
    const [size, setSize] = useState<Size>(sizeChoices[0]);
    const [crust, setCrust] = useState<Crust>(crustChoices[0]);
    const [toppings, setToppings] = useState<Topping[]>([]);
    const [orderComplete, setOrderComplete] = useState(false);
    let formRef = useRef<HTMLFormElement>(null);

    function calculatePizzaPrice() {
        return size.price + toppings.reduce((acc, topping) => acc + (topping.price), 0) + crust.price
    }

    const addPizzaToCart = async () => {
        try {
            const cart = JSON.parse(window.localStorage.getItem('cart') || '[]');
            cart.push({ id: shortUUID.uuid(), price: calculatePizzaPrice(), crust, size, toppings });

            window.localStorage.setItem('cart', JSON.stringify(cart));
            setOrderComplete(true);
            setSize(sizeChoices[0]);
            setCrust(crustChoices[0]);
            setToppings([]);
            formRef.current?.reset();
        } catch (error) {
            console.error(error);
            setOrderComplete(false);
        }
    }

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

                <div className="my-6">
                    <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Order</h1>
                </div>

                {orderComplete && (
                    <OrderAddedToCartAlert dismissAlert={() => { setOrderComplete(false); window.location.reload() }} />
                )}

                <div className="grid lg:grid-cols-2">
                    <div className="space-y-6">

                        <Form ref={formRef}>
                            <OrderRadioSelect items={sizeChoices} name="Size" setSelected={setSize} defaultChoice="small" />

                            <OrderRadioSelect items={crustChoices} name="Crust" setSelected={setCrust} defaultChoice="normal" />

                            <div>
                                <h2 className="text-lg">Toppings</h2>
                                <fieldset>
                                    <legend className="sr-only">Toppings</legend>
                                    <div className="space-y-2">
                                        {toppingsChoices.map((topping) => (
                                            <div key={topping.id} className="relative flex items-start">
                                                <div className="flex h-6 items-center">
                                                    <input
                                                        id="toppings"
                                                        aria-describedby={`${topping.id}-description`}
                                                        name="toppings"
                                                        type="checkbox"
                                                        className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                        onChange={(e) => {
                                                            if (e.target.checked) {
                                                                setToppings([...toppings, topping]);
                                                            } else {
                                                                setToppings(toppings.filter((t) => t.id !== topping.id));
                                                            }
                                                        }}
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm leading-6">
                                                    <label htmlFor="toppings" className="font-medium text-gray-900">
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
                        </Form>

                    </div>

                    <div className="bg-white shadow overflow-hidden rounded-lg my-4">
                        <div className="px-4 py-5 sm:px-6">
                            <h2 className="text-lg leading-6 font-medium text-gray-900">Order Summary</h2>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Review your order before submitting.</p>
                        </div>
                        <div className="grid grid-rows-auto justify-center border-t border-gray-200 space-y-4 mb-4">
                            <div>
                                <table className="min-w-full">
                                    <thead className="bg-white">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3">
                                                Item
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Price
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white">
                                        <tr
                                            className="border-gray-200 border-t"
                                        >
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{size.name} Pizza</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${size.price}</td>
                                        </tr>
                                        <tr
                                            className="border-gray-200 border-t"
                                        >
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{crust.name} Crust</td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{crust.price === 0 ? 'Included' : `$${crust.price}`}</td>
                                        </tr>
                                        <tr className="border-t border-gray-200">
                                            <th
                                                colSpan={5}
                                                scope="colgroup"
                                                className="bg-gray-50 py-2 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                                            >
                                                Toppings
                                            </th>
                                        </tr>
                                        {toppings.map((topping) => (
                                            <tr
                                                key={topping.id}
                                                className="border-gray-200 border-t"
                                            >
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{topping.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">${topping.price}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                            </div>
                            <div className="text-center">Total: ${calculatePizzaPrice()}</div>
                            <button className="w-72 rounded-md bg-slate-800 px-3 py-2 text-sm font-semibold text-white hover:bg-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-800"
                                onClick={addPizzaToCart}
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </>

    );
}