import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InvoiceModel } from 'src/app/models/info-models/invoice.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private httpClient: HttpClient) { }

  // Get Invoice details by cartId
  public async getInvoiceDetailsByCartId(cartId: number): Promise<InvoiceModel[]> {
    const invoiceDetails = await this.httpClient.get<InvoiceModel[]>(environment.invoiceUrl + "cart/" + cartId).toPromise();
    return invoiceDetails;
  }
}
