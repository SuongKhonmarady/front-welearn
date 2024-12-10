import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <>
      <Navbar/>
      <main className="max-w-7xl mx-auto min-h-screen p-5">
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}
