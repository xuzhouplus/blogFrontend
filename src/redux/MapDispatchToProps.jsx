import {bindActionCreators} from "redux";
import {setUser, unsetUser} from "./Action";

export const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		setUser: setUser,
		unsetUser: unsetUser
	}, dispatch);
};
