import {addTaskAC, removeTaskAC, tasksReducer, TasksStateType,} from "./tasks-reducers";
import {TaskPriorities, TaskStatuses} from "../../api/todolists-api";

let startState: TasksStateType = {}

beforeEach(() => {
   startState = {
      "todolistId1": [
         {
            id: "1", title: "HTML", status: TaskStatuses.Completed, todolistId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "2", title: "CSS", status: TaskStatuses.Completed, todolistId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "3", title: "JS", status: TaskStatuses.New, todolistId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
      ],
      "todolistId2": [
         {
            id: "1", title: "Book", status: TaskStatuses.New, todolistId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "2", title: "pencil", status: TaskStatuses.Completed, todolistId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "3", title: "pens", status: TaskStatuses.Completed, todolistId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "4", title: "exercisebook", status: TaskStatuses.New, todolistId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
      ]
   };
})

test('correct task should be deleted from correct array', () => {

   const action = removeTaskAC({todolistId: "todolistId2", taskId: "2"});
   const endState = tasksReducer(startState, action)

   expect(endState).toEqual({
      "todolistId1": [
         {
            id: "1", title: "HTML", status: TaskStatuses.Completed, todolistId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "2", title: "CSS", status: TaskStatuses.Completed, todolistId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "3", title: "JS", status: TaskStatuses.New, todolistId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
      ],
      "todolistId2": [
         {
            id: "1", title: "Book", status: TaskStatuses.New, todolistId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "3", title: "pens", status: TaskStatuses.Completed, todolistId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "4", title: "exercisebook", status: TaskStatuses.New, todolistId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
      ]
   });

});

test('correct task should be added to correct array', () => {
   const action = addTaskAC({
      task: {
         todolistId: "todolistId2",
         title: 'juice',
         status: TaskStatuses.New,
         description: '',
         priority: 0,
         startDate: '',
         deadline: '',
         id: 'id exists',
         order: 0,
         addedDate: '',
      }
   });
   const endState = tasksReducer(startState, action)

   expect(endState["todolistId1"].length).toBe(3);
   expect(endState["todolistId2"].length).toBe(5);
   expect(endState["todolistId2"][0].id).toBeDefined();
   expect(endState["todolistId2"][0].title).toBe("juice");
   expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

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
//    const action = addTodolistAC("new todolist");
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
