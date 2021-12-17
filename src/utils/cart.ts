import Cookies from 'js-cookie';
import { NextApiRequestCookies } from 'next/dist/server/api-utils';

export interface CartItem {
  id: string;
  count: number;
}

export function addBookToCart(id: string, count?: number) {
  const cartList = getCartList();
  cartList.push({
    id,
    count: count ?? 1
  });
  Cookies.set('cart', JSON.stringify(cartList));
}

export function removeBookFromCart(id: string) {
  const cartList = getCartList();
  Cookies.set(
    'cart',
    cartList.filter((item) => item.id !== id)
  );
}

export function clearCart() {
  Cookies.remove('cart');
}

export function getCartList(cookies?: NextApiRequestCookies): CartItem[] {
  const str = cookies ? cookies['cart'] : Cookies.get('cart');
  if (str === undefined || str === '') return [];
  return JSON.parse(str);
}
