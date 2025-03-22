import { Routes, Route, Link } from "react-router-dom";
import routes from "./routes/routes";

function App() {
  return (
    <div>
      <nav className="p-4 bg-gray-200 flex gap-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}

export default App;
