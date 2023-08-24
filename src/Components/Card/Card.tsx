/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { PureComponent } from 'react';
import './card.css';

export interface WordCard {
  word: string;
  translation: string;
  image: string;
  audioSrc: string;
}

export interface CardProps {
  wordCard: WordCard;
  gameMode: boolean;
}

interface CardState {
  isTurnd: boolean;
}

export default class Card extends PureComponent<CardProps, CardState> {
  constructor(props: CardProps) {
    super(props);

    this.state = {
      isTurnd: false,
    };
    this.turnAround = this.turnAround.bind(this);
    this.cardMouseLeaveHandler = this.cardMouseLeaveHandler.bind(this);
  }

  turnAround(e: React.MouseEvent<HTMLButtonElement>): void {
    e.stopPropagation();
    this.setState({ isTurnd: true });
  }

  cardMouseLeaveHandler(): void {
    this.setState({ isTurnd: false });
  }

  render(): JSX.Element {
    const { wordCard, gameMode } = this.props;
    const { isTurnd } = this.state;
    const fullImgCssClass = 'card-img-section_full';
    const coverCssClass = 'cover';
    const hiddenCssClass = 'hidden';
    const imgSectionCssClass = gameMode
      ? `${fullImgCssClass}`
      : 'card-img-section';
    const cardCssClass = isTurnd ? `card ${coverCssClass}` : 'card';
    const bottomBlockCssClass = gameMode
      ? `bottom-block ${hiddenCssClass}`
      : 'bottom-block';

    return (
      <div onMouseLeave={this.cardMouseLeaveHandler} className={cardCssClass}>
        <div className="front">
          <div className={imgSectionCssClass}>
            <img src={wordCard.image} alt="" className="card-img" />
          </div>
          <div className={bottomBlockCssClass}>
            <div className="card-word-section">{wordCard.word}</div>
            <div className="card-turn-btn-block">
              <button
                onClick={this.turnAround}
                type="button"
                aria-label="turn"
                className="turn-btn"
              />
            </div>
          </div>
        </div>
        <div className="back">
          <div className={imgSectionCssClass}>
            <img src={wordCard.image} alt="" className="card-img" />
          </div>
          <div className={bottomBlockCssClass}>
            <div className="card-word-section">{wordCard.translation}</div>
          </div>
        </div>
      </div>
    );
  }
}
