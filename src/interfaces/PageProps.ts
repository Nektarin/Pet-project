import CategoryCards from './CategoryCards';
import { BoardProps } from '../Components/Board/Board';

export default interface PageProps {
  cards?: CategoryCards | BoardProps;
}
