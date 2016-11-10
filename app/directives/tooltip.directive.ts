import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
    selector: "[tooltip]",
    host: {
        '(mouseover)': 'onMouseEnter()',
        '(mouseout)': 'onMouseExit()'
    }
})

export class Tooltip implements OnInit {
    @Input() tooltip: string;
    @Input() position: string;
    @Input('horizontal-margin') horizontalMargin: number;
    @Input('vertical-margin') verticalMargin: number;
    @Input('tooltip-max-width') maxWidth: string;
    
    tooltipElement: HTMLDivElement;
    
    horizontalPosition: string;
    verticalPosition: string;
    
    static horizontalPositions: string[] = [ "left", "right" ];
    static verticalPositions: string[] = [ "top", "bottom" ];
    
    constructor(private element: ElementRef) {}
    
    ngOnInit() {
        if (this.position) {
            var positions = this.parsePositions(this.position.split(/\s+/));
            
            if (positions.length == 1) {
                if (this.horizontalPosition) { // set vertical
                    this.verticalPosition = "middle";
                } else { // set horizontal
                    this.horizontalPosition = "center";
                }
            }
        } else {
            this.horizontalPosition = "center";
            this.verticalPosition = "top";
        }
        if (typeof this.horizontalMargin === 'undefined') {
            this.horizontalMargin = 5;
        }
        if (typeof this.verticalMargin === 'undefined') {
            this.verticalMargin = 5;
        }
    }
    
    onMouseEnter() {
        var x = this.element.nativeElement.offsetLeft;
        var y = this.element.nativeElement.offsetTop;
        
        if (!this.tooltipElement) {
            var e = document.createElement("div");
            
            e.className += " tooltip hidden";
            e.innerHTML = this.tooltip;
            e.style.left = x + "px";
            e.style.top = y + "px";
            
            if (this.maxWidth) {
                e.style.maxWidth = this.maxWidth;
            }
            
            document.body.appendChild(e);
            
            if (this.verticalPosition == "top") {
                e.style.top = (y - e.offsetHeight - this.verticalMargin) + "px";
            } else if (this.verticalPosition == "middle") {
                e.style.top = (y + this.element.nativeElement.offsetHeight / 2 - e.offsetHeight / 2) + "px";
            } else if (this.verticalPosition == "bottom") {
                e.style.top = (y + this.element.nativeElement.offsetHeight + this.verticalMargin) + "px";
            }
            if (this.horizontalPosition == "left") {
                e.style.left = (x - e.offsetWidth - this.horizontalMargin) + "px";
            } else if (this.horizontalPosition == "center") {
                e.style.left = (x + this.element.nativeElement.offsetWidth / 2 - e.offsetWidth / 2) + "px";
            } else if (this.horizontalPosition == "right") {
                e.style.left = (x + this.element.nativeElement.offsetWidth + this.horizontalMargin) + "px";
            }
            
            this.tooltipElement = e;
        }
        
        this.tooltipElement.classList.remove("hidden");
    }
    
    onMouseExit() {
        this.tooltipElement.classList.add("hidden");
    }
    
    parsePositions(positions: string[]) {
        positions.forEach((position, index) => {
            if (!this.horizontalPosition && Tooltip.horizontalPositions.indexOf(position) >= 0) {
                this.horizontalPosition = position;
            } else if (!this.verticalPosition && Tooltip.verticalPositions.indexOf(position) >= 0) {
                this.verticalPosition = position;
            } else if (position == "middle") {
                this.verticalPosition = position;
            } else if (position == "center") {
                this.horizontalPosition = position;
            } else {
                console.error("Invalid position '" + position + "'")
            }
        });
        
        return positions;
    }
}