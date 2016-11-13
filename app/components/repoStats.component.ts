import { Component, EventEmitter, Input, Output, OnChanges, OnInit } from '@angular/core';

import { GithubService } from '../services/github.service';
import { ReactorCoreService } from '../services/reactorCore.service';

@Component({
    moduleId: module.id,
    selector: 'repo-stats',
    templateUrl: 'repoStats.component.html'
})

export class RepoStats implements OnChanges, OnInit {
    @Input() repo: any;
    @Input() host: string;
    
    constructor(private core: ReactorCoreService, private github: GithubService) {}
    
    ngOnInit() {
        //this.updatedRepo();
    }
    
    ngOnChanges(changes: any) {
        if (changes.repo) {
            this.updatedRepo();
        }
    }
    
    updatedRepo() {
        this.core.getBuilds(this.host + "," + this.repo.full_name.replace("/", ",")).subscribe(builds => {
            console.log("Received builds: ", builds);
            
            this.updateData([builds.map(build => {
                return build.endTime - build.startTime;
            })]);
        }, error => {
            console.log("Received error ", error);
        });
    }
    
    barChartOptions: any = {
        scaleShowVerticalLines: false,
        responsive: true
    };
    
    barChartLabels: string[] = ['C', 'Java'];
    barChartColors: any[] = [{
        backgroundColor: 'rgba(241,93,59,0.5)',
        borderColor: 'rgba(241,93,59,1)'
    }];
    barChartType: string = 'bar';
    barChartLegend: boolean = true;

    barChartData: any[] = [
        { data: [0, 0, 0], label: 'Build time in milliseconds' }
    ];

    // events
    chartClicked(e: any) {
        
    }

    chartHovered(e: any) {
        
    }

    randomize() {
        this.barChartData = this.cloneBarChartData();
        this.barChartData[0].data = [Math.round(Math.random() * 100), 59, 0];
    }
    
    updateData(data: any[][]) {
        this.barChartData = this.cloneBarChartData();
        this.barChartData.forEach((x, i) => x.data = data[0].concat([0]));
    }
    
    cloneBarChartData(): any[] {
        return this.barChartData.map(x => {
            return { data: x.data, label: x.label };
        });
    }
}