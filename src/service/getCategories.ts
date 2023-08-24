import categoryCards from './categoryCards';

export default function getCategories(): string[] {
  const categories: string[] = [];
  categoryCards.forEach((item) => {
    const label = item.content;
    categories.push(label);
  });

  return categories;
}
