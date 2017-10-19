import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import mainReducer from './mainReducer';
import authReducer from './auth_reducer';
import jobseekerReducer from './jobseeker_reducer'
import creating_campaign_reducer from './creating_campaign_reducer';
import {i18nState} from "redux-i18n"


const rootReducer = combineReducers({
  form: formReducer,
  main: mainReducer,
  creating_campaign: creating_campaign_reducer,
  jobseeker: jobseekerReducer,
  auth: authReducer,
  i18nState,
});

export default rootReducer;
