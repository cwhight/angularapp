import { Loan } from '../loan';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { LoanService } from '../loan.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-loan-detail',
  templateUrl: './loan-detail.component.html',
  styleUrls: ['./loan-detail.component.css']
})
export class LoanDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private loanService: LoanService,
    private location: Location
  ) { }

  @Input() loan: Loan;

  ngOnInit(): void {
    this.getLoan();
  }

  getLoan(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.loanService.getLoan(id)
      .subscribe(loan => this.loan = loan);
  }

  goBack(): void {
    this.location.back();
  }

  
}
