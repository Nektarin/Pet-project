import React, { PureComponent } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import PageProps from '../../interfaces/PageProps';
import CategoryBoard from '../categoryBoard/CategoryBoard';
import Board from '../Board/Board';
import Header from '../Header/Header';
import Login from '../admin/Login/Login';
import Administration from '../admin/Administration/Administration';
import getCategories from '../../service/getCategories';
import { buildCategoryCards, buildWordCards } from '../../service/cardBuilder';

import './Page.css';

interface PageState {
  isGame: boolean;
  isFormActive: boolean;
  isLogined: boolean;
}

export default class Page extends PureComponent<PageProps, PageState> {
  constructor(props: PageProps) {
    super(props);

    this.state = {
      isGame: false,
      isFormActive: false,
      isLogined: false,
    };

    this.switchGameMode = this.switchGameMode.bind(this);
  }

  logout = (): void => {
    this.setState({ isLogined: false });
  };

  toggleForm = (event: React.MouseEvent): void => {
    const { target } = event;

    if (
      (target as HTMLDivElement).className === 'login-wrapper' ||
      (target as HTMLDivElement).className === 'cancel-btn'
    ) {
      this.setState({ isFormActive: false });
      return;
    }

    this.setState({ isFormActive: true });
  };

  authorizationHandler = (event: React.FormEvent): void => {
    event.preventDefault();
    this.setState({ isLogined: true, isFormActive: false });
  };

  switchGameMode(): void {
    const { isGame } = this.state;

    this.setState({
      isGame: !isGame,
    });
  }

  render(): JSX.Element {
    const { isGame, isLogined, isFormActive } = this.state;
    const allCategories = getCategories();
    const categoryCards = buildCategoryCards().categoryCardsArray;

    return (
      <Router>
        <div className="content">
          {!isLogined && isFormActive && (
            <Login
              toggleForm={this.toggleForm}
              submitHandler={this.authorizationHandler}
            />
          )}

          <Switch>
            <Route exact path="/">
              <Header
                gameModeToggleHandler={this.switchGameMode}
                formToggle={this.toggleForm}
                isLogined={isLogined}
                logout={this.logout}
                isGameMode={isGame}
              />
              <CategoryBoard categoryCardsArray={categoryCards} />
            </Route>
            {allCategories.map((item) => {
              return (
                <Route key={`/${item}`} path={`/${item}`}>
                  <Header
                    gameModeToggleHandler={this.switchGameMode}
                    formToggle={this.toggleForm}
                    isLogined={isLogined}
                    logout={this.logout}
                    isGameMode={isGame}
                  />
                  <Board
                    key={item}
                    gameMode={isGame}
                    cards={buildWordCards(item).cards}
                  />
                </Route>
              );
            })}
            <Route path="/Administration">
              <Administration isLogined={isLogined} />
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
