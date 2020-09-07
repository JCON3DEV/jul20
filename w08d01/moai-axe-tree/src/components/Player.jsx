import React, { useEffect } from 'react';
import { announceResult, chooseRobotItem } from '../helpers/helpers';

const registerPlayerItem = (value, updater) => {
  updater(prevState => ({ ...prevState, playerSelection: value }));
};

const options = [
  ['Moai', '🗿'],
  ['Axe', '🪓'],
  ['Tree', '🌳']
];

const Player = (props) => {
  const {playerSelection, compSelection, cheating} = props.state;
  const {setState} = props;

  useEffect(() => {
    if(playerSelection && compSelection){
      const status = announceResult(playerSelection, compSelection);
      setState(prevState => ({ ...prevState, status }));
    }
  }, [playerSelection, compSelection, setState]);

  useEffect(() => {
    if (playerSelection) {
      const compSelection = chooseRobotItem();
      setState(prevState => ({ ...prevState, compSelection }));
    }
  }, [playerSelection, cheating, setState]);

  const resetState = () => {
    setState(prevState => ({
        ...prevState,
        playerSelection: null,
        compSelection: null,
        status: 'Waiting'
      }
    ));
  };

  return (
    <section className="player">
      <span
        role="img"
        aria-label="player"
        onClick={resetState}
      >👤</span>
      <div>
        <h1>Choose your destiny !</h1>
        <div className="choices">

          { options.map((option) => {
            const [choice, symbol] = option;
            return (
              <button
                onClick={() => registerPlayerItem(choice, setState)}
                type="button"
                value={choice}
                key={choice}
              >
                <span
                  role="img"
                  aria-label={choice.toLowerCase()}
                >
                  {symbol}
                </span>
              </button>
            );
          }) }

        </div>
      </div>
    </section>
  );
};

export default Player;
