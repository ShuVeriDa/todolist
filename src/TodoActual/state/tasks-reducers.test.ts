import {
   addTaskAC,
   changeTaskStatusAC,
   removeTaskAC,
   tasksReducer,
   changeTaskTitleAC
} from "./tasks-reducers";
import {removeTodolistAC} from "./todolists-reducer";

export type TasksType = {
   id: string
   title: string
   isDone: boolean //выполнено ли
}
export type TodolistType = {
   id: string
   title: string
   filter: FilterValuesType
}

export type TasksStateType = {
   [key: string]: Array<TasksType>
}

export type FilterValuesType = "all" | "active" | "completed"

let startState: TasksStateType

// beforeEach(() => {
//    startState = {
//       "todolistId1": [
//          {id: "1", title: "CSS", isDone: false},
//          {id: "2", title: "JS", isDone: true},
//          {id: "3", title: "React", isDone: false}
//       ],
//       "todolistId2": [
//          {id: "1", title: "bread", isDone: false},
//          {id: "2", title: "milk", isDone: true},
//          {id: "3", title: "tea", isDone: false}
//       ]
//    };
// })
//
// test('correct task should be deleted from correct array', () => {
//
//    const action = removeTaskAC("todolistId2", "2");
//    const endState = tasksReducer(startState, action)
//
//    expect(endState).toEqual({
//       "todolistId1": [
//          {id: "1", title: "CSS", isDone: false},
//          {id: "2", title: "JS", isDone: true},
//          {id: "3", title: "React", isDone: false}
//       ],
//       "todolistId2": [
//          {id: "1", title: "bread", isDone: false},
//          {id: "3", title: "tea", isDone: false}
//       ]
//    });
//
// });
//
// test('correct task should be added to correct array', () => {
//
//    const action = addTaskAC("todolistId2", "juce");
//    const endState = tasksReducer(startState, action)
//
//    expect(endState["todolistId1"].length).toBe(3);
//    expect(endState["todolistId2"].length).toBe(4);
//    expect(endState["todolistId2"][0].id).toBeDefined();
//    expect(endState["todolistId2"][0].title).toBe("juce");
//    expect(endState["todolistId2"][0].isDone).toBe(false)
// })
//
// test('status of specified task should be changed', () => {
//
//    const action = changeTaskStatusAC("todolistId2","2", false, );
//    const endState = tasksReducer(startState, action)
//
//    expect(endState['todolistId2'][1].isDone).toBe( false);
//    // expect(endState['todolistId2'][1].isDone).toBe( true);
//    // expect(endState['todolistId2'][1].isDone).toBe( true);
//    // expect(endState['todolistId2'][1]).toBe({id: "2", title: "milk", isDone: false});
//    // expect(endState['todolistId2'][1]).toBe('false');
// });
//
// test('change title', () => {
//
//    const action = changeTaskTitleAC('todolistId1', '1', 'JS/ES6')
//    const endState = tasksReducer(startState, action)
//
//    expect(endState['todolistId1'][0].title).toBe( 'JS/ES6');
//    // expect(endState['todolistId1'][0].title).toBe( 'JS');
//
// });
//
// test('new array should be added when new todolist is added', () => {
//
//    const action = addTodoListAC("new todolist");
//    const endState = tasksReducer(startState, action)
//
//    const keys = Object.keys(endState);
//    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
//    if (!newKey) {
//       throw Error("new key should be added")
//    }
//
//    expect(keys.length).toBe(3);
//    expect(endState[newKey]).toEqual([]);
// });
//
// test('property with todolistId should be deleted', () => {
//
//    const action = removeTodolistAC("todolistId2");
//    const endState = tasksReducer(startState, action)
//
//    const keys = Object.keys(endState);
//
//    expect(keys.length).toBe(1);
//    expect(endState["todolistId2"]).not.toBeDefined();
// });
