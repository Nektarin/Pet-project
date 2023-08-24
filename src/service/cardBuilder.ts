import Card, { WordCard } from '../Components/Card/Card';
import {
  actionA,
  actionB,
  animalsA,
  animalsB,
  clothes,
  emotions,
  food,
  furniture,
} from './wordCards';
import categoryCards from './categoryCards';
import CategoryCard from '../Components/CategoryCard/CategoryCard';
import CategoryCards from '../interfaces/CategoryCards';

export function buildWordCards(category: string): { cards: WordCard[] } {
  let allCards: WordCard[] = [];
  switch (category) {
    case 'Actions_A':
      allCards = actionA;
      break;
    case 'Actions_B':
      allCards = actionB;
      break;
    case 'Animals_A':
      allCards = animalsA;
      break;
    case 'Animals_B':
      allCards = animalsB;
      break;
    case 'Clothes':
      allCards = clothes;
      break;
    case 'Emotions':
      allCards = emotions;
      break;
    case 'Food':
      allCards = food;
      break;
    case 'Furniture':
      allCards = furniture;
      break;
    default:
      break;
  }
  const arrCardComponent: WordCard[] = [];

  allCards.forEach((item) => {
    arrCardComponent.push(item);
  });
  const cardsBundle: WordCard[] = allCards;

  return { cards: cardsBundle };
}

export function buildCategoryCards(): CategoryCards {
  const allCards = categoryCards;
  const arrCardComponent: CategoryCard[] = [];

  allCards.forEach((item) => {
    arrCardComponent.push(new CategoryCard(item));
  });
  const cardsBundle: CategoryCards = {
    categoryCardsArray: arrCardComponent,
  };

  return cardsBundle;
}
