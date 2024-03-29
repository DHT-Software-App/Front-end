import { Logo } from "components/Logo";
import { Popover, Transition } from "@headlessui/react";
import {
  ManageAccounts,
  AppsOutlined,
  NotificationsOutlined
} from '@mui/icons-material';
import { useAuth } from "hooks/useAuth";
import { Loading } from "components/Loading";

const avatarImg = require('assets/images/avatar.png');

export const Header = () => {
  const { signout, employee: auth_employee } = useAuth();

  const handleSignOut = (e: any) => {
    e.preventDefault();
    signout();
  }

  return <header className="flex items-center justify-between px-6 pt-5 pb-6 shadow-md z-20">
    <div className="flex gap-x-4">
      <div className="w-64">
        <Logo />
      </div>

      {/* Buscador */}
      <input
        type="search"
        placeholder="Search"
        className="text-base font-semibold shadow-sm placeholder-slate-400 bg-slate-100 rounded-md outline-none pl-6 pr-6 py-3 w-80 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-600 duration-100"
      />
    </div>

    <div className="flex items-center gap-x-10">
      <nav>
        <ul className="flex gap-x-8">
          <li className="text-3xl">
            <AppsOutlined fontSize="inherit" className="text-zinc-500"></AppsOutlined>
          </li>
          <li className="text-3xl">
            <NotificationsOutlined fontSize="inherit" className="text-zinc-500"></NotificationsOutlined>
          </li>
        </ul>
      </nav>



      <Popover className="relative">
        <Popover.Button>
          {auth_employee ? (
            <div className="flex items-center gap-x-3 rounded-md px-6 py-3 duration-100 hover:bg-zinc-100 hover:cursor-pointer">
              <img src={auth_employee.user?.profile?.url || avatarImg} alt="Avatar" className="w-12 h-full flex-shrink-0" />
              <div className="flex flex-col items-end">
                <p className="font-bold text-base text-zinc-600">
                  {auth_employee.user?.profile?.nickname ||
                    `${auth_employee.firstname} ${auth_employee.lastname}`}
                </p>
                <p className="font-semibold text-sm text-zinc-500">
                  {auth_employee.role?.title}
                </p>
              </div>
            </div>
          ) : <Loading width="32px" />}
        </Popover.Button>

        <Transition
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0"
        >
          <Popover.Panel className="absolute z-10 w-80 right-0">
            <div className="bg-white rounded-md shadow-md flex flex-col gap-y-8 items-center py-12">
              {auth_employee ? (
                <header className="flex flex-col items-center">
                  <img src={auth_employee.user?.profile?.url || avatarImg} className="h-16" />
                  <p className="font-bold text-base text-zinc-600">
                    {auth_employee.user?.profile?.nickname ||
                      `${auth_employee.firstname} ${auth_employee.lastname}`}
                  </p>
                  <p className="font-semibold text-sm text-zinc-500">
                    {auth_employee.role?.title}
                  </p>
                </header>) :
                <Loading width="32px" />
              }

              <section style={{ borderTopWidth: "1px", borderBottomWidth: "1px" }} className="flex items-center gap-x-3 px-6 py-3 border-zinc-200">
                <ManageAccounts fontSize="medium" className="text-zinc-500"></ManageAccounts>
                <p className="font-medium text-zinc-500 text-sm">Manage your account</p>
              </section>

              <footer>
                <button
                  onClick={handleSignOut}
                  style={{
                    border: "1px solid #d5d5d5"
                  }}
                  className="rounded-md py-2 px-8 border-2 border-zinc-300 text-zinc-600 font-bold text-xs">Sign Out</button>
              </footer>
            </div>
          </Popover.Panel>
        </Transition>

      </Popover>
    </div>
  </header>;
}