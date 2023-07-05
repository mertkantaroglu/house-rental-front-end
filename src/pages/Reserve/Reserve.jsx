import { SnackbarProvider } from 'notistack';
import React from 'react';
import ReservationForm from '../../components/ReservationForm/ReservationForm';
import Snackbar from '../../ui/SnackBar';
import './Reserve.css';

const Reserve = () => (
  <div className="reservation background flex justify-center py-[4rem] md:pt-[8rem] h-full">
    <SnackbarProvider Components={{ errorMessage: Snackbar }} autoHideDuration={2500}>
      <ReservationForm />
    </SnackbarProvider>
  </div>
);

export default Reserve;
