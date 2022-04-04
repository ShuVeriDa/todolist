import classes from './Posts.module.css'
import {useState} from "react";
import {v1} from "uuid";

type PostsPropsType = {
   id: string
   name: string
   message: string
}

export const Posts = () => {
   const [posts, setPosts] = useState<PostsPropsType[]>([
      {id: v1(), name: "Ramzan", message: " Hello my friend. How are you? What is your name?"},
      {id: v1(), name: "Billy", message: " Hi, what's app?"},
      {id: v1(), name: "Islam", message: " Oleg"},
   ])

   const [value, setValue] = useState('')

   const addPost = ( message: string) => {
      const newPost = {id: v1(), name: "NewUser", message: message}
      setPosts([newPost, ...posts])
   }


   return (
      <div>
         <div className={classes.posts}>
            <input value={value} type="text" onChange={(e) => setValue(e.currentTarget.value)}/>
            <button onClick={(e) => addPost(value)}>add</button>
         </div>
         <div className={classes.newPost}>
            <div className={classes.newPost_inner}>
               {
                  posts.map(post => {
                     return (
                        <div key={post.id} className={classes.postItem}>
                           <div className={classes.postName}>
                              {post.name}
                           </div>
                           <div>
                              {post.message}
                           </div>
                        </div>
                     )
                  })
               }
            </div>

         </div>
      </div>
   );
};
