import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  selector: '[appRutFormat]'
})
export class RutFormatDirective {
  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event']) onInput(event: any): void {
    let value = event.target.value;
    value = value.replace(/\D/g, ''); // Elimina todos los caracteres que no son números

    // Agrega los puntos y el guión
    if (value.length > 1) {
      const formattedRut = value
        .substring(0, value.length - 1)
        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
        + '-' + value.charAt(value.length - 1);
      this.el.nativeElement.value = formattedRut;
    } else {
      this.el.nativeElement.value = value;
    }
  }
}
