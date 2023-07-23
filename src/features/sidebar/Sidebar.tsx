import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faHouse, faCircleQuestion, faGauge, faAddressBook } from '@fortawesome/free-solid-svg-icons';

import { IWindowDimension } from '../../models/Window.model';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import "./Sidebar.scss";

interface ISidebarProps {
    items: IMenuItem[];
    onClick: (menuItem: string) => void;
    isOpen: boolean;
    winDim: IWindowDimension;
};

const Sidebar = (props: ISidebarProps) => {
    const [active, setActive] = useState<string>(props.items[0].id);

    const getIcon = (iconName: string) => {
        let iconDef: IconDefinition;
        let iconSize: SizeProp = "1x";
        let classNames: string = "ml-2 mr-4";

        if (props.winDim.width > 768) {
            iconSize = "2x";
        }

        if (!props.isOpen) {
            classNames = "mx-auto";
        }

        switch(iconName) // TODO need to find another way to load these icons, now limited to what is defined in here :o(, there's a dynamic way to load these see: https://fontawesome.com/docs/web/use-with/react/add-icons#dynamic-icon-importing
        {
            case "faAddressBook":
                iconDef = faAddressBook;
                break;
            case "faGauge":
                iconDef = faGauge;
                break;
            case "faHouse":
                iconDef = faHouse;
                break;
            default:
                iconDef = faCircleQuestion;
                break;
        }

        return (<FontAwesomeIcon icon={iconDef} size={iconSize} className={classNames} />);
    };

    const menuItems: JSX.Element[] = props.items.map<JSX.Element>(menuItem => {        
        let classNames: string = "flex align-items-center cursor-pointer border-round-md app-menu-item";
        let menuItemTitle: JSX.Element;

        if (props.isOpen) {
            if (props.winDim.width < 768) {
                menuItemTitle = <h4>{menuItem.title}</h4>;
            } else {
                menuItemTitle = <h3>{menuItem.title}</h3>;
            }
        } else {
            menuItemTitle = <></>;
        }

        if (menuItem.id === active) {
            classNames += " active";
        }

        return (
            <div key={menuItem.id} className={classNames} onClick={() => { setActive(menuItem.id); props.onClick(menuItem.id) }}>
                {getIcon(menuItem.icon)}
                {menuItemTitle}
            </div>
        );
    });

    return (
        <div className='overflow-x-hidden white-space-nowrap'>
            {menuItems}
        </div>
    );
};

export default Sidebar;