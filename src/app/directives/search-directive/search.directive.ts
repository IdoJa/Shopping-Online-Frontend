import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appSearch]'
})
export class SearchDirective {

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  public clearSearch(): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', '');
  }
}
