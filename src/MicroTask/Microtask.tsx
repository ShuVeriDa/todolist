import React, {useState} from 'react';
import './App.css';
import {MicroTaskTodolist,} from './MicroTaskTodolist';
import {v1} from 'uuid';

export type TodoListType = {
   id: string
   title: string
   filter: FilterValuesType
}
export type FilterValuesType = "all" | "active" | "completed";

function Microtask() {

   // let [tasks, setTasks] = useState([
   //     {id: v1(), title: "HTML&CSS", isDone: true},
   //     {id: v1(), title: "JS", isDone: true},
   //     {id: v1(), title: "ReactJS", isDone: false},
   //     {id: v1(), title: "Rest API", isDone: false},
   //     {id: v1(), title: "GraphQL", isDone: false},
   // ]);
   // let [filter, setFilter] = useState<FilterValuesType>("all");

   let todolistID1 = v1();
   let todolistID2 = v1();

   let [todolists, setTodolists] = useState<Array<TodoListType>>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'},
   ])

   let [tasks, setTasks] = useState({
      [todolistID1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false},
      ],
      [todolistID2]: [
         {id: v1(), title: "HTML&CSS2", isDone: true},
         {id: v1(), title: "JS2", isDone: true},
         {id: v1(), title: "ReactJS2", isDone: false},
         {id: v1(), title: "Rest API2", isDone: false},
         {id: v1(), title: "GraphQL2", isDone: false},
      ]
   });

   function removeTask(todoListID: string, id: string) {
      setTasks({...tasks, [todoListID]: tasks[todoListID].filter(tdl => tdl.id !== id)})
      // let filteredTasks = tasks.filter(t => t.id != id);
      // setTasks(filteredTasks);
   }

   function addTask(todoListID: string, title: string) {
      let newTask = {id: v1(), title, isDone: false}
      setTasks({...tasks, [todoListID]: [newTask, ...tasks[todoListID]]})
      //     let newTasks = [task, ...tasks];
      //     setTasks(newTasks);
   }

   function changeStatus(todoListID: string, taskId: string, isDone: boolean) {
      // let task = tasks.find(t => t.id === taskId);
      // if (task) {
      //     task.isDone = isDone;
      // }
      //
      // setTasks([...tasks]);
      setTasks({...tasks, [todoListID]: tasks[todoListID].map(el => el.id === taskId ? {...el, isDone: isDone}: el)})

   }

   function changeFilter(todoListID: string, filter: FilterValuesType) {
      setTodolists(todolists.map(el => el.id === todoListID ? {...el, filter: filter} : el))
   }


   return (
      <div className="App">
         {
            todolists.map(tdl => {
               let tasksForTodolist
               tasksForTodolist =
                  tdl.filter === 'active' ? tasks[tdl.id].filter(t => !t.isDone) :
                     tdl.filter === 'completed' ? tasks[tdl.id].filter(t => t.isDone) : tasks[tdl.id];
               return (
                  <MicroTaskTodolist key={tdl.id}
                                     todoListID={tdl.id}
                                     title={tdl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     filter={tdl.filter}
                  />
               )
            })
         }
      </div>
   );
}

export default Microtask;
