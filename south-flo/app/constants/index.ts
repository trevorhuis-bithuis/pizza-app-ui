import type { Crust, Size, Table, Topping } from "~/types";

export const sizeChoices: Size[] = [
  { id: "small", name: "Small", price: 10, apiVersion: "S" },
  { id: "medium", name: "Medium", price: 13, apiVersion: "M" },
  { id: "large", name: "Large", price: 15, apiVersion: "L" },
  { id: "extra-large", name: "Extra Large", price: 18, apiVersion: "XL" },
];

export const toppingsChoices: Topping[] = [
  { id: "pepperoni", name: "Pepperoni", price: 2, apiVersion: "PEP" },
  { id: "sausage", name: "Sausage", price: 2, apiVersion: "SSG" },
  { id: "mushrooms", name: "Mushrooms", price: 1, apiVersion: "MSHROM" },
  { id: "onions", name: "Onions", price: 1, apiVersion: "ONION" },
  { id: "green-peppers", name: "Green Peppers", price: 1, apiVersion: "GRNP" },
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
