import { AppstoreOutlined, HomeOutlined, LogoutOutlined, HistoryOutlined } from "@ant-design/icons";
import { Drawer, Menu, MenuProps, Switch } from "antd";
import React from "react";
import { useEffect, useState } from "react";
//import AuthorizeService from "../../services/Api/autorise-service";
import { useTable } from "../Store";
import "../menu/menu.css";
import MenuItems from "./menuItems";

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const MenuDrawer = () => {
  const [state, actions] = useTable();

  const [screenSize, getDimension] = useState({ dynamicWidth: window.innerWidth });

  const [mode, setMode] = useState<'vertical' | 'inline'>('inline');
  const [items, setMenuItems] = useState<MenuItem[]>([
    getItem(MenuItems.Home, MenuItems.Home, <HomeOutlined />),
    getItem(MenuItems.History, MenuItems.History, <HistoryOutlined />),
  ]);

//   useEffect(() => {
//     window.addEventListener('resize', setDimension);
//     if (screenSize.dynamicWidth < 1249) {

    //   let newMenu = [
    //     getItem(MenuItems.Home, MenuItems.Home, <HomeOutlined />),
    //   ];

    //   if (state.signedIn && screenSize.dynamicWidth < 449) {
    //     newMenu.push(getItem(MenuItems.LogOut, MenuItems.LogOut, <LogoutOutlined />))
    //   }

    //   setMenuItems(newMenu)
    // }
//     else {
//       setMenuItems([
//         getItem(MenuItems.Categories, MenuItems.Categories, <AppstoreOutlined />, (Object.values(Categories) as (keyof typeof Categories)[]).map(category => getItem(category, category)))
//       ])
//     }
//     return (() => { window.removeEventListener('resize', setDimension) })
//   }, [screenSize, state.signedIn])

//   const LogOutClick = () => {
//     actions.setShowMenu(false)
//     authorizeService.logout();
//     actions.setSignedIn(AuthorizeService.isSignedIn());
//   };

  const setDimension = () => getDimension({dynamicWidth: window.innerWidth})

//   const navigateToHome = () => {
//     actions.setShowMenu(false)
//     actions.setCategory(Categories.All)
//     actions.setChosenSearchOption({ value: Categories.All, label: Categories.All })
//     actions.setPage(1)
//     actions.setSearchedData("")
//     actions.setPageSize(30)
//     navigate(`/${Pages.Home}/${Categories.All}}/1/30`);
//   }

//   const choosingCategories = (menuOption: any) => {
//     actions.setShowMenu(false)
//     actions.setPage(1);
//     const category = menuOption.key.split(/[ ,]+/)[0]
//     actions.setCategory(category);
//     actions.setSearchedData("");
//     navigate(`/${Pages.Home}/${category}/1/${state.pageSize}`);
//   }

//   const onClick = (menuOption: any) => {
//     if (MenuItems.Categories === menuOption.keyPath[1]) {
//       choosingCategories(menuOption)
//     }
//     else if (MenuItems.Home === menuOption.keyPath[0]) {
//       navigateToHome()
//     }
//     else if (MenuItems.About === menuOption.keyPath[0]) {
//       actions.setShowMenu(false)
//       navigate(`/${Pages.About}`);
//     }
//     else if (MenuItems.LogOut === menuOption.keyPath[0]) {
//       LogOutClick();
//     }
//   }

  return (
    <></>
    // <Drawer
    //   placement="left"
    //   onClose={() => actions.setShowMenu(false)}
    //   open={state.showMenu}
    //   width={'350px'}
    // >
    //   <Switch onChange={(value) => setMode(value ? 'vertical' : 'inline')} />
    //   <Menu
    //     className="menu"
    //     defaultSelectedKeys={[MenuItems.Home, MenuItems.Home]}
    //     mode={mode}
    //     theme={'light'}
    //     items={items}
    //     onClick={onClick}
    //   />
    // </Drawer>
  );
};
export default MenuDrawer;