import { useEffect, useState } from 'react';
import './App.css';
import messageList from './messages.json'
// import { SendMessage } from './components/SendMessage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './pages/login/Login';
import Home from './pages/home/Home';
import Chat from './pages/chat/Chat';
import ProtectedRoute from './components/ProtectedRoute';
import Default from './pages/home/components/Default';
import UseLogout from './core/hooks/UseLogout';
import Page403 from './pages/403/Page403';
import Page404 from './pages/404/Page404';
import Call from './pages/chat/components/Call/Call/Call';
function App() {




  return (
    // <div>
    //   <ConnectionState isConnected={isConnected} />
    //   <ConnectionManager />
    //   <SendMessage />
    //   <Messages messages={messages} />
    // </div>
    <Router>
      <Routes>
        <Route path='/signin' element={<Login />} />
        <Route path='/signout' element={<UseLogout />} />
        <Route path='/403' element={<Page403 />} />
        <Route path='*' element={<Page404 />} />

        <Route element={<ProtectedRoute />} >
          <Route path='/' element={<Home />}>
            <Route index element={<Default />} />
            <Route path='chat/:id' element={<Chat />} />
          </Route>
          <Route path='/call/:id' element={<Call/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
