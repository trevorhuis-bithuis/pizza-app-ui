import type { Crust, Size, Table, Topping } from "~/types";

export const sizeChoices: Size[] = [
  { id: "small", name: "Small", price: 10, apiVersion: "S" },
  { id: "medium", name: "Medium", price: 13, apiVersion: "M" },
  { id: "large", name: "Large", price: 15, apiVersion: "L" },
  { id: "extra-large", name: "Extra Large", price: 18, apiVersion: "XL" },
];

export const toppingsChoices: Topping[] = [
  { id: "pepperoni", name: "Pepperoni", price: 2, apiVersion: "PEP" },
  { id: "chicken", name: "Chicken", price: 2, apiVersion: "CHICKEN" },
  { id: "beef", name: "Beef", price: 1, apiVersion: "BEEF" },
  { id: "onions", name: "Onions", price: 1, apiVersion: "ONION" },
  { id: "fajita", name: "Fajita Veggies", price: 1, apiVersion: "FAJITA" },
];

export const crustChoices: Crust[] = [
  { id: "normal", name: "Normal", price: 0, apiVersion: "NORMAL" },
  { id: "thin", name: "Thin", price: 2, apiVersion: "THIN" },
  { id: "detroit", name: "Detroit Style", price: 4, apiVersion: "DETROIT" },
];

export const tables: Table[] = [{ id: 0, name: "Select a table" }];

for (let i = 1; i <= 10; i++) {
  tables.push({
    id: i,
    name: `Table ${i}`,
  });
}

export const testimonials = [
  {
    id: 1,
    quote: `I've tried pizza all over the world, but I have to say, the pizza at this restaurant is simply unbeatable. From the crispy crust to the perfectly balanced toppings, every bite is a delight. It's no wonder they're always packed!`,
    attribution: "Sarah Peters, Houston",
  },
  {
    id: 2,
    quote: `I'm a self-proclaimed pizza connoisseur, and I can confidently say that this restaurant makes the best pizza in town. The sauce is rich and tangy, the cheese is melty and gooey, and the crust has just the right amount of chewiness. It's the kind of pizza that keeps you coming back for more.`,
    attribution: "Kelly McPherson, Austin",
  },
  {
    id: 3,
    quote: `I recently discovered this hidden gem of a pizza place, and I am blown away by how good the pizza is. The ingredients are fresh and high-quality, and the flavors are out of this world. I can't believe I've been missing out on this pizza for so long!`,
    attribution: "Chris Paul, San Antonio",
  },
];
