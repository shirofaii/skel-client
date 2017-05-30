import * as Redux from 'redux';
import * as projects from '../action/projects';

export const rootReducer = Redux.combineReducers({
    projects: projects.reducer
});