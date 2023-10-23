
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { ALL_EVENTS_ROUTE, HOME_ROUTE, MY_EVENT_ROUTE } from './constants';
import PageLayout from './page';
import AllEvents from './page/allEvent';
import Home from './page/home';
import UserEvents from './page/userEvent';

function App() {
  return (
    <div className="sport-event-layout">
      <Routes>
        <Route element={<PageLayout/>}>
          <Route path={HOME_ROUTE} element={<Home/>}/>
          <Route path={ALL_EVENTS_ROUTE} element={<AllEvents/>}/>
          <Route path={MY_EVENT_ROUTE} element={<UserEvents/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
