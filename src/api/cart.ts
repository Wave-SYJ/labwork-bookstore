import { CartItem } from '../utils/cart';
import request from '../utils/request';

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
