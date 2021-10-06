
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";
import Keyboard from './components/keyboard/keyborad'
import Homepage from './components/home/home';
function App() {
  return (
    
      <Router>
        <div className="App">
        <Switch>
          <Route path="/typeracer/racername/:name" children={<Keyboard/>} />
          <Route path="/" children={<Homepage />} />

        </Switch>
        </div>
  
  </Router>
   

  );
  }

export default App;
