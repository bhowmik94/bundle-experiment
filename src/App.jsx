import { Routes, Route, Link } from "react-router-dom";
import Feed from "./pages/Feed";
// Static import: Dashboard (and its recharts dependency) ship in the
// main bundle even for users who never visit /dashboard.
// This is bloat decision #4 — fixed with React.lazy() here.
import { Suspense, lazy } from "react";
const Dashboard = lazy(() => import("./pages/Dashboard"));
import Settings from "./pages/Settings";

export default function App() {
  return (
    <div
      style={{
        fontFamily: "sans-serif",
        maxWidth: 720,
        margin: "0 auto",
        padding: 16,
      }}
    >
      <nav style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <Link to="/">Feed</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/settings">Settings</Link>
      </nav>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Suspense>
    </div>
  );
}
