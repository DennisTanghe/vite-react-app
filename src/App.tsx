import { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import { IWindowDimension, WindowDimension } from './models/Window.model';
import Sidebar from './features/sidebar/Sidebar';
import TilePage from './pages/TilePage';
import TablePage from './pages/TablePage';
import NotFoundPage from './pages/NotFoundPage';
import './App.scss';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

const App = () => {

  // STATE

  const [windowSize, setWindowSize] = useState<IWindowDimension>(WindowDimension.getCurrentDimension());
  const [leaveSidebarOpen, setLeaveSidebarOpen] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<JSX.Element>(<TilePage />);

  // DATA

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

  // EXTERNAL SYSTEM INTERACTION

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(WindowDimension.getCurrentDimension());
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [windowSize]);

  // EVENTS

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

  const logoutClicked = () => {
    // TODO call server api user logout
    // TODO remove user data/token from local storage
    // TODO show login page
  };

  // UI

  const getAppTopBar = (): JSX.Element => {
    const title: string = "Web App Title"; // TODO get from props
    let appTitle: JSX.Element;
    let iconSize: SizeProp;
    
    if (windowSize.width < 768) {
      appTitle = <h3>{title}</h3>;
      iconSize = "1x";
    } else {
      appTitle = <h1>{title}</h1>;
      iconSize = "2x";
    }

    return (
      <div className='flex align-items-center app-topbar'>
        <Button className='mr-4' onClick={sideBarHamburgerClicked}>
          <FontAwesomeIcon icon={faBars} size={iconSize} />
        </Button>
        {appTitle}
        <div className="flex-grow-1"></div>
        <Button severity="danger" rounded onClick={logoutClicked}>
          <FontAwesomeIcon icon={faRightFromBracket} size={iconSize} />
        </Button>
      </div>
    );
  }

  return (
    <div className='app'>
      {getAppTopBar()}
      <div className='flex'>
        <div className={`flex-none app-sidebar${isSidebarOpen ? ' open' : ''}`} onMouseEnter={() => { setIsSidebarOpen(true); }} onMouseLeave={() => { if (!leaveSidebarOpen) setIsSidebarOpen(false); }}>
          <Sidebar onClick={sidebarMenuItemClicked} items={sideBarMenuItems} isOpen={isSidebarOpen} winDim={windowSize} />
        </div>
        <div className='flex-grow-1 app-content p-2 overflow-auto'>
          {currentPage}
        </div>
      </div>
    </div>
  );
};

export default App;
