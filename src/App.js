import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Tasks } from './components/Tasks/Tasks';
import { CreateTask } from './components/NewTask/CreateTask';
import { Provider } from 'react-redux';
import store from './store/store';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Tasks />} />
            <Route path="/todo/add" element={<CreateTask />} />
            <Route path="/edit/:id" element={<CreateTask />} />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
