import {asyncActions, slice, TasksStateType,} from "./tasks-reducers";
import {TaskPriorities, TaskStatuses} from "../../api/types";
import {asyncActions as todolistsAsyncActions} from '../TodolistsList/todolists-reducer'


const {reducer: tasksReducer} = slice
const {addTodolistTC, fetchTodolistsTC, removeTodolistTC} = todolistsAsyncActions
const {removeTaskTC, addTaskTC, updateTaskTC, fetchTasksTC} = asyncActions


let startState: TasksStateType = {}

beforeEach(() => {
   startState = {
      "todolistId1": [
         {
            id: "1", title: "HTML", status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "2", title: "CSS", status: TaskStatuses.Completed, todoListId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "3", title: "JS", status: TaskStatuses.New, todoListId: 'todolistId1', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
      ],
      "todolistId2": [
         {
            id: "1", title: "Book", status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "2", title: "pencil", status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "3", title: "pens", status: TaskStatuses.Completed, todoListId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
         {
            id: "4", title: "exercisebook", status: TaskStatuses.New, todoListId: 'todolistId2', description: '',
            startDate: '', deadline: '', addedDate: '', order: 0, priority: TaskPriorities.Low
         },
      ]
   };
})

test('correct task should be deleted from correct array', () => {

   const param = {todolistId: "todolistId2", taskId: "2"};
   const action = removeTaskTC.fulfilled(param, 'requestId', param);
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
   const task = {
      todoListId: "todolistId2",
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

   const action = addTaskTC.fulfilled(task, 'requestId', {todolistId: task.todoListId, title: task.title});
   const endState = tasksReducer(startState, action)

   expect(endState["todolistId1"].length).toBe(3);
   expect(endState["todolistId2"].length).toBe(5);
   expect(endState["todolistId2"][0].id).toBeDefined();
   expect(endState["todolistId2"][0].title).toBe("juice");
   expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New)
})

test('status of specified task should be changed', () => {
   const updateModel = {todolistId: "todolistId1", taskId: '3', model: {status: TaskStatuses.Completed}};
   const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel,
   );
   const endState = tasksReducer(startState, action)

   expect(endState['todolistId1'][1].status).toBe(TaskStatuses.Completed);
   expect(endState['todolistId2'][3].status).toBe(TaskStatuses.New);
});

test('change title', () => {
   const updateModel = {todolistId: "todolistId2", taskId: '2', model: {title: "Milk"}};
   const action = updateTaskTC.fulfilled(updateModel, 'requestId', updateModel);
   const endState = tasksReducer(startState, action)

   expect(endState['todolistId2'][1].title).toBe('Milk');
   expect(endState['todolistId1'][0].title).toBe('HTML');
   expect(endState['todolistId2'][0].title).toBe('Book');
});

test('new array should be added when new todolist is added', () => {
   const todolist = {
      id: "todolistId3",
      title: "Buy products",
      order: 0,
      addedDate: "",
   }

   const action = addTodolistTC.fulfilled({todolist}, 'requestId', "Buy products");
   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState);
   const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
   if (!newKey) {
      throw Error("new key should be added")
   }

   expect(keys.length).toBe(3);
   expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

   const action = removeTodolistTC.fulfilled({todolistId: "todolistId2"}, 'requiredId', "todolistId2");
   const endState = tasksReducer(startState, action)

   const keys = Object.keys(endState);

   expect(keys.length).toBe(1);
   expect(endState["todolistId2"]).not.toBeDefined();
});

test('empty arrays should be added when we set todolists', () => {
   const payload = {
      todolists: [
         {id: '1', title: 'title 1', order: 0, addedDate: ''},
         {id: '2', title: 'title 2', order: 0, addedDate: ''},
      ]
   };
   const action = fetchTodolistsTC.fulfilled(payload, 'requestId', undefined)

   const endState = tasksReducer({}, action)

   const keys = Object.keys(endState)

   expect(keys.length).toBe(2)
   expect(endState['1']).toBeDefined()
   expect(endState['2']).toBeDefined()
});

test('tasks should be added for todolist', () => {
   const action = fetchTasksTC.fulfilled({
      tasks: startState['todolistId1'],
      todolistId: 'todolistId1'
   }, '', 'todolistId1')

   const endState = tasksReducer({
      'todolistId2': [],
      'todolistId1': []
   }, action)


   expect(endState['todolistId1'].length).toBe(3)
   expect(endState['todolistId2'].length).toBe(0)
});
