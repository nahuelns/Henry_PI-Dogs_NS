//import './App.css';
import {BrowserRouter,Route} from 'react-router-dom';
import LandingPage from './component/LandingPage';
import Home from './component/Home';
import DogDetail from './component/DogDetail';
import CreateDog from './component/CreateDog';


function App() { 
  return (
    <BrowserRouter>
      <div className="App">
          <Route exact path= '/' component={LandingPage}/>
          <Route exact path= '/home' component={Home}/>
          <Route exact path= '/home/:id' component={DogDetail}/>
          <Route path='/dogs' component={CreateDog}/>
      </div>
    </BrowserRouter>
   
  );
}

export default App;
