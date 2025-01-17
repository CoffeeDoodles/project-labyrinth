import { createSlice } from '@reduxjs/toolkit'

import { startUrl, actionUrl } from '../reusables/urls'

const game = createSlice({
  name: 'game',
  initialState: {
    userName: null,
    gameData: null,
    gameStart: false,
    history: [],
    gameOver: false,
  },
  reducers: {
    setUserName: (store, action) => {
      store.userName = action.payload
    },
    setGameData: (store, action) => {
      if (store.gameData) {
        store.history = [...store.history, store.gameData]
      }
      store.gameData = action.payload
    },
    setGameStart: (store, action) => {
      store.gameStart = action.payload
    },
    setPreviousStep: (store, action) => {
      if (store.history.length) {
        store.gameData = store.history[store.history.length - 1]
        store.history = store.history.slice(0, store.history.length - 1)
      }
    },
    setResetGame: (store, action) => {
      store.userName = null
      store.gameData = null
      store.gameStart = false
      store.history = []
      store.gameOver = false
    },
    setGameOver: (store, action) => {
      store.gameOver = action.payload
    },
  },
})

export const generateGame = (userName) => {
  return (dispatch) => {
    fetch(startUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: userName }),
    })
      .then((res) => res.json())
      .then((gameData) => dispatch(game.actions.setGameData(gameData)))
  }
}

export const continueGame = (direction) => {
  return (dispatch, getState) => {
    fetch(actionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: getState().game.userName,
        type: 'move',
        direction: direction,
      }),
    })
      .then((res) => res.json())
      .then((gameData) => dispatch(game.actions.setGameData(gameData)))
  }
}

export default game
