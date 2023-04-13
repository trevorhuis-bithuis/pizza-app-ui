import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { Form, Link } from "@remix-run/react";
import { useEffect, useState } from "react";
import Navbar from "~/components/navbar";
import TableSelect from "~/components/tableSelect";
import { authenticator } from "~/services/auth.server";
import type { Pizza, Table } from "~/types";

let tables: Table[] = [{ id: 0, name: 'Select a table' }]

for (let i = 1; i <= 20; i++) {
    tables.push({
        id: i,
        name: `Table ${i}`,
    })
}

export async function loader({ request }: LoaderArgs) {
    return await authenticator.isAuthenticated(request, {
        failureRedirect: "/login",
    });
};

export async function action({ request }: ActionArgs) {

}

export default function Cart() {
    const [pizzas, setPizzas] = useState<Pizza[]>([]);
    const [table, setTable] = useState<Table>({ id: 0, name: 'Select a table' });

    useEffect(() => {
        updateCart();
    }, []);


    function updateCart() {
        const cart = JSON.parse(window.localStorage.getItem('cart') || '[]');
        setPizzas(cart);
    }

    function createDollarDisplay(price: number) {
        return `$${price.toFixed(2)}`;
    }

    function calculateSubTotal() {
        return pizzas.reduce((acc, pizza) => acc + pizza.price, 0);
    }

    function calculateTax() {
        return Math.round(((calculateSubTotal()) * 0.0825) * 100) / 100;
    }

    function removePizzaFromCart(id: string) {
        const cart = JSON.parse(window.localStorage.getItem('cart') || '[]');
        const newCart = cart.filter((pizza: Pizza) => pizza.id !== id);
        window.localStorage.setItem('cart', JSON.stringify(newCart));
        updateCart();
    }

    return (
        <>
            <Navbar />
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:px-0">
                <h1 className="text-center text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

                <Form className="mt-12">
                    <section aria-labelledby="cart-heading">
                        <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                            {pizzas.map((pizza) => (
                                <li key={pizza.id} className="flex py-6">
                                    <div className="flex-shrink-0">
                                        🍕
                                    </div>

                                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                                        <div>
                                            <div className="flex justify-between">
                                                <h4 className="text-sm">
                                                    {pizza.size.name} Pizza - {pizza.crust.name} Crust
                                                </h4>
                                                <p className="ml-4 text-sm font-medium text-gray-900">${pizza.price}</p>
                                            </div>
                                            <div className="m-4">
                                                <ul className="list-disc">
                                                    {pizza.toppings.map((topping) => (
                                                        <li key={topping.id} className="text-sm">{topping.name}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex flex-1 items-end justify-between">
                                            <div className="ml-4">
                                                <button type="button" className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                                                    onClick={() => { removePizzaFromCart(pizza.id) }}>
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </section>

                    <section aria-labelledby="summary-heading" className="mt-10 ">
                        <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
                            <h2 id="summary-heading" className="sr-only">
                                Order summary
                            </h2>

                            <div className="flow-root">
                                <dl className="-my-4 divide-y divide-gray-200 text-sm">
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Subtotal</dt>
                                        <dd className="font-medium text-gray-900">{createDollarDisplay(calculateSubTotal())}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-gray-600">Tax</dt>
                                        <dd className="font-medium text-gray-900">{createDollarDisplay(calculateTax())}</dd>
                                    </div>
                                    <div className="flex items-center justify-between py-4">
                                        <dt className="text-base font-medium text-gray-900">Order total</dt>
                                        <dd className="text-base font-medium text-gray-900">{createDollarDisplay(calculateSubTotal() + calculateTax())}</dd>
                                    </div>
                                </dl>
                            </div>
                        </div>

                        <TableSelect tables={tables} setTable={setTable} />

                        <div className="mt-10">
                            <button
                                type="submit"
                                className="disabled:opacity-50 w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                                disabled={table.id === 0 || pizzas.length === 0}
                            >
                                Checkout
                            </button>
                        </div>

                        <div className="mt-6 text-center text-sm text-gray-500">
                            <p>
                                or
                                <Link to="/order" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    {' '}Continue Ordering
                                    <span aria-hidden="true"> &rarr;</span>
                                </Link>
                            </p>
                        </div>
                    </section>

                </Form>
            </div>
        </>

    );
}