import {tasksReducer, TasksStateType} from "../features/TodolistsList/tasks-reducers";
import {addTodolistTC, TodolistDomainType, todolistsReducer} from "../features/TodolistsList/todolists-reducer";
import {TodolistType} from "../api/types";

test('ids should be equals', () => {
   const startTasksState: TasksStateType = {};
   const startTodolistsState: Array<TodolistDomainType> = [];

   const todolist: TodolistType = {
      title: 'new todolist',
      id: 'any id',
      addedDate: '',
      order: 0
   }

   const action = addTodolistTC.fulfilled({todolist}, 'requiredId', todolist.title);

   const endTasksState = tasksReducer(startTasksState, action)
   const endTodolistsState = todolistsReducer(startTodolistsState, action)

   const keys = Object.keys(endTasksState);
   const idFromTasks = keys[0];
   const idFromTodolists = endTodolistsState[0].id;

   expect(idFromTasks).toBe(action.payload.todolist.id);
   expect(idFromTodolists).toBe(action.payload.todolist.id);
   expect(idFromTasks).toBe(idFromTodolists);

});
