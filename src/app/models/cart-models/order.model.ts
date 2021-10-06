export class OrderModel {
    public orderId: number;
    public userId: number;
    public uuid: string;
    public cartId: number;
    public orderPayout: number;
    public orderDate: Date;
    public shippingCity: string;
    public shippingStreet: string;
    public shippingDate: Date;
    public lastCreditDigits: string;
}