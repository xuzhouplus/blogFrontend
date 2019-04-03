//映射Redux state到组件的属性
export function mapStateToProps(state) {
	return {user: state.user}
}
