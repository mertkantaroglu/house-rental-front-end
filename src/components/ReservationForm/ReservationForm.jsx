import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MdLocationPin } from 'react-icons/md';
import { BsFillCalendarDateFill } from 'react-icons/bs';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { enqueueSnackbar } from 'notistack';
import Field from '../../ui/Field';
import cn from '../../utils/classnames';
import useOnClickOutside from '../../hooks/useOutSideClick';
import addMonths from '../../utils/utils';
import { addReservation } from '../../store/ReservationsSlice';
import { fetchHouses } from '../../store/HousesSlice';

const ReservationForm = () => {
  const [form, setForm] = useState({
    house_id: '',
    city: '',
    starting_date: null,
    ending_date: null,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  const { list } = useSelector((state) => state.house);


  const today = new Date();

  const [isPickUpCalendarOpen, setIsPickUpCalendarOpen] = useState(false);
  const [isReturnCalendarOpen, setIsReturnCalendarOpen] = useState(false);

  const pickUpCalendarRef = useRef(null);
  const returnCalendarRef = useRef(null);
  const formRef = useRef(null);

  const handleFormSubmit = (ev) => {
    ev.preventDefault();

    if (form.city.trim().length === 0) {
      enqueueSnackbar('Please enter a city', {
        variant: 'errorMessage',
        TransitionProps: { direction: 'down' },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      return;
    }

    if (!form.starting_date) {
      enqueueSnackbar('Please select a pick up date', {
        variant: 'errorMessage',
        TransitionProps: { direction: 'down' },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      return;
    }

    if (!form.ending_date) {
      enqueueSnackbar('Please select a return date', {
        variant: 'errorMessage',
        TransitionProps: { direction: 'down' },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      return;
    }

    if (form.ending_date < form.starting_date) {
      enqueueSnackbar('Return date must come after the pick date', {
        variant: 'errorMessage',
        TransitionProps: { direction: 'down' },
        anchorOrigin: { vertical: 'top', horizontal: 'right' },
      });
      // Uncomment this line after adding redux action to prevent form submission
      return;
    }

    // Put the redux action to send the form here
    // dispatch(submitReservation(form));
    dispatch(addReservation(form));

  };

  const setSelectedDay = (day, key) => setForm({
    ...form,
    [key]: day,
  });

  const handleInput = (ev) => setForm({
    ...form,
    [ev.target.name]: ev.target.value,
  });

  useOnClickOutside(pickUpCalendarRef, () => setIsPickUpCalendarOpen(false));
  useOnClickOutside(returnCalendarRef, () => setIsReturnCalendarOpen(false));

  useEffect(() => {
    if (window.innerWidth < 1024 && isReturnCalendarOpen) {
      formRef.current.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: returnCalendarRef.current.offsetTop + 130,
      });
    }
    if (window.innerWidth < 1024 && isPickUpCalendarOpen) {
      formRef.current.scrollTo({
        behavior: 'smooth',
        left: 0,
        top: pickUpCalendarRef.current.offsetTop,
      });
    }
  }, [isPickUpCalendarOpen, isReturnCalendarOpen]);

  return (
    <form ref={formRef} onSubmit={handleFormSubmit} className="h-[620px] overflow-x-hidden overflow-y-scroll md:overflow-visible md:h-fit rounded-lg p-3 shadow-lg flex md:flex-row justify-between border border-gray-100 flex-col md:max-w-[90%] w-full max-w-[400px] bg-gray-100 md:bg-[#ffffff5e]">
      <label htmlFor="house" className="py-4 px-2 flex flex-col gap-4 relative md:w-[20%] w-full">
        <span className="text-xl font-semibold text-gray-600">Select a house</span>
        <select onChange={handleInput} name="house_id" id="house_id" className="w-full p-3 bg-white text-gray-800 border border-gray-200 rounded-md text-sm font-semibold focus-within:outline-none focus:ring-green-500 focus:border-green-500">
          <option selected="selected" disabled value="">Select a house</option>
          { list && list.map((house) => (<option key={house.id} value={house.id}>{house.name}</option>)) }
        </select>
      </label>
      <Field
        className="md:w-[20%] px-2 w-full"
        type="text"
        placeholder="Enter your city"
        label="City"
        id="city"
        name="city"
        icon={<MdLocationPin size={24} fill="#798497" />}
        onChange={handleInput}
        value={form.city}
      />
      <Field
        className="md:w-[20%] px-2 w-full"
        type="text"
        placeholder="11/12/2021"
        label="Pick up date"
        id="starting-date"
        name="starting_date"
        icon={<BsFillCalendarDateFill size={22} fill="#798497" />}
        value={form.starting_date?.toLocaleDateString() || ''}
        onClick={() => setIsPickUpCalendarOpen(true)}
        readOnly
      >
        <div ref={pickUpCalendarRef} className={cn(`${isPickUpCalendarOpen ? 'block' : 'hidden'}`)}>
          <DayPicker
            showOutsideDays
            fromDate={today}
            toDate={addMonths(today, 1)}
            selected={form.starting_date}
            fixedWeeks
            onDayClick={(day) => {
              setSelectedDay(day, 'starting_date');
              setIsPickUpCalendarOpen(false);

              if (form.ending_date && form.ending_date < day) {
                setForm((prevForm) => ({ ...prevForm, ending_date: null }));
              }
            }}
          />
        </div>
      </Field>
      <Field
        className="md:w-[20%] px-2 w-full"
        readOnly
        type="text"
        placeholder="01/07/2022"
        label="Return date"
        id="ending-date"
        name="ending_date"
        icon={<BsFillCalendarDateFill size={22} fill="#798497" />}
        value={form.ending_date?.toLocaleDateString() || ''}
        onClick={() => setIsReturnCalendarOpen(true)}
      >
        <div ref={returnCalendarRef} className={cn(`${isReturnCalendarOpen ? 'block' : 'hidden'}`)}>
          <DayPicker
            showOutsideDays
            fromDate={form.starting_date ?? today}
            toDate={addMonths(form.starting_date, 1) ?? today}
            selected={form.ending_date}
            fixedWeeks
            onDayClick={(day) => {
              setSelectedDay(day, 'ending_date');
              setIsReturnCalendarOpen(false);
            }}
          />
        </div>
      </Field>
      <div className="py-4 px-2 flex flex-col justify-end relative md:w-[14%] w-[200px] max-w-[60%] md:mx-0 mx-auto">
        <button type="submit" className="p-3 bg-green-500 text-white rounded-md font-semibold">SUBMIT</button>
      </div>
    </form>
  );
};

export default ReservationForm;
