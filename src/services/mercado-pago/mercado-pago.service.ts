import { Injectable } from '@nestjs/common';
import * as mercadopago from 'mercadopago';
import { CreatePaymentPayload } from 'mercadopago/models/payment/create-payload.model';
import { CreatePreferencePayload } from 'mercadopago/models/preferences/create-payload.model';
import { PaymentUpdateResponse } from 'mercadopago/resources/payment';
import { PreferenceGetResponse } from 'mercadopago/resources/preferences';

@Injectable()
export class MercadoPagoService {
  constructor() {
    mercadopago.configure({
      access_token:
        'TEST-4921405090635707-112513-91fc95e15185246e91bc6b5245df5110__LD_LB__-160762105',
    });
  }

  async createPaymentLink(datosPago: any): Promise<PreferenceGetResponse> {
    const { id, email, amount, title } = datosPago;

    const preference: CreatePreferencePayload = {
      items: [
        {
          title,
          quantity: 1,
          currency_id: 'ARS',
          unit_price: parseFloat(amount),
        },
      ],
      payer: {
        email: email,
      },
      back_urls: {
        success: `${process.env.NODE_ENV}/appointment/confirm/${id}`,
        failure: 'https://www.tu-pagina.com/pago-fallido',
        pending: 'https://www.tu-pagina.com/pago-pendiente',
      },
      auto_return: 'approved',
    };

    const response = await mercadopago.preferences.create(preference);
    const url = await mercadopago.preferences.get(response.body.id);
    return url;
  }

  async payToUser(datosPago: any): Promise<void> {
    //TODO: Generar una orden de retiro para hacer un retiro a la cuenta del usuario
  }

  async cancelPaymentLink(paymentId: string): Promise<PaymentUpdateResponse> {
    console.log("🚀 ~ file: mercado-pago.service.ts:50 ~ MercadoPagoService ~ cancelPaymentLink ~ paymentId:", paymentId)
    console.log(await mercadopago.payment.get(+paymentId));
    return await mercadopago.payment.cancel(+paymentId);
  }
}
