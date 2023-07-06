import { FaPlus, FaTrash } from 'react-icons/fa';
import PropTypes from 'prop-types';
import React from 'react';

const Images = ({
  form, onAdd, onChange, onDelete,
}) => (
  <>
    <h2 id="images">
      Images:
      <button id="addimage" type="button" onClick={() => onAdd()}>
        <FaPlus />
      </button>
    </h2>
    {
    form.images.map((data, i) => (
      <div className="image__input" key={`image ${i + 1} `}>
        <input type="text" onChange={(e) => onChange(e, i)} value={data} placeholder={`image_url_${i + 1}`} />
        <button type="button" onClick={() => onDelete(i)}>
          <FaTrash />
        </button>
      </div>
    ))
  }
  </>
);

Images.propTypes = {
  form: PropTypes.shape({
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onAdd: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Images;
