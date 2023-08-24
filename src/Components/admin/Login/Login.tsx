/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import './login.css';

export interface LoginProps {
  toggleForm: React.MouseEventHandler<HTMLDivElement>;
  submitHandler: (event: React.FormEvent) => void;
}

export interface LoginState {
  isRedirect: boolean;
}

export default class Login extends PureComponent<LoginProps> {
  render(): JSX.Element {
    const { submitHandler, toggleForm } = this.props;

    return (
      <div onMouseDown={toggleForm} className="login-wrapper">
        <form onSubmit={submitHandler} className="form-authorization">
          Login
          <div className="inputs-wrapper">
            <input type="text" placeholder="login" required />
            <input type="text" placeholder="password" required />
          </div>
          <div className="button-wrapper">
            <button type="submit" className="login-btn">
              log in
            </button>
            <button type="button" className="cancel-btn">
              cancel
            </button>
          </div>
        </form>
      </div>
    );
  }
}
