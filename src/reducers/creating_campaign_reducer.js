import { 
  NESTED_JOB_SECTORS,
  COMPANIES,
} from '../actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case NESTED_JOB_SECTORS:
      return { ...state, nestedJobSectors: action.payload }
    case COMPANIES:
      return { ...state, companies: action.payload }
    default:
      return state;
  }
}
