import { Link } from 'react-router-dom'

function Home() {
  return (
    <div className='block text-center text-white'>
        <Link className='block' to="/login">login</Link>
        <Link className='block' to="/register">Register</Link>
    </div>
  )
}

export default Home