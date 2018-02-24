/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';

import './Crossword.css';
import Separators from '../Separators/Separators';
import Cells from '../Cells/Cells';
import CellInput from '../Cells/CellInput';
import {
  cellContainsOtherDirection, createCrossword, cellIsStartingWord,
  deselectAll, emptyAll, getCurrentId,
  getInputPosition, highlightId, isIgnorableKey, toggleDirection,
} from './crosswordHelper';

class Crossword extends React.Component {

  constructor(props) {
    super(props);

    this.separators = [];
    this.numberOfColumns = 0;
    this.numberOfRows = 0;
    this.inputWidth = 0;
    this.inputHeight = 0;
    this.boardWidth = 0;
    this.boardHeight = 0;

    this.state = {
      isLoading: true,
      direction: 'across',
    };

    this.clickHandler = this.clickHandler.bind(this);
    this.keyDownHandler = this.keyDownHandler.bind(this);
    this.keyUpHandler = this.keyUpHandler.bind(this);
    this.inputClickHandler = this.inputClickHandler.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
    const { match } = this.props;
    this.crosswordId = match.params.id;
    createCrossword(this.crosswordId)
      .then(({ name, cells, separators, numberOfColumns, numberOfRows, boardWidth, boardHeight, inputWidth, inputHeight }) => {

        Object.assign(this, { name, separators, numberOfColumns, numberOfRows, boardWidth, boardHeight, inputWidth, inputHeight });

        this.setState({ cells });
        setTimeout(() => this.setState({ isLoading: false }), 400);
      });
  }

  reset() {
    localStorage.removeItem(`kryzz-${this.crosswordId}`);
    const { cells } = this.state;
    emptyAll(cells);
    this.setState({ cells });
  }

  highlightCurrentSelection({ direction }) {
    const { cells, currentCell, selection } = this.state;
    return new Promise((resolve) => {
      const id = getCurrentId({ currentCell, direction, selection });
      this.cellInput.focus();
      if (id) {
        highlightId({ cells, direction, id, currentCell });
      }
      this.setState({ direction, selection: id }, () => resolve({ direction }));
    });
  }


  clickHandler(event, row, column) {
    let { direction } = this.state;
    const { cells } = this.state;
    const currentCell = cells[row][column];
    if (currentCell.number &&
        !currentCell.highlighted &&
        !cellIsStartingWord({ cell: currentCell, direction }) &&
        cellContainsOtherDirection({ currentCell, direction }) &&
        cellIsStartingWord({ cell: currentCell, direction: toggleDirection(direction) })) {
      direction = toggleDirection(direction);
    }
    if (!currentCell[direction] || currentCell.selected) {
      direction = toggleDirection(direction);
    }
    this.setState({ currentCell }, () => {
      this.highlightCurrentSelection({ direction })
        .then(({ direction: newDirection }) => {
          this.setState({ cells, direction: newDirection, currentCell });
        });
    });
  }


  inputClickHandler() {
    let { direction, currentCell } = this.state;
    const { cells, selection } = this.state;

    if (currentCell) {
      if (cellContainsOtherDirection({ currentCell, direction })) {
        direction = toggleDirection(direction);
        this.highlightCurrentSelection({ direction });
      } else if (currentCell[direction].length > 1) {
        const currentIndex = currentCell[direction].indexOf(selection);
        const nextIndex = (currentIndex + 1) % currentCell[direction].length;
        const newId = currentCell[direction][nextIndex];
        highlightId({ cells, direction, id: newId, currentCell });
        this.setState({ cells, selection: newId });
      }
    } else {
      currentCell = cells[0][0]; // eslint-disable-line prefer-destructuring
      this.setState({ currentCell }, () => {
        this.highlightCurrentSelection({ direction });
      });
    }
  }

  keyUpHandler() {
    // Prevent auto repeat
    this.down = false;
  }

  handleArrowMove({ arrow }) {
    const { cells, currentCell } = this.state;
    const { row, column } = currentCell;

    /* eslint-disable no-shadow */
    const moves = {
      Left: (cells, row, column) => cells[row][column - 1],
      Right: (cells, row, column) => cells[row][column + 1],
      Up: (cells, row, column) => cells[row - 1] && cells[row - 1][column],
      Down: (cells, row, column) => cells[row + 1] && cells[row + 1][column],
    };
    /* eslint-enable no-shadow */

    const newCell = moves[arrow](cells, row, column);
    if (newCell) {
      this.moveTo(newCell);
    }
  }

