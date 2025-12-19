import TodoProvider from './context/TodoContext';
import HomePage from "./pages/HomePage";

function App() {
  return (
    <TodoProvider>
      <HomePage />
    </TodoProvider>
  );
}

export default App;
