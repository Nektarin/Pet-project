import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import './sideBar.css';

interface SideBarProps {
  categories: string[];
  isSidebarActive: boolean;
  isLogined: boolean;
  formToggle: React.MouseEventHandler<HTMLButtonElement>;
  closeSideBar: React.MouseEventHandler<HTMLDivElement>;
  logout: React.MouseEventHandler<HTMLButtonElement>;
  linkClose: () => void;
}

export default class SideBar extends PureComponent<SideBarProps> {
  render(): JSX.Element {
    const {
      categories,
      closeSideBar,
      isSidebarActive,
      linkClose,
      formToggle,
      isLogined,
      logout,
    } = this.props;

    let iterator = 0;
    const pathname = window.location.pathname.slice(1);
    const sideBarClass = isSidebarActive
      ? 'side-bar-wrapper active'
      : 'side-bar-wrapper';

    return (
      <div
        role="button"
        tabIndex={-1}
        onMouseDown={closeSideBar}
        className={sideBarClass}
      >
        <div className="side-bar">
          <ul className="side-bar-list">
            <li className="side-bar-list-item">
              <Link
                className="side-bar-link"
                style={{
                  textDecoration: pathname !== '' ? 'none' : 'underline',
                }}
                onClick={linkClose}
                key={iterator}
                to="/"
              >
                Categories
              </Link>
            </li>

            {categories.map((item) => {
              iterator += 1;
              return (
                <li className="side-bar-list-item">
                  <Link
                    className="side-bar-link"
                    style={{
                      textDecoration: item !== pathname ? 'none' : 'underline',
                    }}
                    onClick={linkClose}
                    key={iterator}
                    to={`/${item}`}
                  >
                    {item}
                  </Link>
                </li>
              );
            })}
            {!isLogined && (
              <li className="side-bar-list-item">
                <button
                  onClick={formToggle}
                  type="button"
                  className="sigin-btn"
                >
                  Log in
                </button>
              </li>
            )}

            {isLogined && (
              <li className="side-bar-list-item">
                <Link
                  className="side-bar-link"
                  onClick={linkClose}
                  to="/Administration"
                >
                  Administration
                </Link>
              </li>
            )}
            {isLogined && (
              <li className="side-bar-list-item">
                <button onClick={logout} type="button" className="logout-btn">
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
