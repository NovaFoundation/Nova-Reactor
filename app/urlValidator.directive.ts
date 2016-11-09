import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer, OnChanges, SimpleChange } from '@angular/core';
import { Patterns } from './Patterns';

@Directive({
    selector: '[url-validate]',
    host: {
        "(onUrlUpdated)": "validateUrl($event)"
    }
})

export class UrlValidator implements OnChanges {
    @Input('url-validate') value: string;
    
    validateUrl(url: string) {
        var el = this.element.nativeElement;
        
        var valid = Patterns.validRepoPattern.test(url);
        
        this.renderer.setElementClass(el, 'valid', valid);
        this.renderer.setElementClass(el, 'invalid', !valid);
        this.renderer.setElementClass(el, 'dirty', typeof url !== 'undefined');
    }
    
    ngOnChanges(changes) {
        this.validateUrl(changes.value.currentValue);
    }
    
    constructor(private element: ElementRef, private renderer: Renderer) {
        
    }
}