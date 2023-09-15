import { Navigate, Route, Routes, } from "react-router-dom";
import { Navbar } from "./components";
import { Login, SignUp, Home} from "./pages"
import { useEffect, } from "react";
import { useSelector } from "react-redux";


function App() {
  const {user,token}=useSelector((state)=>state.user)

  useEffect(()=>{
  },[token,user])

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={token?<Home />:<Navigate to="/login" replace={true}/>} />
        <Route path="/login" element={token?<Navigate to="/" replace={true} />:<Login />} />
        <Route path="/sign-up" element={token?<Navigate to="/" replace={true} />:<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
