import React from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import { RiCloseCircleFill } from 'react-icons/ri';

const CustomSnackbar = ({ message }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <div className="text-[0.875rem] py-1 px-3 flex bg-[#D23131] text-white shadow-md rounded overflow-hidden">
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

const Snackbar = ({ message }) => (
  <CustomSnackbar message={message} />
);

Snackbar.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Snackbar;
