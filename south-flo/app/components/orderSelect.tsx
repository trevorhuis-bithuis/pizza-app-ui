
type OrderSelectProps = {
    items: any[];
    setSelected: () => void;
    name: string;
}

export default function OrderSelect(props: OrderSelectProps) {

    const { items, setSelected, name } = props;

    return (
        <div>
            <h1 className="text-xl">{name}</h1>
            <fieldset id="sizes-select">
                <legend className="sr-only">{name}</legend>
                <div className="space-y-2">
                    {items.map((item) => (
                        <div key={item.id} className="relative flex items-start">
                            <div className="flex h-6 items-center">
                                <input
                                    id={item.id}
                                    aria-describedby={`${item.id}-description`}
                                    name={name}
                                    type="radio"
                                    defaultChecked={item.id === 'normal'}
                                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                    onChange={setSelected}
                                />
                            </div>
                            <div className="ml-3 text-sm leading-6">
                                <label htmlFor={item.id} className="font-medium text-gray-900">
                                    {item.name}
                                </label>{' '}
                                <span id={`${item.id}-description`} className="text-gray-500">
                                    ${item.price}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </fieldset>
        </div>
    )
}