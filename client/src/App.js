import './App.css';
import Title from './components/layout/Title';
import 'antd/dist/reset.css'
import AddPerson from './components/forms/AddPerson';

const App = () => {
  return (
    <div className="App">
      <Title />
      <AddPerson />
    </div>
  );
}

export default App;
