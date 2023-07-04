import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchHouse } from '../store/HouseSlice';
import './House.css';

const HousePage = () => {
  const dispatch = useDispatch();
  const house = useSelector((state) => state.house.house);
  console.log(house);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchHouse(id));
  }, [dispatch, id]);
  return (
    <>
      <h3 className="page-title">House Details</h3>
      <div className="house-cont">
        <div className="img-container">
          <img src={house.image} alt={house.name} />
        </div>
        <div className="info-container">
          <h3>{house.name}</h3>
          <table className="table">
            <tbody>
              <tr>
                <td>
                  <div>
                    <span className="fw-bold">Location:</span>
                    <span>{house.location}</span>
                  </div>
                </td>
              </tr>
              <tr className="white-row">
                <td>
                  <div>
                    <span className="fw-bold">Bedrooms:</span>
                    <span>{house.bedrooms}</span>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div>
                    <span className="fw-bold">Bathrooms:</span>
                    <span>{house.bathrooms}</span>
                  </div>
                </td>
              </tr>
              <tr className="white-row">
                <td>
                  <div>
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
          <div className="reserve-btn-cont">
            <Link
              to={`/reservations/new/${house.id}`}
              className="reserve-btn"
            >
              RESERVE HOUSE
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default HousePage;
