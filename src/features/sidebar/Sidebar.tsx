import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faHouse, faCircleQuestion, faGauge, faAddressBook } from '@fortawesome/free-solid-svg-icons';

import "./Sidebar.scss";

interface ISidebarProps {
    items: IMenuItem[];
    onClick: (menuItem: string) => void;
};

const Sidebar = (props: ISidebarProps) => {
    const [active, setActive] = useState<string>("");

    const getIcon = (iconName: string) => {
        let iconDef: IconDefinition;

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

        return (<FontAwesomeIcon icon={iconDef} size='2x' className='mr-4' />);
    };

    const menuItems: JSX.Element[] = props.items.map<JSX.Element>(menuItem => {
        
        let classNames: string = "flex align-items-center cursor-pointer";

        if (menuItem.id === active) {
            classNames += " active";
        }

        return (
            <div key={menuItem.id} className={classNames} onClick={() => { setActive(menuItem.id); props.onClick(menuItem.id) }}>
                {getIcon(menuItem.icon)}
                <h3>{menuItem.title}</h3>
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