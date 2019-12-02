import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content';

const SwalWithReactContent=withReactContent(Swal);

export const modalPage = (options, style = {}) => {
    const styleOptions = {
        buttonsStyling: false,
        customClass: {
            confirmButton: 'btn btn-dark'
        },
        confirmButtonColor: '#343a40'
    };
    style = Object.assign({}, styleOptions, style);
    return SwalWithReactContent.mixin(style).fire(options);
};