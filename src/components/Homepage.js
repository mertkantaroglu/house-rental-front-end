import React, { useEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHouses } from "../store/HousesSlice";
import defaultHouse from "../assets/defaultHouse.jpg";
import "./Home.css";
import MediumIcon from "../assets/Medium";
import TwitterIcon from "../assets/Twitter";
import LinkedInIcon from "../assets/LinkedIn";

const dummyHouses = [
  {
    id: 1,
    name: "House 1",
    address: "123 Fake Street",
    bedrooms: 3,
    bathrooms: 2,
    price: "$1000000",
    image: defaultHouse,
  },
  {
    id: 2,
    name: "House 2",
    address: "456 Fake Street",
    bedrooms: 4,
    bathrooms: 3,
    price: "$2000000",
    image: defaultHouse,
  },
  {
    id: 3,
    name: "House 3",
    address: "789 Fake Street",
    bedrooms: 5,
    bathrooms: 4,
    price: "$3000000",
    image: defaultHouse,
  },
  {
    id: 1,
    name: "House 1",
    address: "123 Fake Street",
    bedrooms: 3,
    bathrooms: 2,
    price: "$1000000",
    image: defaultHouse,
  },
  {
    id: 2,
    name: "House 2",
    address: "456 Fake Street",
    bedrooms: 4,
    bathrooms: 3,
    price: "$2000000",
    image: defaultHouse,
  },
  {
    id: 3,
    name: "House 3",
    address: "789 Fake Street",
    bedrooms: 5,
    bathrooms: 4,
    price: "$3000000",
    image: defaultHouse,
  },
];

const Homepage = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.houses);
  console.log(data);

  useEffect(() => {
    dispatch(fetchHouses());
  }, [dispatch]);

  return (
    <div className="houses-container">
      <div className="heading">
        <h3>Our Houses</h3>
        <small>Select a house to see more details</small>
      </div>
      <section className="houses-list">
        {dummyHouses.map((house) => (
          <HouseCard house={house} />
        ))}
      </section>
      <HorizontalScroll />
    </div>
  );
};

export default Homepage;

const HouseCard = ({ house }) => {
  return (
    <>
      <div key={house.id} className="screen">
        <section className="house-image-container">
          <img src={house.image} alt={house.name} className="house-image" />
        </section>
        <h4 className="house-name">{house.name}</h4>
        <div className="divider" />
        <p>{house.address}</p>
        <section className="socials">
          <MediumIcon />
          <TwitterIcon />
          <LinkedInIcon />
        </section>
      </div>
    </>
  );
};

const HorizontalScroll = () => {
  const containerRef = useRef(null);

  const handleScroll = (scrollOffset) => {
    containerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="horizontal-screen-view">
      <div className="container" ref={containerRef}>
        {/* Place your screen components here */}
        <div className="screen screen1">Screen 1</div>
        <div className="screen screen2">Screen 2</div>
        <div className="screen screen3">Screen 3</div>
        {dummyHouses.map((house) => (
          <HouseCard house={house} />
        ))}
        {/* Add more screens as needed */}
      </div>
      <div className="scroll-buttons">
        <button onClick={() => handleScroll(-200)}>&lt; Prev</button>
        <button onClick={() => handleScroll(200)}>Next &gt;</button>
      </div>
    </div>
  );
};
