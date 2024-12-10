import SideBar from './Sidebar'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <div className="flex flex-col md:flex-row">
      <SideBar />
      <main className="w-full">
        <Outlet />
      </main>
    </div>
  )
}