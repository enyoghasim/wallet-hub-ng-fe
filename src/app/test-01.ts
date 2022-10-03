/**
 * In the following component, update the code so that when the value of the [loan-amount] is changed:
 * * If it's blank or 0, the values of [monthly_payment] and [late_payment] becomes "N/A",
 * * If it has a value, the value of [monthly_payment] becomes 2% of [loan-ammount] and the value of [late_payment] becomes 5% of [monthly_payment].
 * * Both [monthly_payment] and [late_payment] should print in the template in currency format : $1,234
 */

import { Component, Input, NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "ng-app",
  template: `<div>
    <h2>Loan Details</h2>
    <b>Monthly Payment:</b> {{ monthly_payment }} <br />
    <b>Late Payment Fee : {{ late_payment }}</b> <br />
    <b>Loan Amount: </b
    ><input
      type="number"
      class="input-text-holder"
      value="{{ loan_amount }}"
      (input)="handleInputChange($event)"
    />
    <br />
  </div>`,
})
export class Test01Component {
  loan_amount: number = 1000;
  monthly_payment: string | number = `$200`;
  late_payment: string | number = `$10`;

  getPercentageNumber(
    percentageInHundred: number,
    percentageInTen: number,
    fullNumber: number
  ): number {
    return (percentageInTen / percentageInHundred) * fullNumber;
  }

  handleInputChange(e): void {
    const value: number = Number(e.target.value);

    this.loan_amount = value;

    if (!value || value <= 0) {
      this.monthly_payment = "N/A";
      this.late_payment = "N/A";
    } else {
      this.monthly_payment = `$${this.getPercentageNumber(
        100,
        2,
        this.loan_amount
      )}`;
      this.late_payment = `$${this.getPercentageNumber(
        100,
        5,
        this.loan_amount
      )}`;
    }
  }
}

@NgModule({
  imports: [
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test01Component,
      },
    ]),
  ],
  declarations: [Test01Component],
})
export class Test01Module {}
