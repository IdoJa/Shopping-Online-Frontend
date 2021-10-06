import { Directive, ElementRef, Renderer2  } from '@angular/core';


declare const require: any;
const html2pdf = require('html2pdf.js');  

@Directive({
  selector: '[appInvoice]'
})
export class InvoiceDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }
  
  public createInvoice() {
    const invoiceRenderer = this.renderer.selectRootElement(this.elementRef);
    
    const options = {
      filename: 'result.pdf',
      pageBreak: { mode: 'css', after: '.break-page' },
      image: { type: 'jpeg', quality: 1 },
      html2canvas: {
        dpi: 192,
        scale: 2,
        letterRendering: true,
        useCORS: false
      },
      jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' }
    };

    const content: Element = invoiceRenderer.nativeElement.innerHTML;

    html2pdf()
      .set(options)
      .from(content)
      .toPdf()
      .get('pdf')
      .save();
  }

}
