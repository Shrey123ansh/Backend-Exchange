import React, { useState } from "react";
import OrderBook from "./components/OrderBook";
import OrderForm from "./components/OrderForm";
import "bootstrap/dist/css/bootstrap.css";

export default function App() {
  const [id, setId] = useState(0);
  const [error, setError] = useState({});
  const [buyOrders, setBuyOrders] = useState([]);
  const [sellOrders, setSellOrders] = useState([]);
  const [offer, setOffer] = useState({
    id: 0,
    asset: "BTC",
    price: 0,
    quantity: 0,
    timestamp: 0
  });

  function handleTextChange({ target }) {
    // { target } is destructing of the event
    const updatedOffer = {
      ...offer,
      [target.name]: target.value
    };
    setOffer(updatedOffer);
  }

  function handleSelectionChange(event) {
    // event is an author object
    const updatedOffer = {
      ...offer,
      asset: event.target.value
    };
    setOffer(updatedOffer);
  }

  function handleBuyOffer(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    const currentId = id;
    const currentTime = Date.now();
    const updatedBuyOffer = {
      ...offer,
      id: currentId,
      timestamp: currentTime
    };
    const updatedBuyOrders = [...buyOrders, updatedBuyOffer];
    setBuyOrders(updatedBuyOrders);
    setId(id + 1);
  }

  function handleSellOffer(event) {
    event.preventDefault();
    if (!isFormValid()) return;
    const currentId = id;
    const currentTime = Date.now();
    const updatedSellOffer = {
      ...offer,
      id: currentId,
      timestamp: currentTime
    };
    const updatedSellOrders = [...sellOrders, updatedSellOffer];
    setSellOrders(updatedSellOrders);
    setId(id + 1);
  }

  function isFormValid() {
    const _error = {};
    if (offer.asset === "") _error.price = "Asset cannot be empty!";
    if (offer.price <= 0)
      _error.price = "Limit Price cannot be less than zero!";
    if (offer.quantity <= 0)
      _error.quantity = "Order Amount cannot be less than zero!";
    setError(_error);
    return Object.keys(_error).length === 0; // form is valid if the errors object has not properties
  }

  return (
    <div className="App">
      <h1>React Trading App</h1>
      <OrderForm
        offer={offer}
        error={error}
        onBuyOffer={handleBuyOffer}
        onSellOffer={handleSellOffer}
        onTextChange={handleTextChange}
        onSelectionChange={handleSelectionChange}
      />
      <OrderBook id="buyOrderBook" title="Buy Order" orders={buyOrders} />
      <OrderBook id="sellOrderBook" title="Sell Order" orders={sellOrders} />
    </div>
  );
}
