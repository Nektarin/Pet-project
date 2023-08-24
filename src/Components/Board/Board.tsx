/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { PureComponent } from 'react';
import { makeObservable, observable } from 'mobx';
import Card, { WordCard } from '../Card/Card';
import StatusBar from './StatusBar/StatusBar';
import './board.css';
import createStar from '../../service/createStar';
import playAudio from '../../service/cardEventHandlers';
import GameResult from '../GameResult/GameResult';

export interface BoardProps {
  cards: WordCard[];
  gameMode: boolean;
}

interface BoardState {
  isGAmeStart: boolean;
  isGameEnd: boolean;
  starArr: { imgs: JSX.Element[] };
}

export default class Board extends PureComponent<BoardProps, BoardState> {
  cards: WordCard[] = [];

  currentCard: WordCard = {
    audioSrc: '',
    image: '',
    word: '',
    translation: '',
  };

  currentCardIndex = 0;

  gameResult = false;

  attemps = 0;

  constructor(props: BoardProps) {
    super(props);

    this.state = {
      isGAmeStart: false,
      isGameEnd: false,
      starArr: { imgs: [] },
    };

    this.startGame = this.startGame.bind(this);
    this.handleAnswer = this.handleAnswer.bind(this);

    makeObservable(this, {
      currentCardIndex: observable,
      gameResult: observable,
      attemps: observable,
    });
  }

  componentDidUpdate(): void {
    const { isGAmeStart } = this.state;

    if (!isGAmeStart || this.currentCardIndex === this.cards.length) {
      return;
    }

    const prevIndex = this.cards.findIndex(
      (item) => this.currentCard.word === item.word
    );

    if (prevIndex !== this.currentCardIndex && this.currentCardIndex !== 0) {
      this.currentCard = this.cards[this.currentCardIndex];
      setTimeout(() => {
        playAudio(this.currentCard.audioSrc, false);
      }, 1000);
    }
  }

  handleAnswer(
    event: React.MouseEvent<HTMLLIElement>,
    answer: string,
    correctAnswer: string,
    starArr: JSX.Element[]
  ): void {
    const correctAudioSrc = 'Assets/audio/correct.mp3';
    const error = 'Assets/audio/error.mp3';
    const arr = starArr.slice();
    const isCorrect = answer === correctAnswer;

    arr.push(createStar(isCorrect));

    if (isCorrect) {
      const { currentTarget } = event;
      (currentTarget as HTMLLIElement).classList.add('disabled');
      this.currentCardIndex += 1;
      this.attemps += 1;
      playAudio(correctAudioSrc, false);

      if (this.currentCardIndex === this.cards.length) {
        this.gameResult = this.attemps === this.cards.length;
        this.setState({ isGameEnd: true });
      }
    } else {
      this.attemps += 1;
      playAudio(error, false);
    }

    this.setState({
      starArr: { imgs: arr },
    });
  }

  clickHandle(event: React.MouseEvent<HTMLLIElement>, card: WordCard): void {
    const { starArr, isGAmeStart } = this.state;
    const { gameMode } = this.props;
    const { audioSrc, word } = card;

    if (!isGAmeStart) {
      playAudio(audioSrc, gameMode);
      return;
    }

    this.handleAnswer(event, word, this.currentCard.word, starArr.imgs);
  }

  startGame(): void {
    const { cards } = this.props;
    this.cards = cards.slice();
    this.cards.sort(() => Math.random() - 0.5);
    const [first] = this.cards;
    this.currentCard = first;

    playAudio(this.currentCard.audioSrc, false);
    this.setState({ isGAmeStart: true });
  }

  render(): JSX.Element {
    const { cards, gameMode } = this.props;
    const { isGAmeStart, isGameEnd, starArr } = this.state;

    if (isGameEnd) {
      return <GameResult attempts={this.attemps} isSuccess={this.gameResult} />;
    }

    return (
      <div className="game-start-wrapper">
        <StatusBar imgs={starArr} />
        <ul className="board">
          {cards.map((item) => {
            return (
              <li
                className="board-item"
                onClick={(event) => {
                  this.clickHandle(event, item);
                }}
              >
                <Card key={item.word} wordCard={item} gameMode={gameMode} />
              </li>
            );
          })}
        </ul>
        {gameMode && !isGAmeStart && (
          <button
            type="submit"
            onClick={this.startGame}
            className="start-game-btn"
          >
            Start game
          </button>
        )}
        {gameMode && isGAmeStart && (
          <button
            type="submit"
            onClick={() => {
              playAudio(this.currentCard.audioSrc, false);
            }}
            className="start-game-btn"
          >
            Repeat
          </button>
        )}
      </div>
    );
  }
}
