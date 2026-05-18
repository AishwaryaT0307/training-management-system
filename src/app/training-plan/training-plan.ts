import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-training-plan',
  imports: [],
  templateUrl: './training-plan.html',
  styleUrl: './training-plan.css',
})
export class TrainingPlan {
  menteeId!: string;
  trainingPlan: any;

  constructor(private route: ActivatedRoute) {

  }
   ngOnInit() {
    this.menteeId = this.route.snapshot.paramMap.get('menteeId')!;
    console.log("Mentee ID:", this.menteeId);

  }

}
