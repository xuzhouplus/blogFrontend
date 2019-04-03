import * as Swal from "sweetalert2";

export const alertTypes = {warning: 'warning', error: 'error', success: 'success', info: 'info', question: 'question'};
export const modalAlert = (options, style = {}) => {
	const styleOptions = {
		buttonsStyling: false,
		customClass: {
			confirmButton: 'btn btn-dark'
		},
		confirmButtonColor: '#343a40'
	};
	style = Object.assign({}, styleOptions, style);
	return Swal.mixin(style).fire(options);
};