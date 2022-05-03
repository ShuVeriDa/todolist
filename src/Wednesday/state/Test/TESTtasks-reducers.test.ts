import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducer, updateTaskTitleAC} from "./TESTtasks-reducers";

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

export type FilterValuesType = "all" | "active" | "completed"

export type TasksStateType = {
   [key: string]: Array<TasksType>
}

test('correct task should be deleted from correct array', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         {id: "1", title: "CSS", isDone: false},
         {id: "2", title: "JS", isDone: true},
         {id: "3", title: "React", isDone: false}
      ],
      "todolistId2": [
         {id: "1", title: "bread", isDone: false},
         {id: "2", title: "milk", isDone: true},
         {id: "3", title: "tea", isDone: false}
      ]
   };

});

test('correct task should be added to correct array', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         {id: "1", title: "CSS", isDone: false},
         {id: "2", title: "JS", isDone: true},
         {id: "3", title: "React", isDone: false}
      ],
      "todolistId2": [
         {id: "1", title: "bread", isDone: false},
         {id: "2", title: "milk", isDone: true},
         {id: "3", title: "tea", isDone: false}
      ]
   };


})

test('status of specified task should be changed', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         {id: "1", title: "CSS", isDone: false},
         {id: "2", title: "JS", isDone: true},
         {id: "3", title: "React", isDone: false}
      ],
      "todolistId2": [
         {id: "1", title: "bread", isDone: false},
         {id: "2", title: "milk", isDone: true},
         {id: "3", title: "tea", isDone: false}
      ]
   };

});

test('change title', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
      ]
   };


});

test('new array should be added when new todolist is added', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
      ]
   };


});

test('property with todolistId should be deleted', () => {
   const startState: TasksStateType = {
      "todolistId1": [
         { id: "1", title: "CSS", isDone: false },
         { id: "2", title: "JS", isDone: true },
         { id: "3", title: "React", isDone: false }
      ],
      "todolistId2": [
         { id: "1", title: "bread", isDone: false },
         { id: "2", title: "milk", isDone: true },
         { id: "3", title: "tea", isDone: false }
      ]
   };


});
