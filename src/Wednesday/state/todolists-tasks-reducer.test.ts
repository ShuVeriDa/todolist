import {TasksStateType, TodolistType} from "./tasks-reducers.test";
import {addTodoListAC,} from "./todolists-reducer";

// test('ids should be equals', () => {
//    const startTasksState: TasksStateType = {};
//    const startTodolistsState: Array<TodolistType> = [];
//
//    const action = addTodoListAC("new todolist");
//
//    const endTasksState = tasksReducer(startTasksState, action)
//    const endTodolistsState = todolistsReducer(startTodolistsState, action)
//
//    const keys = Object.keys(endTasksState);
//    const idFromTasks = keys[0];
//    const idFromTodolists = endTodolistsState[0].id;
//
//    expect(idFromTasks).toBe(action.payload.todolistID);
//    expect(idFromTodolists).toBe(action.payload.todolistID);
//    expect(idFromTasks).toBe(idFromTodolists);
//
// });
