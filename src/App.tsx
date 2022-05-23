import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRouter } from "./routes";
import {DashboardLayout} from "./views";

export default function App() {
  return (
    <Router>
      <DashboardLayout>
        <Routes>
          {appRouter.map((route) => (
            <Route
              key={route.key}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
      </DashboardLayout>
    </Router>
  );
}