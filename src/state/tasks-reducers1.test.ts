import {addTaskAC, changeStatusAC, removeTaskAC, tasksReducers1, updateTaskAC} from "./tasks-reducers1";
import {updateTaskTitleAC} from "./tasks-reducers";
import {todolistsReducer} from "./todolists-reducer";

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

   const action = removeTaskAC('todolistId2', '2')
   const endState = tasksReducers1(startState, action)

   expect(endState["todolistId2"].length).toBe(2)
   expect(endState["todolistId2"][1].id).toBe('3')
   expect(endState["todolistId2"][1].title).toBe('tea')
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

   const action = addTaskAC("todolistId1", 'Vue')

   const endState = tasksReducers1(startState, action)

   expect(endState["todolistId1"].length).toBe(4)
   expect(endState["todolistId1"][0].id).toBe("0")
   expect(endState["todolistId1"][0].title).toBe("Vue")
   expect(endState["todolistId1"][2].title).toBe("JS")
   expect(endState["todolistId1"][2].isDone).toBe(true)
})

test('updateTask', () => {
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

   const action = updateTaskAC("todolistId2", '3', 'coffee')
   const endState = tasksReducers1(startState, action)

   expect(endState["todolistId2"][2].title).toBe('coffee')
})

test('changeStatus', () => {
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

   const action = changeStatusAC("todolistId1", '1', true)
   const endState = tasksReducers1(startState, action)

   expect(endState["todolistId1"][0].isDone).toBe(true)
})