import { SUBMIT_BANK_DETAILS, PERSONAL_DATA_OF_WORKER,UPDATE_PERSONAL_DATA_OF_WORKER } from '../actions/types.js';

export default function(state = {}, action){
    switch(action.type){
        case SUBMIT_BANK_DETAILS:
            return { ...state, bankDetailsSubmitted: true }
        case PERSONAL_DATA_OF_WORKER:
            return { ...state, personalDataOfWorker: action.payload }
    }

    return state;
}
