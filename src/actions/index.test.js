import {correctGuess, actionTypes} from './'
import moxios from 'moxios'
import { storeFactory } from '../../test/testUtils'
import { getSecretWorld } from './'

describe('CorrectGues', () => {
  test('returns an action with type CORRECT_GUESS', () => {
    const action = correctGuess()
    expect(action).toEqual({type: actionTypes.CORRECT_GUESS})
  })
})

describe('getSecretWorld action creator', () => {
  beforeEach(() => {
    moxios.install()
  })
  afterEach(() => {
    moxios.uninstall()
  })
  test('adds response world to state', () => {
    const secretWord = 'party'
    const store = storeFactory()

    moxios.wait(() => {
      const request = moxios.requests.mostRecent()
      request.respondWith({
        status: 200,
        response: secretWord
      })
    })

    return store.dispatch(getSecretWorld())
      .then(() => {
        const newState = store.getState()
        expect(newState.secretWord).toBe(secretWord)
      })
  })
})