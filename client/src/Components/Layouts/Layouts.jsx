import React, { useState } from "react";
import "./Layouts.css";
import { Link, useLocation } from "react-router-dom";

const Layouts = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const userMenu = [
    {
      name: "Acceuil",
      path: "/",
      icon: "ri-home-smile-2-fill",
    },
    {
      name: "rendez-vous",
      path: "/rendez_vous",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Postuler-terrain",
      path: "/Postuler_terrain",
      icon: "ri-football-line",
    },
    {
      name: "Profile",
      path: "/Profile",
      icon: "ri-user-fill",
    },
  ];
  const logout = [
    {
      name: "Se déconnecter",
      path: "/Se_déconnecter",
      icon: "ri-logout-circle-r-line",
    },
  ];
  const menuToberender = userMenu;
  const loginout = logout;
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className={`${collapsed ? "collapsed-sidebar" : "sidebar"}`}>
          <div className="sidebar-header">
            <h1>SH</h1>
          </div>
          <div className="menu">
            {menuToberender.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            {loginout.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link>{menu.name}</Link>}
                </div>
              );
            })}
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-line header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            ) : (
              <i
                className="ri-close-line header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            )}
            <div className="d-flex">
              <i className="ri-notification-line layout-action-icon"></i>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layouts;
