import * as React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  useLocation,
  useNavigationType,
  createRoutesFromChildren,
  matchRoutes,
} from "react-router-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/react";
import App from "./App";

Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN,
  enabled: import.meta.env.PROD,
  release: import.meta.env.VITE_SENTRY_RELEASE,
  environment: import.meta.env.MODE,
  integrations: [
    new BrowserTracing({
      routingInstrumentation: Sentry.reactRouterV6Instrumentation(
        React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      ),
    }),
  ],
  tracesSampleRate: 1.0,
});

ReactDOM.hydrateRoot(
  document.getElementById("app") as Element,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);

console.log("hydrated");
