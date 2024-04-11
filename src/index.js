import 'normalize.css';
import './styles/styleBarrel';
import './gameLoop';

// test
import game from './game';

game.getCurrent().enableDragging();
game.getOther().enableDragging();
