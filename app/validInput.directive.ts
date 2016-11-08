import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Patterns } from './Patterns';

@Directive({ selector: '[validate-input]' })

export class HighlightDirective {
    
    constructor(el: ElementRef, renderer: Renderer) {
        
/*        d3.select(el.nativeElement).on("keyup", function () {
            var valid = Patterns.validRepoPattern.test(el.nativeElement.value);
            
            renderer.setElementClass(el.nativeElement, 'valid', valid);
            renderer.setElementClass(el.nativeElement, 'invalid', !valid);
            renderer.setElementClass(el.nativeElement, 'dirty', true);
        });*/
    }
}