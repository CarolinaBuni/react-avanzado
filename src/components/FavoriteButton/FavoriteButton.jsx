// FavoriteButton.jsx
import React from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const FavoriteButton = ({ isFavorited, onToggle }) => (
  <button onClick={onToggle} className="favorite-button">
    {isFavorited ? <FaHeart color="#ff4886" /> : <FaRegHeart />}
  </button>
);

export default FavoriteButton;
