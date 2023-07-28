import React from 'react';
import './MasterclassHP.css';

const MasterclassHP = () => {
    return (
      <div className="masterclass-hp">
        <h2>Creative Masterclass</h2>
        <div className="img-grid">
          <div className="left-img-large img-container">
            <img
              src="https://source.unsplash.com/random/?masterclass,portrait"
              alt="Masterclass"
            />
          </div>
          {/* <div className="right-imgs-small"> */}
          <div className="right-img-small img-container">
            <img src="https://source.unsplash.com/random/?masterclass,landscape,wide" alt="Masterclass" />
          </div>
          <div className="right-img-small img-container">
            <img src="https://source.unsplash.com/random/?masterclass,landscape" alt="Masterclass" />
          </div>
          <div className="right-img-small img-container">
            <img src="https://source.unsplash.com/random/?masterclass,landscape" alt="Masterclass" />
          </div>
          {/* </div> */}
        </div>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button>Learn More</button>
      </div>
    );
}

export default MasterclassHP;