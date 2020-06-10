import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Todo } from './todos/interfaces';
import { Add, Remove, Toggle } from './todos/actions';
import { Observable } from 'rxjs';
import { TodosState } from './todos/reducer'


@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  todos$: Observable<Todo[]>;
  newTodoText: string = "";
  constructor(private store: Store<TodosState>) {
    this.todos$ = store.select(state => state.todos);
  }
  addTodo() {
    this.store.dispatch(Add({ text: this.newTodoText || 'Untitled task' }));
    this.newTodoText = '';
  }

  removeTodo(id) {
    this.store.dispatch(Remove({ id }));
  }

  toggleTodo(id) {
    this.store.dispatch(Toggle({ id }));
  }
}