  keyDownHandler(event) {
    const { key } = event;

    if (key === 'Shift' || event.metaKey) {
      return;
    }

    // Prevent auto repeat
    if (this.down) {
      return;
    }

    this.down = true;


    // Is it an arrow key?
    const [, arrow] = key.match(/Arrow(\w+)$/) || [];


    if (arrow) {
      this.handleArrowMove({ arrow });
    }

    const { currentCell } = this.state;

    if (isIgnorableKey(key)) {
      event.preventDefault();
      return;
    }

    if (key === 'Backspace') {
      if (currentCell.text) {
        currentCell.text = '';
        this.setState({ currentCell });
      } else {
        this.moveToPrevious();
      }
    } else {
      currentCell.text = key.toUpperCase();
      this.setState({ currentCell });
      this.moveToNext();
    }

    const entries = this.state.cells.map(row => row.map(cell => cell && cell.text));
    localStorage.setItem(`kryzz-${this.crosswordId}`, JSON.stringify(entries));

  }

  moveTo(nextCell) {
    const { cells } = this.state;
    let { direction, selection } = this.state;
    if (!nextCell[direction] || !nextCell[direction].includes(selection)) {
      direction = toggleDirection(direction);
      if (!nextCell[direction] || !nextCell[direction].length) {
        direction = toggleDirection(direction);
      }
      selection = [nextCell[direction]];
    }
    highlightId({ cells, direction, id: selection, currentCell: nextCell });
    this.setState({ cells, selection, currentCell: nextCell, direction });
    this.cellInput.focus();
  }

  moveToPrevious() {
    this.moveToNext(-1);
  }


  moveToNext(dir = 1) {
    const { direction, cells, selection } = this.state;
    const array = [];

    cells
      .map(row =>
        row.forEach((cell) => {
          if (cell && cell[direction] && cell[direction].includes(selection)) {
            array.push(cell);
          }
        }));

    let nextCell;
    const currentIndex = array.findIndex(cell => cell.selected);
    if (currentIndex > -1 && currentIndex < array.length) {
      const nextIndex = currentIndex + dir;
      nextCell = array[nextIndex];
    }

    if (nextCell) {
      deselectAll(cells);
      nextCell.selected = true;
      this.setState({ currentCell: nextCell, cells });
      this.cellInput.focus();
    }

  }

