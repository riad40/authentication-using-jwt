
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function Form() {

  const inputs = [
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
      
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Password',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    },
    {
      type: 'submit',
      id: 'submit',
      name: 'submit',
      value: 'Submit',
      class: 'block my-5 text-dark font-medium cursor-pointer w-full',
      style: {
        backgroundColor: '#41CD7D', 
        outline: 'none', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    }
  ]
  const inputs1 = [
    {
      type: 'text',
      id: 'username',
      name: 'username',
      label: 'Username',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
      
    },
    {
      type: 'email',
      id: 'email',
      name: 'email',
      label: 'Email',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
      
    },
    {
      type: 'password',
      id: 'password',
      name: 'password',
      label: 'Password',
      class: 'block mt-4 mb-1 p-3 w-full',
      style: {
        backgroundColor: '#303246', 
        outline: 'none', 
        color: 'white', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    },
    {
      type: 'submit',
      id: 'submit',
      name: 'submit',
      value: 'Submit',
      class: 'block my-5 text-dark font-medium cursor-pointer w-full',
      style: {
        backgroundColor: '#41CD7D', 
        outline: 'none', 
        padding: '10px', 
        borderRadius: '10px' 
      }
    }
  ]

  return (

    <Router>
      <div className="w-2/5 rounded-lg" style={ { backgroundColor: '#202442'}}>
        <div className="p-5">
        <Switch>
          <Route exact path="/">
            <Login inputs={ inputs } />
          </Route>
          <Route path="/register">
            <Register inputs={ inputs1 } />
          </Route>
        </Switch>
        </div>
      </div>
    </Router>

  )
}

export default Form