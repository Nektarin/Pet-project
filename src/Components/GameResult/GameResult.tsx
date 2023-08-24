import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import playAudio from '../../service/cardEventHandlers';
import './gameResult.css';

interface GameResultProps {
  isSuccess: boolean;
  attempts: number;
}

interface GameResultState {
  isRedirect: boolean;
}

export default class GameResult extends PureComponent<
  GameResultProps,
  GameResultState
> {
  constructor(props: GameResultProps) {
    super(props);

    this.state = { isRedirect: false };
  }

  componentDidMount(): void {
    const successSrc = 'Assets/audio/success.mp3';
    const failSrc = 'Assets/audio/failure.mp3';
    const { isSuccess } = this.props;

    if (isSuccess) {
      playAudio(successSrc, false);
    } else {
      playAudio(failSrc, false);
    }

    setTimeout(() => {
      this.setState({ isRedirect: true });
    }, 5000);
  }

  render(): JSX.Element {
    const { isSuccess, attempts } = this.props;
    const { isRedirect } = this.state;
    const imgSrc = isSuccess
      ? 'Assets/image/success.jpg'
      : 'Assets/image/failure.jpg';

    if (isRedirect) {
      return <Redirect to="/" />;
    }

    return (
      <div className="game-over">
        <div className="game-over-img-block">
          <img className="game-over-img" src={imgSrc} alt="" />
        </div>
        {!isSuccess && <div className="attemps">{`${attempts} attemps`}</div>}
      </div>
    );
  }
}
