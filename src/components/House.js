import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchHouse } from '../store/HouseSlice';
import './House.css';
import 'bootstrap/dist/css/bootstrap.css';

const HousePage = () => {
  const dispatch = useDispatch();
  const house = useSelector((state) => state.house.house);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchHouse(id));
  }, [dispatch, id]);

  return (
    <section className="container">
      <div className="house-container d-flex flex-md-row flex-column">
        <div className="img-container d-flex justify-content-center align-items-center m-auto">
          <img src={house.image} alt={house.name} className="img-fluid rounded mx-auto d-block" />
        </div>
        <div className="info-container">
          <h1 className="d-flex justify-content-end pe-1">{house.name}</h1>
          <table className="table table-striped">
            <tbody>
              <tr>
                <td>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Location:</span>
                    <span>{house.location}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Bedrooms:</span>
                    <span>{house.bedrooms}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Bathrooms:</span>
                    <span>{house.bathrooms}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className="d-flex justify-content-between">
                    <span className="fw-bold">Price:</span>
                    <span>
                      $
                      {house.price}
                    </span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div>
            <Link
              to={`/reservations/new/${house.id}`}
              className="res-link text-decoration-none d-flex justify-content-end"
            >
              <button type="button" className="reserve-btn btn text-white fw-bold" style={{ backgroundColor: '#CCFF00' }}>RESERVE HOUSE</button>
            </Link>
          </div>
        </div>
      </div>
    </section>

  );
};

export default HousePage;
