import React, {useState} from 'react';
import {ComponentStory, ComponentMeta} from '@storybook/react';
import {action} from "@storybook/addon-actions";
import {Task} from "../components/Task";

export default {
   title: 'TODOLISTS/AddItemForm',
   component: Task,
   args: {
      todoListID: "todolistID",
      removeTask: action("removeTask"),
      changeStatus: action("changeStatus"),
      updateTask: action('updateTask'),
      filter: "completed",
   }
} as ComponentMeta<typeof Task>;

const Template: ComponentStory<typeof Task> = (args) => {
   const [state, setState] = useState({task: {id: '1', isDone: true, title: 'JS'}})
   return <Task {...args} task={state.task} changeStatus={() => setState({task: {id: '1', isDone: false, title: "JS"}})}/>
};

export const TaskIsDoneStory = Template.bind({});
TaskIsDoneStory.args = {
   task: {id: '1', isDone: true, title: 'JS'},
};

export const TaskIsNotDoneStory = Template.bind({});
TaskIsNotDoneStory.args = {
   task: {id: '2', isDone: false, title: 'CSS'},
};