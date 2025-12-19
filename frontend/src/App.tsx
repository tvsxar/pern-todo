import TodoProvider from './context/TodoContext.jsx';
import HomePage from "./pages/HomePage.jsx";

function App() {
  return (
    <TodoProvider>
      <HomePage />
    </TodoProvider>
  );
}

export default App;
