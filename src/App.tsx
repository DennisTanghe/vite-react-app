import { useState } from 'react';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import Sidebar from './features/sidebar/Sidebar';
import './App.scss';
import TilePage from './pages/TilePage';
import TablePage from './pages/TablePage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => {
  const [leaveSidebarOpen, setLeaveSidebarOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<JSX.Element>(<TilePage />);

  const sideBarMenuItems: IMenuItem[] = [ // TODO fetch from API and API should only return what user has access to, the sidebar contains the modules
    {
      id: "Dashboard",
      title: "Dashboard",
      icon: "faGauge"
    },
    {
      id: "BusinessPartners",
      title: "Business Partners",
      icon: "faAddressBook"
    },
    {
      id: "Home",
      title: "Home",
      icon: "faHouse"
    }
  ];

  const sideBarHamburgerClicked = () => {
    if (isSidebarOpen) {
      setIsSidebarOpen(false);
      setLeaveSidebarOpen(false);
    } else {
      setIsSidebarOpen(true);
      setLeaveSidebarOpen(true);
    }
  };

  const sidebarMenuItemClicked = (menuItem: string) => {
    // TODO fetch data for this module

    let newPage: JSX.Element;

    switch(menuItem)
    {
      case "Dashboard":
        newPage = <TilePage />;
        break;
      case "BusinessPartners":
        newPage = <TablePage />;
        break;
      default:
        newPage = <NotFoundPage />;
        break;
    }

    if (newPage != currentPage)
      setCurrentPage(newPage);
  };

  return (
    <div className='app'>
      <div className='flex align-items-center app-topbar'>
        <Button onClick={sideBarHamburgerClicked}>
          <FontAwesomeIcon icon={faBars} size='2x' />
        </Button>
      </div>
      <div className='flex'>
        <div className={`flex-none app-sidebar${isSidebarOpen ? ' open' : ''}`} onMouseEnter={() => { setIsSidebarOpen(true); }} onMouseLeave={() => { if (!leaveSidebarOpen) setIsSidebarOpen(false); }}>
          <Sidebar onClick={sidebarMenuItemClicked} items={sideBarMenuItems} />
        </div>
        <div className='flex-grow-1 app-content'>
          {currentPage}
        </div>
      </div>
    </div>
  );
}

export default App;
