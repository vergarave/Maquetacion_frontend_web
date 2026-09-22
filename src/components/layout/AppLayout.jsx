import { NavLink, Outlet, useLocation } from 'react-router-dom'
import dashboardActiveIcon from '../../assets/dashboard/dashboard.svg'
import routinesInactiveIcon from '../../assets/dashboard/routines.svg'
import homeIcon from '../../assets/dashboard/home.svg'
import profileIcon from '../../assets/dashboard/profile.svg'
import logoutIcon from '../../assets/dashboard/logout.svg'
import dashboardInactiveIcon from '../../assets/routines/dashboard-inactive.svg'
import routinesActiveIcon from '../../assets/routines/routines-active.svg'
import './AppLayout.css'

const navigation = [
  {
    label: 'Dashboard',
    path: '/dashboard',
    activeIcon: dashboardActiveIcon,
    inactiveIcon: dashboardInactiveIcon,
  },
  {
    label: 'Rutinas',
    path: '/rutinas',
    activeIcon: routinesActiveIcon,
    inactiveIcon: routinesInactiveIcon,
  },
]

function NavigationLink({ item }) {
  return (
    <NavLink
      to={item.path}
      className={({ isActive }) =>
        `nav-link${isActive ? ' nav-link--active' : ''}`
      }
    >
      {({ isActive }) => (
        <>
          <img
            src={isActive ? item.activeIcon : item.inactiveIcon}
            alt=""
            aria-hidden="true"
          />
          <span>{item.label}</span>
        </>
      )}
    </NavLink>
  )
}

function SideNavigation() {
  const { pathname } = useLocation()

  return (
    <aside className="side-navigation" aria-label="Navegación principal">
      <div className="brand">
        <div className="brand__mark" aria-hidden="true">
          <span className="material-symbols">wb_sunny</span>
        </div>
        <span
          className={`brand__name${pathname.startsWith('/rutinas') ? ' brand__name--ink' : ''}`}
        >
          Amanecer
        </span>
      </div>

      <nav className="nav-links">
        {navigation.map((item) => (
          <NavigationLink item={item} key={item.path} />
        ))}
        <button className="nav-link" type="button">
          <img src={homeIcon} alt="" aria-hidden="true" />
          <span>Hogar</span>
        </button>
        <button className="nav-link" type="button">
          <img src={profileIcon} alt="" aria-hidden="true" />
          <span>Perfil</span>
        </button>
      </nav>

      <button className="nav-link nav-link--logout" type="button">
        <img src={logoutIcon} alt="" aria-hidden="true" />
        <span>Logout</span>
      </button>
    </aside>
  )
}

function AppLayout() {
  return (
    <div className="app-shell">
      <SideNavigation />
      <Outlet />
    </div>
  )
}

export default AppLayout
