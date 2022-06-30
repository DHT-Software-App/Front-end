// Layouts
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  return <div className='flex flex-col h-screen'>
    <Header />
    <div className='flex flex-1'>
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  </div>
}