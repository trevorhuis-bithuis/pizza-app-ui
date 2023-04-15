import type { Crust, Size, Topping } from "~/types";

type OrderSelectProps = {
    crust: Crust;
    toppings: Topping[];
    size: Size;
}

export default function OrderRadioSelect(props: OrderSelectProps) {

    const { crust, toppings, size } = props;


    return (
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
    )
}