  render() {

    const { cells, currentCell = {}, isLoading } = this.state;
    const { left, top } = getInputPosition(currentCell);

    return (
      <div className="crossword">
        <h3>{this.name}</h3>
        <div className={`crossword-container ${isLoading ? 'crossword-container--loading' : ''}`}>
          <div className="crossword-board">
            <svg className="crossword__grid" viewBox={`0 0 ${this.boardWidth} ${this.boardHeight}`} fill="#222222">
              <rect x="0" y="0" width={this.boardWidth} height={this.boardHeight} className="crossword__grid-background" />
              { cells && <Cells cells={cells} clickHandler={this.clickHandler} /> }
              <Separators separators={this.separators} />
            </svg>
            <CellInput
              top={top}
              left={left}
              width={this.inputWidth}
              height={this.inputHeight}
              keyDownHandler={this.keyDownHandler}
              keyUpHandler={this.keyUpHandler}
              clickHandler={this.inputClickHandler}
              ref={(input) => { this.cellInput = input; }}
            />
          </div>
          <div className={`loading ${isLoading ? '' : 'hide'}`}>
            <svg width="284px" height="68px" viewBox="0 0 284 68" >
              <path d="M0,0.5859375 L10.1171875,0.5859375 L10.1171875,59.3359375 L23.90625,59.3359375 L23.90625,67.3046875 L0,67.3046875 L0,0.5859375 Z M51.078125,67.890625 C50.0104113,67.890625 48.8515688,67.8059904 47.6015625,67.6367188 C46.3515562,67.4674471 45.1145895,67.1093777 43.890625,66.5625 C42.6666605,66.0156223 41.4882869,65.2408904 40.3554688,64.2382812 C39.2226506,63.2356721 38.2200564,61.9140707 37.3476562,60.2734375 C36.4752561,58.6328043 35.7786484,56.608085 35.2578125,54.1992188 C34.7369766,51.7903525 34.4765625,48.9192875 34.4765625,45.5859375 L34.4765625,21.953125 C34.4765625,18.5937332 34.7434869,15.7226682 35.2773438,13.3398438 C35.8112006,10.9570193 36.5208289,8.95183105 37.40625,7.32421875 C38.2916711,5.69660645 39.3007756,4.40104648 40.4335938,3.4375 C41.5664119,2.47395352 42.7512959,1.73828379 43.9882812,1.23046875 C45.2252666,0.722653711 46.455723,0.390625781 47.6796875,0.234375 C48.903652,0.0781242188 50.0364531,0 51.078125,0 C52.0677133,0 53.1679627,0.0716138672 54.3789062,0.21484375 C55.5898498,0.358073633 56.8007752,0.670570508 58.0117188,1.15234375 C59.2226623,1.63411699 60.4010359,2.35025566 61.546875,3.30078125 C62.6927141,4.25130684 63.7083289,5.54035645 64.59375,7.16796875 C65.4791711,8.79558105 66.1887994,10.81379 66.7226562,13.2226562 C67.2565131,15.6315225 67.5234375,18.5416496 67.5234375,21.953125 L67.5234375,45.5859375 C67.5234375,48.8932457 67.2500027,51.7382693 66.703125,54.1210938 C66.1562473,56.5039182 65.4401086,58.5221271 64.5546875,60.1757812 C63.6692664,61.8294354 62.6471412,63.1575471 61.4882812,64.1601562 C60.3294213,65.1627654 59.1445373,65.9440076 57.9335938,66.5039062 C56.7226502,67.0638049 55.5182352,67.4348949 54.3203125,67.6171875 C53.1223898,67.7994801 52.0416715,67.890625 51.078125,67.890625 Z M51.078125,60.2734375 C52.0677133,60.2734375 52.93359,60.1041684 53.6757812,59.765625 C54.4179725,59.4270816 55.0299455,58.84115 55.5117188,58.0078125 C55.993492,57.174475 56.3580717,56.0742256 56.6054688,54.7070312 C56.8528658,53.3398369 56.9765625,51.6145937 56.9765625,49.53125 L56.9765625,19.1796875 C56.9765625,17.0442602 56.8528658,15.2604238 56.6054688,13.828125 C56.3580717,12.3958262 55.993492,11.2434939 55.5117188,10.3710938 C55.0299455,9.49869355 54.4179725,8.88021016 53.6757812,8.515625 C52.93359,8.15103984 52.0677133,7.96875 51.078125,7.96875 C50.0624949,7.96875 49.1770871,8.15103984 48.421875,8.515625 C47.6666629,8.88021016 47.0416691,9.49869355 46.546875,10.3710938 C46.0520809,11.2434939 45.6809908,12.3958262 45.4335938,13.828125 C45.1861967,15.2604238 45.0625,17.0442602 45.0625,19.1796875 L45.0625,49.53125 C45.0625,51.6145937 45.1861967,53.3398369 45.4335938,54.7070312 C45.6809908,56.0742256 46.0520809,57.174475 46.546875,58.0078125 C47.0416691,58.84115 47.6666629,59.4270816 48.421875,59.765625 C49.1770871,60.1041684 50.0624949,60.2734375 51.078125,60.2734375 Z M90.4375,0.5859375 L102.078125,0.5859375 L114.421875,67.3046875 L104.1875,67.3046875 L102.351562,55.3515625 L90.1640625,55.3515625 L88.40625,67.3046875 L78.1328125,67.3046875 L90.4375,0.5859375 Z M101.179688,47.734375 L96.4921875,14.4921875 L96.0625,14.4921875 L91.3359375,47.734375 L101.179688,47.734375 Z M126.867188,0.5859375 L137.375,0.5859375 C138.96355,0.5859375 140.610669,0.631509961 142.316406,0.72265625 C144.022144,0.813802539 145.688794,1.09374766 147.316406,1.5625 C148.944019,2.03125234 150.480462,2.75390137 151.925781,3.73046875 C153.371101,4.70703613 154.64062,6.07420996 155.734375,7.83203125 C156.82813,9.58985254 157.694007,11.8033721 158.332031,14.4726562 C158.970055,17.1419404 159.289062,20.4036266 159.289062,24.2578125 L159.289062,43.6328125 C159.289062,47.4869984 158.970055,50.7551949 158.332031,53.4375 C157.694007,56.1198051 156.82813,58.3333246 155.734375,60.078125 C154.64062,61.8229254 153.371101,63.1835889 151.925781,64.1601562 C150.480462,65.1367236 148.944019,65.8593727 147.316406,66.328125 C145.688794,66.7968773 144.022144,67.0768225 142.316406,67.1679688 C140.610669,67.259115 138.96355,67.3046875 137.375,67.3046875 L126.867188,67.3046875 L126.867188,0.5859375 Z M139.5625,60.234375 C141.385426,60.234375 142.889317,60.0000023 144.074219,59.53125 C145.259121,59.0624977 146.196611,58.235683 146.886719,57.0507812 C147.576826,55.8658795 148.052082,54.2513123 148.3125,52.2070312 C148.572918,50.1627502 148.703125,47.5781406 148.703125,44.453125 L148.703125,23.75 C148.703125,20.6249844 148.572918,18.0403748 148.3125,15.9960938 C148.052082,13.9518127 147.576826,12.3372455 146.886719,11.1523438 C146.196611,9.96744199 145.259121,9.14062734 144.074219,8.671875 C142.889317,8.20312266 141.385426,7.96875 139.5625,7.96875 L136.984375,7.96875 L136.984375,60.234375 L139.5625,60.234375 Z M174.3125,0.5859375 L184.429688,0.5859375 L184.429688,67.3046875 L174.3125,67.3046875 L174.3125,0.5859375 Z M201.835938,0.5859375 L210.039063,0.5859375 L226.210938,45.234375 L226.445313,45.234375 C226.367187,44.1927031 226.263021,43.0338605 226.132813,41.7578125 C226.002604,40.4817645 225.885417,39.0299561 225.78125,37.4023438 C225.677083,35.7747314 225.585938,33.932302 225.507813,31.875 C225.429687,29.817698 225.390625,27.5000129 225.390625,24.921875 L225.390625,0.5859375 L234.453125,0.5859375 L234.453125,67.3046875 L226.171875,67.3046875 L210.078125,23.828125 L209.765625,23.828125 C209.84375,25.0000059 209.947916,26.2695244 210.078125,27.6367188 C210.208334,29.0039131 210.32552,30.6119699 210.429688,32.4609375 C210.533855,34.3099051 210.625,36.4648314 210.703125,38.9257813 C210.78125,41.3867311 210.820313,44.3098789 210.820313,47.6953125 L210.820313,67.3046875 L201.835938,67.3046875 L201.835938,0.5859375 Z M265.335938,67.9296875 C264.554684,67.9296875 263.643234,67.8450529 262.601562,67.6757812 C261.559891,67.5065096 260.485683,67.1484402 259.378906,66.6015625 C258.27213,66.0546848 257.184901,65.2799529 256.117188,64.2773438 C255.049474,63.2747346 254.092452,61.9466229 253.246094,60.2929688 C252.399735,58.6393146 251.716148,56.608085 251.195312,54.1992188 C250.674477,51.7903525 250.414062,48.9192875 250.414062,45.5859375 L250.414062,21.953125 C250.414062,18.5937332 250.687497,15.7226682 251.234375,13.3398438 C251.781253,10.9570193 252.510412,8.95183105 253.421875,7.32421875 C254.333338,5.69660645 255.381504,4.40104648 256.566406,3.4375 C257.751308,2.47395352 258.981764,1.73828379 260.257812,1.23046875 C261.533861,0.722653711 262.796869,0.390625781 264.046875,0.234375 C265.296881,0.0781242188 266.455724,0 267.523438,0 C270.231784,0 272.516918,0.371090039 274.378906,1.11328125 C276.240895,1.85547246 277.751296,2.8710873 278.910156,4.16015625 C280.069016,5.4492252 280.902341,6.95311641 281.410156,8.671875 C281.917971,10.3906336 282.171875,12.213532 282.171875,14.140625 C282.171875,15.5729238 282.08724,16.8945252 281.917969,18.1054688 C281.748697,19.3164123 281.520835,20.6510344 281.234375,22.109375 L273.148438,22.109375 L273.148438,18.9453125 C273.148438,11.6275676 271.182311,7.96875 267.25,7.96875 C266.182286,7.96875 265.257816,8.15103984 264.476562,8.515625 C263.695309,8.88021016 263.044273,9.49869355 262.523438,10.3710938 C262.002602,11.2434939 261.618491,12.3958262 261.371094,13.828125 C261.123697,15.2604238 261,17.0442602 261,19.1796875 L261,49.4140625 C261,51.4974062 261.123697,53.2291598 261.371094,54.609375 C261.618491,55.9895902 261.996091,57.09635 262.503906,57.9296875 C263.011721,58.763025 263.649736,59.355467 264.417969,59.7070312 C265.186202,60.0585955 266.104161,60.234375 267.171875,60.234375 C268.291672,60.234375 269.255204,59.9414092 270.0625,59.3554688 C270.869796,58.7695283 271.533852,57.9687551 272.054688,56.953125 C272.575523,55.9374949 272.959634,54.7395902 273.207031,53.359375 C273.454428,51.9791598 273.578125,50.4817789 273.578125,48.8671875 L273.578125,40.15625 L268.382812,40.15625 L268.382812,33.515625 L283.421875,33.515625 L283.421875,67.3046875 L276.703125,67.3046875 L275.609375,60.9765625 C274.333327,63.4505332 272.868498,65.2278592 271.214844,66.3085938 C269.56119,67.3893283 267.601574,67.9296875 265.335938,67.9296875 Z" fill="#FFFFFF" />
            </svg>
          </div>
        </div>
        <button onClick={this.reset} className={isLoading ? 'hidden' : ''}>Reset</button>
      </div>
    );
  }
}

Crossword.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
};


export default Crossword;
