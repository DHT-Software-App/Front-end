import { useState } from "react"

// icons
import { ChevronRight } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const DashboardIcon = require("assets/icons/DashIcon.png");
const EmployeesIcon = require("assets/icons/EmployeesIcon.png");
const DocumentsIcon = require("assets/icons/DocumentsIcon.png");
const JobsIcon = require("assets/icons/JobsIcon.png");
const CustomersIcon = require("assets/icons/CustomersIcon.png");
const CustomersReferenceIcon = require("assets/icons/CustomersReferenceIcon.png");
const InsuranceIcon = require("assets/icons/InsuranceIcon.png");
const AppointmentsIcon = require("assets/icons/AppointmentsIcon.png");


type SidebarLinkItemProps = {
  iconSrc: string;
  text: string;
  expanded: boolean;
  to: string;
};

const SidebarLinkItem = ({
  iconSrc,
  text,
  expanded,
  to
}: SidebarLinkItemProps) => {
  return <li>
    <NavLink
      to={to}
      className={({ isActive }) => {
        return `flex 
        text-white 
        font-bold 
        text-lg px-6 py-6 
        items-center 
        ${isActive ? 'bg-blue' : 'hover:bg-slate-800'} `
      }}
    >
      <img src={iconSrc} className="w-6 h-full flex-shrink-0 mr-6" />
      {expanded && <span>
        {text}
      </span>
      }
    </NavLink>
  </li>
}

// Container
export const Sidebar = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return <aside className={`max-w-xs bg-blue-dark relative duration-300 ${expanded ? "w-72" : "w-20"}`}>

    {/* expand icon */}
    <div className="text-3xl absolute cursor-pointer -right-3 top-6" onClick={toggleExpanded}>
      <ChevronRight fontSize="inherit" className={`"text-blue-dark 
      bg-white rounded-full shadow-md ${expanded && "rotate-180"}"`}></ChevronRight>
    </div>

    <ul>
      <SidebarLinkItem to="/" text="Dashboard" iconSrc={DashboardIcon} expanded={expanded} />
      <SidebarLinkItem to="/employees" text="Employees" iconSrc={EmployeesIcon} expanded={expanded} />
      <SidebarLinkItem to="/documents" text="Documents" iconSrc={DocumentsIcon} expanded={expanded} />
      <SidebarLinkItem to="/jobs" text="Jobs" iconSrc={JobsIcon} expanded={expanded} />
      <SidebarLinkItem to="/customers" text="Customers" iconSrc={CustomersIcon} expanded={expanded} />
      <SidebarLinkItem to="/clients_reference" text="Clients Reference" iconSrc={CustomersReferenceIcon} expanded={expanded} />
      <SidebarLinkItem to="/insurance_companies" text="Insurance Companies" iconSrc={InsuranceIcon} expanded={expanded} />
      <SidebarLinkItem to="/appointments" text="Appointments" iconSrc={AppointmentsIcon} expanded={expanded} />
    </ul>
  </aside>
}