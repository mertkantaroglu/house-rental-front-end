import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './index.css';
import Input from '../../components/Input/Input';
import FormErrors from '../../ui/FormErrors';
import { addHouse } from '../../store/HouseSlice';

const AddHouse = () => {
  const formInfoState = {
    name: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    price: '',
    image: '',
    validations: {
      nameValid: null,
      priceValid: null,
      isValid: null,
      formErrors: {
        name: '',
        price: '',
      },
    },
  };
  const [formInfo, setFormInfo] = useState(formInfoState);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.authentication);
  const navigate = useNavigate();

  const validateField = (fieldName, fieldValue) => {
    const { formErrors } = formInfo.validations;
    let { nameValid, priceValid } = formInfo.validations;
    switch (fieldName) {
      case 'name':
        nameValid = fieldValue.length >= 3;
        formErrors.name = nameValid
          ? ''
          : ' should contain atleast 3 characters ';
        break;
      case 'price':
        priceValid = !Number.isNaN(fieldValue) && fieldValue > 0;
        formErrors.price = priceValid
          ? ''
          : ' should be a number greater than 0';
        break;
      default:
        break;
    }
    setFormInfo({
      ...formInfo,
      [fieldName]: fieldValue,
      validations: {
        formErrors,
        nameValid,
        priceValid,
        isValid: nameValid && priceValid,
      },
    });
  };
  const handleInput = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const newhouse = { ...formInfo, user_id: user.status.data.id };
    delete newhouse.validations;
    dispatch(addHouse(newhouse));
    navigate('/houses');
    setFormInfo(formInfoState);
  };

  const houseForm = () => (
    <>
      <h2>Add A house</h2>
      <FormErrors formErrors={formInfo.validations.formErrors} />
      <form onSubmit={handleSubmit}>
        <Input
          name="name"
          type="text"
          onInput={handleInput}
          value={formInfo.name}
          isValid={formInfo.validations.nameValid}
        />
        <Input
          name="location"
          type="text"
          onInput={handleInput}
          value={formInfo.location}
        />
        <Input
          name="bedrooms"
          type="text"
          onInput={handleInput}
          value={formInfo.bedrooms}
        />
        <Input
          name="bathrooms"
          type="number"
          onInput={handleInput}
          value={formInfo.bathrooms}
        />
        <Input
          name="price"
          type="number"
          onInput={handleInput}
          value={formInfo.price}
          isValid={formInfo.validations.priceValid}
        />
        <Input
          name="image"
          type="text"
          onInput={handleInput}
          value={formInfo.image}
        />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
  return (
    <section id="add_house">
      <div className="form__container">{houseForm()}</div>
    </section>
  );
};
export default AddHouse;
