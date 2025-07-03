

export class CreatePaymentDto {
  orderId: number;
  amount: number;
  method: string;
  transactionDetails: {
    transactionId: string;
    paymentStatus: string;
  };
  //status?: PaymentStatus;
}
