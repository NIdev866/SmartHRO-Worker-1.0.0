import { 
  SUBMIT_BANK_DETAILS, 
  PERSONAL_DATA_OF_WORKER,UPDATE_PERSONAL_DATA_OF_WORKER,
  SIGNING_UP_USER,
  SIGNING_UP_SUCCESSFUL 
} from '../actions/types.js';

export default function(state = {}, action){
    switch(action.type){
        case SUBMIT_BANK_DETAILS:
          return { ...state, bankDetailsSubmitted: true }
        case PERSONAL_DATA_OF_WORKER:
          return { ...state, personalDataOfWorker: action.payload }

        case SIGNING_UP_USER:
          return { ...state, signingUpUser: true, signingUpSuccessful: false }

        case SIGNING_UP_SUCCESSFUL:
          return { ...state, signingUpUser: false, signingUpSuccessful: true }
    }

    return state;
}
