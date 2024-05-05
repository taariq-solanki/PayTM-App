
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { RecoilRoot, atom } from 'recoil';
import { SignUp } from './pages/signup';
import { SignIn } from './pages/signin';
import { Dashboard } from './pages/dashboard';
import { SendMoney } from './pages/sendmoney';
import { Me } from './pages/me';


function App() {

  return (
    <div>
      <RecoilRoot>
      <BrowserRouter>
      
      
        
        <Routes>
          <Route path='/' element={<Me/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/signin' element={<SignIn/>}/>
          <Route path='/dashboard' element={<Dashboard/>}/>
          <Route path='/send' element={<SendMoney/>}/>
          
        </Routes>
        
        
      </BrowserRouter>
      </RecoilRoot>
      
    </div>
  )
}

export default App
