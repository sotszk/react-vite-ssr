import { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import * as Sentry from "@sentry/react";

import reactLogo from "./assets/react.svg";
import "./App.css";
import "./index.css";

const SentryRoutes = Sentry.withSentryReactRouterV6Routing(Routes);

const pages = import.meta.glob<true, string, any>("./pages/*.tsx", {
  eager: true,
});

const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  return {
    name,
    path: name === "index" ? "/" : `/${name}`,
    component: pages[path].default,
  };
});

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const env = import.meta.env;
    console.log("env.VITE_SITE_NAME:", env.VITE_SITE_NAME);
    // console.log(window.__APP_ENV__);
  }, []);

  return (
    <div className="app">
      <nav>
        <ul>
          {routes.map((route) => (
            <li key={route.path}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + SSR</h1>
      <div className="card">
        <button onClick={() => (({} as any).methodDoesNotExist())}>
          Break the world
        </button>
        ;
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>
      <SentryRoutes>
        {routes.map(({ path, component: RouteComponent }) => (
          <Route key={path} path={path} element={<RouteComponent />}></Route>
        ))}
      </SentryRoutes>
    </div>
  );
}

export default App;
