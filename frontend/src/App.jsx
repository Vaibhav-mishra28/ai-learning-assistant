import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import Dashboard from './pages/Dashboard.jsx'
// import Navbar from './components/Navbar.jsx'
// import { useState } from 'react'
import Document from './pages/Document.jsx'
import Quiz from './pages/Quiz.jsx'
import Explains from './pages/Explains.jsx'
import FocusTracker from './pages/FocusTracker.jsx'
import TakeQuiz from './pages/TakeQuiz.jsx'

function App() {

  // const [darkMode, setDarkMode] = useState(true);

  const appRouter = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/login', element: <Login /> },
    { path: '/signup', element: <Register /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/document', element: <Document /> },
    { path: '/quiz', element: <Quiz /> }, // Quiz history
    { path: '/quiz/:quizId', element: <TakeQuiz /> }, // Take a quiz by id
    { path: '/explains', element: <Explains /> },
    { path: '/focus-tracker', element: <FocusTracker /> },
  ]);

  return (
     <>
      {/* <Navbar darkMode={darkMode} setDarkMode={setDarkMode} /> */}

      {/* Give space so floating navbar doesn't overlap */}
      <div style={{ paddingTop: "100px" }}>
        <RouterProvider router={appRouter} />
      </div>
    </>
  );
}

export default App;
