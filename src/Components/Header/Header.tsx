/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import getCategories from '../../service/getCategories';
import SideBar from '../SideBar/SideBar';
import './header.css';

interface HeaderProps {
  isGameMode: boolean;
  isLogined: boolean;
  gameModeToggleHandler: React.MouseEventHandler<HTMLLabelElement>;
  formToggle: React.MouseEventHandler<HTMLButtonElement>;
  logout: React.MouseEventHandler<HTMLButtonElement>;
}

interface HeaderState {
  isSideBarActive: boolean;
}

export default class Header extends PureComponent<HeaderProps, HeaderState> {
  constructor(props: HeaderProps) {
    super(props);

    this.state = { isSideBarActive: false };

    this.openSideBar = this.openSideBar.bind(this);
    this.closeSideBar = this.closeSideBar.bind(this);
    this.linkClose = this.linkClose.bind(this);
  }

  closeSideBar(event: React.MouseEvent<HTMLDivElement>): void {
    const { target } = event;
    if (
      !(target instanceof HTMLDivElement) ||
      !target.classList.contains('side-bar-wrapper')
    ) {
      return;
    }

    this.setState({ isSideBarActive: false });
  }

  openSideBar(): void {
    const { isSideBarActive } = this.state;
    this.setState({ isSideBarActive: !isSideBarActive });
  }

  linkClose(): void {
    this.setState({ isSideBarActive: false });
  }

  render(): JSX.Element {
    const { gameModeToggleHandler, isGameMode, formToggle, isLogined, logout } =
      this.props;
    const { isSideBarActive } = this.state;
    const allCategories = getCategories();

    const labelText = isGameMode ? 'game' : 'train';

    return (
      <header className="header">
        <SideBar
          isSidebarActive={isSideBarActive}
          closeSideBar={this.closeSideBar}
          categories={allCategories}
          linkClose={this.linkClose}
          formToggle={formToggle}
          isLogined={isLogined}
          logout={logout}
        />
        <div
          role="button"
          onMouseDown={this.openSideBar}
          tabIndex={0}
          className={`burger-wrapper ${isSideBarActive && 'open'}`}
        >
          <div className="upper-burger" />
          <div className="middle-burger" />
          <div className="bottom-burger" />
        </div>
        <div className="switcher-wrapper">
          <div className="game-mode-text">{labelText}</div>
          <label
            onMouseDown={gameModeToggleHandler}
            htmlFor="switcher"
            className="switch"
          >
            <input type="checkbox" id="switcher" />
            <span className="slider round" />
          </label>
        </div>
      </header>
    );
  }
}
