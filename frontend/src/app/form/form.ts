import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TaskList } from '../../task-list/task-list';

@Component({
  selector: 'app-form',
  imports: [ReactiveFormsModule, TaskList],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form {
  myForm = new FormControl('');
  newTask: WritableSignal<string> = signal('')

  clearForm() {
    this.myForm.setValue('');
  }

  onEnter() {
    
    let myFormValue = this.myForm.value;
        
    if (myFormValue != null) {
      this.newTask.set(myFormValue);
    }

    this.clearForm();
  }

  OnButton() {
    this.clearForm();
  }

}
  