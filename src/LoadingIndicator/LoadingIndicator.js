import React from 'react';
import './LoadingIndicator.css';

const LoadingIndicator = () => (
  <svg className="loadingindicator__wrapper" width="360" height="360" viewBox="0 0 360 360" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(0)">
      <rect id="background" x="0" y="0" />
      <rect className="square" id="rect-11" x="8" y="8" />
      <rect className="square" id="rect-12" x="96" y="8" />
      <rect className="square" id="rect-13" x="184" y="8" />
      <rect className="square" id="rect-14" x="272" y="8" />
      <rect className="square" id="rect-21" x="8" y="96" />
      <rect className="square" id="rect-22" x="96" y="96" />
      <rect className="square square__inverse" id="rect-23" x="184" y="96" />
      <rect className="square" id="rect-24" x="272" y="96" />
      <rect className="square" id="rect-31" x="8" y="184" />
      <rect className="square square__inverse" id="rect-32" x="96" y="184" />
      <rect className="square" id="rect-33" x="184" y="184" />
      <rect className="square" id="rect-34" x="272" y="184" />
      <rect className="square" id="rect-41" x="8" y="272" />
      <rect className="square" id="rect-42" x="96" y="272" />
      <rect className="square square__inverse" id="rect-43" x="184" y="272" />
      <rect className="square" id="rect-44" x="272" y="272" />
    </g>
  </svg>
);

export default LoadingIndicator;
