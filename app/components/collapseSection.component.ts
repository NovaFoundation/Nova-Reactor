import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'collapse-section',
    templateUrl: 'collapseSection.component.html'
})

export class CollapseSection implements OnChanges, OnInit {
    @Input() closed: boolean = false;
    @Input() openDelay: number = 0;
    
    closedValue: boolean = closed;
    
    private timeoutId: NodeJS.Timer;
    
    ngOnInit() {
        this.closedValue = this.closed;
    }
    
    ngOnChanges(changes: any) {
        if (changes.closed) {
            if (this.timeoutId) {
                clearTimeout(this.timeoutId);
            }
            
            if (this.openDelay > 0 && !changes.closed.currentValue && this.closedValue) {
                this.timeoutId = setTimeout(() => {
                    this.closedValue = changes.closed.currentValue;
                    
                    this.timeoutId = null;
                }, this.openDelay);
            } else {
                this.closedValue = changes.closed.currentValue;
            }
        }
    }
}