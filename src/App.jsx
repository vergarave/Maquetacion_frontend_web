import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './components/layout/AppLayout.jsx'
import RoutinesProvider from './context/RoutinesProvider.jsx'
import DashboardPage from './pages/Dashboard/DashboardPage.jsx'
import EditRoutinePage from './pages/EditRoutine/EditRoutinePage.jsx'
import LoginPage from './pages/Login/LoginPage.jsx'
import ProfilePage from './pages/Profile/ProfilePage.jsx'
import RoutinesPage from './pages/Routines/RoutinesPage.jsx'

function App() {
  return (
    <RoutinesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="/login" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/rutinas" element={<RoutinesPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route
              path="/rutinas/:routineId/editar"
              element={<EditRoutinePage />}
            />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </RoutinesProvider>
  )
}

export default App
