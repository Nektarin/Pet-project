import React, { PureComponent } from 'react';
import './statusBar.css';

interface StatusBarProp {
  imgs: JSX.Element[];
}

interface StatusBarProps {
  imgs: StatusBarProp;
}

export default class StatusBar extends PureComponent<StatusBarProps> {
  render(): JSX.Element {
    const { imgs } = this.props;

    return (
      <div className="status-bar">
        {imgs.imgs.map((item) => {
          return item;
        })}
      </div>
    );
  }
}
