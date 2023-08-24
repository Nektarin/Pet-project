import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCards from '../../interfaces/CategoryCards';
import CategoryCard from '../CategoryCard/CategoryCard';
import './categoryBoard.css';

export default class CategoryBoard extends React.PureComponent<CategoryCards> {
  render(): JSX.Element {
    const { categoryCardsArray } = this.props;
    return (
      <div className="category-board">
        {categoryCardsArray.map((item) => {
          return (
            <Link to={`/${item.props.content}`}>
              <CategoryCard
                key={item.props.content}
                img={item.props.img}
                content={item.props.content}
              />
            </Link>
          );
        })}
      </div>
    );
  }
}
