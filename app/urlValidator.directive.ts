import { Directive, ElementRef, HostListener, Input, Output, EventEmitter, Renderer, OnChanges, SimpleChange } from '@angular/core';

@Directive({
    selector: '[url-validate]'
})

export class UrlValidator implements OnChanges {
    @Input('url-validate') value: string;
    @Input('validator-pattern') pattern: RegExp;
    @Input('valid-model') valid: boolean;
    @Output('valid-url') urlEmitter: EventEmitter<string> = new EventEmitter();
    @Output('valid-update') validEmitter: EventEmitter<boolean> = new EventEmitter();
    
    private lastValidUrl: string;
    
    validateUrl(url: string) {
        if (this.pattern) {
            var el = this.element.nativeElement;
            
            this.valid = this.pattern.test(url);
            this.validEmitter.emit(this.valid);
            
            if (this.valid && url != this.lastValidUrl) {
                this.urlEmitter.emit(url);
                
                this.lastValidUrl = url;
            }
            
            this.renderer.setElementClass(el, 'valid', this.valid);
            this.renderer.setElementClass(el, 'invalid', !this.valid);
            this.renderer.setElementClass(el, 'dirty', typeof url !== 'undefined');
        }
    }
    
    ngOnChanges(changes: any) {
        if (typeof changes.value.currentValue === 'string') {
            this.validateUrl(changes.value.currentValue.trim());
        }
    }
    
    constructor(private element: ElementRef, private renderer: Renderer) {
        
    }
}