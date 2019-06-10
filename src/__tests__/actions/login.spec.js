import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import authReducer, { REQUEST, RECEIVE, FAIL, GET, SET, REMOVE } from '../../Login/duck';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const store = mockStore({});

xdescribe('Login reducer', () => {
    it('should return the initial state', () => {
      expect(authReducer(undefined, {})).toEqual([
        {
            isAuthenticated: false,
            isLoading: null,
            error: null,
            token: null,
        }
      ])
    });
});
