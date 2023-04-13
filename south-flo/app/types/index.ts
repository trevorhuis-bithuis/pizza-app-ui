export type Table = {
    id: number
    name: string
}

export type Pizza = {
    id: string;
    price: number;
    crust: Crust;
    toppings: Topping[];
    size: Size;
}

export type PizzaChoice = {
    id: string;
    name: string;
    price: number;
    apiVersion: string;
}

export type Crust = PizzaChoice;
export type Topping = PizzaChoice;
export type Size = PizzaChoice;