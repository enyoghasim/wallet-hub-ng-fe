/**
 * Update the following components to meet the requirements :
 * * Bind `field` of [textfield] component to its text input
 * * Pass value of `field` from [textfield] component to [title] property of component [ng-app]
 */
import { Component, NgModule, EventEmitter, Output } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
@Component({
  selector: "textfield",
  template: '<input type="text" (input)="handleInputChange($event)" />',
})
export class TextField {
  field: string = "";
  @Output() inputed: EventEmitter<string> = new EventEmitter();
  handleInputChange(event): void {
    this.field = event.target.value;
    this.inputed.emit(this.field);
  }
}

@Component({
  selector: "child-component",
  template: `<h2>
    Title:{{ title }}
    <h2><br /><textfield (inputed)="handleInputChange($event)"></textfield></h2>
  </h2>`,
})
export class ChildComponent {
  title: string = "";
  @Output() inputed: EventEmitter<string> = new EventEmitter();
  handleInputChange(e): void {
    this.title = e;
    this.inputed.emit(e);
  }
}

@Component({
  selector: "ng-app",
  template: `<div>
    <child-component (inputed)="handleInputChange($event)"></child-component>
    <br />
    Title is {{ title }}
  </div>`,
})
export class Test02Component {
  title: string = "";
  handleInputChange(e): void {
    this.title = e;
  }
}

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "",
        component: Test02Component,
      },
    ]),
  ],
  declarations: [Test02Component, ChildComponent, TextField],
})
export class Test02Module {}
