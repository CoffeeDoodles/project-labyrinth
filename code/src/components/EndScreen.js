import React from 'react';
import { useDispatch } from 'react-redux'

import game from '../reducers/game'

export const EndScreen = () => {
    const dispatch = useDispatch();
    const onReset = () => {
        dispatch(game.actions.setResetGame());
      };
    return(
        <>
            <h1 className="nes-balloon is-dark from-right nes-pointer nes-text is-success">
                Congratulations you finished the game!!!
            </h1>
            <section className="pokemon-container">
            <i class="nes-charmander"></i>
            </section>
            <button class="nes-btn is-error" onClick={onReset}>
            Restart
            </button>
        </>
    )
};