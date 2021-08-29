import React from 'react'
import Context from './Context'

const Provider = (props) =>{
 const [blogs , setBlogs] = useState();
 return(
     <Context.Provider value ={{
         data:blogs
     }}
     >
         {props.children}
     </Context.Provider>
 )
}

export default Provider
