import { ICart } from "@interfaces";

export const formatNumericArray = (array: string[]) =>
  array
    .map((number) => Number(number))
    .sort((a, b) => a - b)
    .join(", ");

export const formatPrice = (price: number) =>
  `R$ ${price.toFixed(2).replace(".", ",")}`;

export const calculateTotal = (cart: ICart[]) => {
  const total = cart.reduce((acc, cur) => acc + cur.game.price, 0);
  return total;
};
