import { combineReducers } from "redux";
import { SwitchCredentialsReducer } from "../../reducers/SwitchComponent/switchCompoent.Reducer";
import { sidebarToggle } from "../../reducers/sidebar/sidebar.Reducer";
import { SocialMediaOption } from "../../reducers/socialMediaOption/socialMediaOption";

const rootReducer = combineReducers({
  SwitchCredentialsReducerState: SwitchCredentialsReducer,
  sidebarToggleState: sidebarToggle,
  SocialMediaOptionState:SocialMediaOption
});

export default rootReducer;
