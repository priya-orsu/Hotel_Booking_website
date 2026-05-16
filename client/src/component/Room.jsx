import { useState } from 'react';
import { Link } from 'react-router-dom';
import {FaEye, FaCalendarCheck, FaPhone, FaMoneyBillWave, FaDoorOpen, FaUsers, FaTimes} from 'react-icons/fa';

const Room = ({ room }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleClose = () => setShowDetails(false);
  const handleShow = () => setShowDetails(true);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === room.imageurls.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? room.imageurls.length - 1 : prevIndex - 1
    );
  };

  return (
    <>
      <div className="room-card">
        <div className="room-card-content">
          <div className="room-image-container">
            <img
              src={room.imageurls[0]}
              className="room-image"
              alt={room.name}
            />
          </div>
          

          <div className="room-details">
            <div className="room-details-content">
              <h2 className="room-title">{room.name}</h2>
              
              <div className="room-meta">
                <div className="room-badges">
                  <span className="badge badge-type">{room.type}</span>
                  <span className="badge badge-guests">Max {room.maxcount} guests</span>
                </div>
                
                <div className="room-info-grid">
                  <div className="room-info-item">
                    <FaPhone className="icon" />
                    {room.phonenumber}
                  </div>
                  <div className="room-info-item">
                    <FaMoneyBillWave className="icon" />
                    ₹{room.rentperday}/night
                  </div>
                </div>
              </div>
              
              <div className="room-actions">
                <button 
                  onClick={handleShow}
                  className="btn btn-outline"
                >
                  <FaEye className="icon" /> View Details
                </button>
                
                <Link 
                  to={`/book/${room._id}`} 
                  className="btn btn-primary"
                >
                  <FaCalendarCheck className="icon" /> Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showDetails && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h3 className="modal-title">{room.name}</h3>
              <button className="close-button" onClick={handleClose}>
                <FaTimes />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="image-carousel">
                <button className="carousel-button prev" onClick={prevImage}>&lt;</button>
                <img
                  className="carousel-image"
                  src={room.imageurls[currentImageIndex]}
                  alt={`${room.name} - ${currentImageIndex + 1}`}
                />
                <button className="carousel-button next" onClick={nextImage}>&gt;</button>
                <div className="carousel-indicator">
                  {currentImageIndex + 1} / {room.imageurls.length}
                </div>
              </div>
              
              <div className="room-description">
                <h4>Description</h4>
                <p>{room.description || 'No description available.'}</p>
              </div>
              
              <div className="room-features">
                <div className="feature-column">
                  <div className="feature-item">
                    <FaDoorOpen className="feature-icon" />
                    <span>Type: {room.type}</span>
                  </div>
                  <div className="feature-item">
                    <FaPhone className="feature-icon" />
                    <span>{room.phonenumber}</span>
                  </div>
                </div>
                <div className="feature-column">
                  <div className="feature-item">
                    <FaUsers className="feature-icon" />
                    <span>Max {room.maxcount} guests</span>
                  </div>
                  <div className="feature-item">
                    <FaMoneyBillWave className="feature-icon" />
                    <span>₹{room.rentperday} per night</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-outline" 
                onClick={handleClose}
              >
                Close
              </button>
              <Link 
                to={`/book/${room._id}`} 
                className="btn btn-primary"
                onClick={handleClose}
              >
                Proceed to Booking
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CSS Styles */}
      <style jsx="true">{`
        /* Room Card Styles */
        .room-card {
          margin: 2.5rem;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          background: white;
        }
        
        .room-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }
        
        .room-card-content {
          display: flex;
          flex-direction: column;
        }
        
        @media (min-width: 768px) {
          .room-card-content {
            flex-direction: row;
          }
        }
        
        .room-image-container {
          width: 100%;
        }
        
        @media (min-width: 768px) {
          .room-image-container {
            width: 40%;
          }
        }
        
        .room-image {
          width: 100%;
          height: 250px;
          object-fit: cover;
          display: block;
        }
        
        .room-details {
          width: 100%;
          padding: 1rem;
        }
        
        @media (min-width: 768px) {
          .room-details {
            width: 60%;
            padding: 1.5rem;
          }
        }
        
        .room-title {
          font-size: 2rem;
          margin-bottom: 0.75rem;
          color: #333;
        }
        
        .room-badges {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.7rem;
          font-weight: 500;
        }
        
        .badge-type {
          background-color: #ff000052;
          color: red;
        }
        
        .badge-guests {
          background-color: #e8f5e9;
          color: #388e3c;
        }
        
        .room-info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
          gap: 0.5rem;
          margin-bottom: 1rem;
        }
        
        .room-info-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-size: 0.9rem;
          color: #555;
        }
        
        .icon {
          color: red;
        }
        
        .room-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: auto;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          text-decoration: none;
          transition: all 0.2s ease;
          flex: 1;
          justify-content: center;
        }
        
        .btn-outline {
          border: 1px solid red;
          color: red;
          background: white;
          font-size: 1rem
        }
        
        .btn-outline:hover {
          background: #ff000052;
        }
        
        .btn-primary {
          background: #ff0000a2;
          color: white;
          border: 1px solid red;
          font-size: 1rem
        }
        
        .btn-primary:hover {
          background: #ff000088;
        }
        
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          padding: 1rem;
        }
        
        .modal-container {
          background: white;
          border-radius: 8px;
          width: 100%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
        }
        
        .modal-header {
          padding: 1.5rem;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-title {
          margin: 0;
          font-size: 1.5rem;
          color: #333;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: 1.25rem;
          cursor: pointer;
          color: #666;
          padding: 0.25rem;
        }
        
        .close-button:hover {
          color: #333;
        }
        
        .modal-body {
          padding: 1.5rem;
          flex: 1;
        }
        
        /* Image Carousel */
        .image-carousel {
          position: relative;
          margin-bottom: 1.5rem;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .carousel-image {
          width: 100%;
          height: 350px;
          object-fit: cover;
          display: block;
        }
        
        .carousel-button {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          font-size: 1.25rem;
        }
        
        .carousel-button:hover {
          background: rgba(0, 0, 0, 0.7);
        }
        
        .prev {
          left: 1rem;
        }
        
        .next {
          right: 1rem;
        }
        
        .carousel-indicator {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          background: rgba(0, 0, 0, 0.5);
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.85rem;
        }
        
        /* Room Description */
        .room-description {
          margin-bottom: 1.5rem;
        }
        
        .room-description h4 {
          margin-bottom: 0.75rem;
          color: #333;
        }
        
        .room-description p {
          color: #666;
          line-height: 1.6;
        }
        
        /* Room Features */
        .room-features {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .feature-column {
          flex: 1;
          min-width: 200px;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: #555;
        }
        
        .feature-icon {
          color: red;
          font-size: 1.1rem;
        }
        
        /* Modal Footer */
        .modal-footer {
          padding: 1.5rem;
          border-top: 1px solid #eee;
          display: flex;
          justify-content: flex-end;
          gap: 0.75rem;
        }
      `}</style>
    </>
  );
};

export default Room;