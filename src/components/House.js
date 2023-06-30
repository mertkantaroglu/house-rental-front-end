import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchHouse } from '../store/HouseSlice';
import './House.css';
// import 'bootstrap/dist/css/bootstrap.css';

const HousePage = () => {
  const dispatch = useDispatch();
  const house = useSelector((state) => state.house.house);

  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchHouse(id));
  }, [dispatch, id]);

  return (
    <section className="container">
      <div className="house-container">
        <div className="img-container">
          <img src={house.image} alt={house.name} />
        </div>
        <div className="info-container">
          <h1>{house.name}</h1>
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
              <tr>
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
              <tr>
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
          <div>
            <Link
              to={`/reservations/new/${house.id}`}
            >
              <button type="button" className="reserve-btn" style={{ backgroundColor: '#CCFF00' }}>RESERVE HOUSE</button>
            </Link>
          </div>
        </div>
      </div>
    </section>

  );
};

export default HousePage;
