import React from "react";
import { Link } from "react-router-dom";
import "./ShopItem.css";

const ShopItem = (props) => {
  const customClass = `shop-item ${props.itemType}`;

  return (
      <div className="shop-item">
          <Link to="/preset-desc">
              <div className={customClass}>
                  <div className="shop-item-img">
                      <img
                          src="https://via.placeholder.com/400x300"
                          alt="shop-item-img"
                      />
                  </div>
                  <div className="shop-item-info">
                      <h3>Item Name</h3>
                      <p>Item Price</p>
                  </div>
              </div>
          </Link>
      </div>
  );
};

export default ShopItem;
