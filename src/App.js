import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NavigationBar } from './Components/NavigationBar';
import { Dashboard } from './Components/Dashboard';
import { StudentsList } from './Components/StudentsList';
import { StudentRegistrationForm } from './Components/StudentRegistrationForm';
import { StudentEditForm } from './Components/StudentEditForm';

function App() {
  return (
    <BrowserRouter>
    <NavigationBar></NavigationBar>
    <Routes>
      <Route path='/' element={<Dashboard/>}></Route>
      <Route path='/students-list' element={<StudentsList/>}></Route>
      <Route path='/student-registration' element={<StudentRegistrationForm/>}></Route>
      <Route path='/edit/:roll' element={<StudentEditForm/>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
