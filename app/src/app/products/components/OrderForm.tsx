'use client';
import React, {useState} from 'react';
import '../styles/forms.css';


const OrderForm = () => {
  const [amount, setAmount] = useState(0);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setAmount(parseInt(e.target.value, 10));
  };

  const handleAmountIncrease = () => {
      setAmount((prev) => prev + 1000.0);
  };

  const handleAmountDecrease = () => {
      if (amount >= 1000.0) {
          setAmount((prev) => prev - 1000.0);
      }
  };

  const addOrder = () => {
      // Add logic to add order
  };

  return (
      <div className="login-container">
          <h2>Order Now!</h2>
          <form>
              <div>
                  <button className={'change-amount-btn'} onClick={handleAmountDecrease}>
                      -
                  </button>
                  <input
                      type="amount"
                      id="amount"
                      value={amount}
                      onChange={handleAmountChange}
                      required
                  />
                  <label>gr</label>
                  <button className={'change-amount-btn'} onClick={handleAmountIncrease}>
                      +
                  </button>
              </div>
              <button type="button" onClick={addOrder}>
                  add to shopping basket
              </button>
          </form>
      </div>
  );
};

export default OrderForm;
