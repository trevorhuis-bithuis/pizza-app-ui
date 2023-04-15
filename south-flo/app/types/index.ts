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

export type PizzaFormData = {
    crust: string;
    toppings: string[];
    size: string;
    price: string;
}

export type PizzaApiData = {
    Crust: string;
    Flavor: string;
    Order_ID?: number;
    Size: string;
    Table_No: number;
    Timestamp?: string;
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