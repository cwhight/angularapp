import { Loan } from '../loan';
import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';


@Component({
  selector: 'app-loan',
  templateUrl: './loan.component.html',
  styleUrls: ['./loan.component.css']
})
export class LoanComponent 
  implements OnInit {
  loans: Loan[];

  constructor(private loanService: LoanService) { }

  ngOnInit() {
    this.getLoans();
  }

  getLoans(): void {
    this.loanService.getLoans()
      .subscribe(loans => this.loans = loans);
  }

  add(): void {
    if (this.model.fundingAmount) {
      this.model.fundingAmount = +this.model.fundingAmount
    } else {
      this.model.fundingAmount = 0
    }

    if (this.model.repaymentAmount) {
      this.model.repaymentAmount = +this.model.repaymentAmount
    } else {
      this.model.repaymentAmount = 0
    }
    

    this.loanService.addLoan(this.model)
      .subscribe(loan => {
        this.loans.push(loan);
      });
  }

  delete(loan: Loan): void {
    this.loans = this.loans.filter(h => h !== loan);
    this.loanService.deleteLoan(loan.id).subscribe();
  }

  model = new Loan();
  
  submitted = false;

}
