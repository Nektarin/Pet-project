import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import './administration.css';

export interface AdministrationProps {
  isLogined: boolean;
}

export default class Administration extends PureComponent<AdministrationProps> {
  render(): JSX.Element {
    const { isLogined } = this.props;
    if (!isLogined) {
      return <Redirect to="/" />;
    }
    return (
      <div>
        <header className="admin-header">
          <ul className="admin-header-ul">
            <li className="admin-header-item">Categories</li>
            <li className="admin-header-item">Words</li>
            <li className="admin-header-item">Log out</li>
          </ul>
        </header>
      </div>
    );
  }
}
