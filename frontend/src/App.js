import Home from './pages/home/Home'
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Messenger from './pages/messenger/Messenger'
import {BrowserRouter , Routes , Route , Navigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

function App() {
  const {user} = useSelector((state) => state.user)

  return (
    <BrowserRouter>
       <Routes>
        <Route exact path='/'  element={user ? <Home /> : <Navigate to="/login" />} />
        <Route exact path='/profile/:username'  element={<Profile />} />
        <Route path="/messenger" element={!user ? <Navigate to="/" /> : <Messenger />}/>
        <Route exact path='/login'  element={user ? <Navigate to="/" /> : <Login />} />
        <Route exact path='/register'  element={user ? <Navigate to="/" /> : <Register />} />
       </Routes>
    </BrowserRouter>
  );
}

export default App;
