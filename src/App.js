
import { Route, Routes } from 'react-router-dom';
import './App.css';
import PageLayout from './page';
import AllEvents from './page/allEvent';
import UserEvents from './page/userEvent';

function App() {
  return (
    <div className="sport-event-layout">
      <Routes>
        <Route element={<PageLayout/>}>
          <Route path="/" element={<AllEvents/>}/>
          <Route path="/my-events" element={<UserEvents/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
