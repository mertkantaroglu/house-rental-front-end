import React, { forwardRef } from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { RiCloseCircleFill } from 'react-icons/ri';

const CustomSnackbar = (props, ref) => {
  const { message } = props;
  const { closeSnackbar } = useSnackbar();

  return (
    <div ref={ref} className="text-[0.875rem] py-1 px-3 flex bg-[#D23131] text-white shadow-md rounded overflow-hidden">
      <button type="button" onClick={() => closeSnackbar()}>
        <RiCloseCircleFill size={24} />
      </button>
      <p className="p-2 leading-5">{message}</p>
    </div>
  );
};

CustomSnackbar.propTypes = {
  message: PropTypes.string.isRequired,
};

const Snackbar = forwardRef(CustomSnackbar);

export default Snackbar;
