import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useParams } from 'react-router-dom'
import { Home } from './pages/Home'

const AdminShell = lazy(() =>
  import('./admin/AdminShell').then((m) => ({ default: m.AdminShell })),
)
const Dashboard = lazy(() =>
  import('./admin/pages/Dashboard').then((m) => ({ default: m.Dashboard })),
)
const Editor = lazy(() => import('./admin/pages/Editor').then((m) => ({ default: m.Editor })))
const Settings = lazy(() =>
  import('./admin/pages/Settings').then((m) => ({ default: m.Settings })),
)

function EditorRoute() {
  const { kind, id } = useParams()
  return <Editor key={id ?? kind ?? 'editor'} />
}

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<p className="mono" style={{ padding: '2rem' }}>Loading office…</p>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<Dashboard />} />
            <Route path="settings" element={<Settings />} />
            <Route path="new/:kind" element={<EditorRoute />} />
            <Route path="doc/:id" element={<EditorRoute />} />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
