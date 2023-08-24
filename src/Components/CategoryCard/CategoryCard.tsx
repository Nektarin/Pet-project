import React, { PureComponent } from 'react';
import './categoryCard.css';

export interface CategoryCardProps {
  img: string;
  content: string;
}

export default class CategoryCard extends PureComponent<CategoryCardProps> {
  render(): JSX.Element {
    const { content, img } = this.props;

    return (
      <div className="category-card">
        <div className="category-card-img-section">
          <img className="category-card-img" src={img} alt="" />
        </div>
        <div className="category-card-content">{content}</div>
      </div>
    );
  }
}
