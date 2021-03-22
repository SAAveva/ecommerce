import React, { useState } from 'react';
import BuyButtonImage from './buy-button.jpg';

const Buy = () => {

    return <div className="buy" style={{textAlign: 'center'}}>
        <img src={BuyButtonImage} alt="buy button" />
    </div>
}

export { Buy };