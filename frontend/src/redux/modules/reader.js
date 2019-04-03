import { getData } from '../../utils/apiClient';

const initialState = {
    stories: [],
    dark: false
};

const LOAD_STORIES = 'LOAD_STORIES';
const ADD_STORY = 'ADD_STORY';
const CLEAR_ALL = 'CLEAR_ALL';
const SWITCH_MODE = 'SWITCH_MODE';

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_STORIES: {
            let storiesToReturn = [];
            let pushed = false;
            state.stories.forEach(stateStory => {
                pushed = false;
                action.payload.map((loadedStory) => {
                    if (!loadedStory.data) return;
                    if (loadedStory.data.id === stateStory.data.id) {
                        storiesToReturn.push(loadedStory);
                        action.payload.splice(action.payload.indexOf(loadedStory), 1);
                        pushed = true;
                    }
                })
                if (!pushed) {
                    storiesToReturn.push(stateStory);
                }
            });

            if (action.payload.length > 1) {
                storiesToReturn = [...action.payload, ...storiesToReturn];
            }

            return { ...state, stories: [...action.payload, ...state.stories] };
        }
        case ADD_STORY: {
            return { ...state, stories: [action.payload, ...state.stories] };
        }
        case SWITCH_MODE: {
            return { ...state, dark: !state.dark };
        }
        case CLEAR_ALL: {
            return { ...state, stories: [] };
        }
        default:
            return state;
    }
}

// ACTIONS
export const loadStories = (payload) => dispatch => {
    getData('https://jakubvancata.cz/reader/backend/get_stories.php')
        .then(res => res.json())
        .catch(e => {
            //ERROR
        })
        .then(data => {
            if (data && data.data && data.data.children) {
                dispatch({ type: LOAD_STORIES, payload: data.data.children })
            }
        });
}

export const addStory = (payload) => dispatch => {
    dispatch({ type: ADD_STORY, payload })
}

export const clearAll = (payload) => dispatch => {
    dispatch({ type: CLEAR_ALL })
}

export const switchMode = (payload) => dispatch => {
    dispatch({ type: SWITCH_MODE })
}