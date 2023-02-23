import './App.css';
import Title from './components/layout/Title';
import 'antd/dist/reset.css'
import AddPerson from './components/forms/AddPerson';
import AddCar from './components/forms/AddCar';

const App = () => {
  return (
    <div className="App">
      <Title />
      <AddPerson />
      <AddCar />
    </div>
  );
}

export default App;
