import Cookies from 'js-cookie';

export function addBookToCart(id: string) {
  const cartList = getCartList();
  cartList.push(id);
  Cookies.set('cart', JSON.stringify(cartList));
}

export function removeBookFromCart(id: string) {
  const cartList = getCartList();
  Cookies.set(
    'cart',
    cartList.filter((bookId) => bookId !== id)
  );
}

export function getCartList(): string[] {
  const str = Cookies.get('cart');
  if (str === undefined || str === '') return [];
  return JSON.parse(str);
}
