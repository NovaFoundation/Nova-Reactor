import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';

import { GithubService } from '../services/github.service';

declare function autoCompleteEnd(value: string, end: string);

@Component({
    moduleId: module.id,
    selector: 'config-setup',
    templateUrl: 'configSetup.component.html'
})

export class ConfigSetup implements OnChanges, OnInit {
    @Input() repo: any;
    @Output('onErrorReceived') onErrorReceivedEmitter: EventEmitter<any> = new EventEmitter();
    
    constructor(private github: GithubService) {}
    
    ngOnInit() {
        
    }
    
    ngOnChanges(changes: any) {
        
    }
    
    validMainClassLocation(location: string) {
        return location && location.length > 0;
    }
    
    invalidMainClassLocation(location: string) {
        return typeof location === 'string' && !this.validMainClassLocation(location);
    }
    
    validateMainClassLocation(location: string) {
        this.repo.validClassLocation = this.validMainClassLocation(location);
    }
    
    writeConfigFile() {
        var location = this.repo.mainClassLocation.trim()
        location += autoCompleteEnd(location, '.nova');
        
        this.github.writeFile(this.repo.user.login, this.repo.name, ".reactor.yml", ".reactor.yml", "Added .reactor.yml config file", "language: nova\nmainClassLocation: " + location).subscribe(response => {
            console.log("Wrote: ", response);
            
            this.repo.configStatus = "written";
        }, error => this.onErrorReceivedEmitter.emit({ response: error, type: "create-config" }));
    }
    
    autoCompleteEnd(value: string, end: string) {
        return autoCompleteEnd(value, end);
    }
}