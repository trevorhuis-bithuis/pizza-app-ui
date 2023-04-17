import type { PizzaChoice } from "~/types";

type OrderSelectProps = {
  items: PizzaChoice[];
  defaultChoice: string;
  setSelected: (obj: PizzaChoice) => void;
  name: string;
};

export default function OrderRadioSelect(props: OrderSelectProps) {
  const { items, setSelected, name, defaultChoice } = props;

  function handleSetSelected(e: React.ChangeEvent<HTMLInputElement>) {
    const selected = items.find((item) => item.id === e.target.id);
    setSelected(selected!);
  }

  return (
    <div>
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
                  value={item.id}
                  type="radio"
                  defaultChecked={item.id === defaultChoice}
                  className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  onChange={handleSetSelected}
                />
              </div>
              <div className="ml-3 text-sm leading-6">
                <label htmlFor={item.id} className="font-medium text-gray-900">
                  {item.name}
                </label>{" "}
                <span id={`${item.id}-description`} className="text-gray-500">
                  ${item.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </div>
  );
}
