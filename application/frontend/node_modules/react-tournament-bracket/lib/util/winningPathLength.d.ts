import { Game } from '../components/model';
export default function winningPathLength(game: Game, visited?: {
    [id: string]: true;
}): number;
