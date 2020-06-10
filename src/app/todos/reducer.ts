import { createReducer, on, State, Action } from '@ngrx/store';
import { Todo } from './interfaces';
import { Add, Remove, Toggle } from './actions';
import { uuid } from 'uuidv4';

export interface TodosState {
    todos: Array<Todo>
}

const initialState: TodosState = {
  todos: []
};

const _todoReducer = createReducer(initialState,
  on(Add, (state, action) => ({...state, todos:([...state.todos, { id: uuid(), text: action.text, todo: true }])})),
  on(Remove, (state, action) => ({...state, todos:state.todos.filter(item => item.id !== action.id)})),
  on(Toggle, (state, action) => ({...state, todos:state.todos.map(item => item.id === action.id ? {...item, todo: !item.todo} : item)}))
)

export function todoReducer(state: TodosState | undefined, action: Action) {
  return _todoReducer(state, action);
}