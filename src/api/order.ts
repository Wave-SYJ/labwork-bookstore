import { NextApiRequestCookies } from 'next/dist/server/api-utils';
import Order from '../models/Order';
import { CartItem } from '../utils/cart';
import request, { withAuth } from '../utils/request';

export async function submitOrder(targetPlace: string, creditCard: string, items: CartItem[]) {
  await request({
    url: '/api/order',
    method: 'post',
    data: {
      targetPlace,
      creditCard,
      items
    }
  });
}

export async function getMyOrders(cookies?: NextApiRequestCookies) {
  const { data } = await withAuth(
    request,
    {
      url: '/api/order',
      method: 'get'
    },
    cookies
  );
  return data.data as Order[];
}
