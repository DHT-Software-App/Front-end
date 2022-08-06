// Layouts
import { me_auth_request } from 'actions/auth';
import { Header } from 'components/Header';
import { Sidebar } from 'components/Sidebar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

export const Main = () => {
  const { auth: token } = useSelector(({ auth }: any) => auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(me_auth_request(token));
    }
  }, []);

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