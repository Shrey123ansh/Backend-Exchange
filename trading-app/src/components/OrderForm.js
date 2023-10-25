import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const OrderForm = (props) => {
  return (
    <>
      <Form>
        <h3>Order Form</h3>
        <Form.Group>
          <Form.Label column lg={2}>
            Select an asset
          </Form.Label>
          <Form.Control
            name="asset"
            as="select"
            aria-label="asset"
            onChange={props.onSelectionChange}
            value={props.offer.asset}
          >
            <option value="BTC">BTC</option>
            <option value="ETH">ETH</option>
            <option value="LTC">LTC</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label column lg={2}>
            Limit Price:{" "}
          </Form.Label>
          <Form.Control
            name="price"
            type="text"
            placeholder="Enter a limit price"
            onChange={props.onTextChange}
            value={props.offer.price}
            isInvalid={!!props.error.price}
          />
          <Form.Control.Feedback type="invalid">
            {props.error.price}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group>
          <Form.Label column lg={2}>
            Amount:{" "}
          </Form.Label>
          <Form.Control
            name="quantity"
            type="text"
            placeholder="Enter an order amount"
            onChange={props.onTextChange}
            value={props.offer.quantity}
            isInvalid={!!props.error.quantity}
          />
          <Form.Control.Feedback type="invalid">
            {props.error.quantity}
          </Form.Control.Feedback>
        </Form.Group>
        <p></p>
        <Button variant="success" onClick={props.onBuyOffer}>
          Buy
        </Button>{" "}
        <Button variant="danger" onClick={props.onSellOffer}>
          Sell
        </Button>
      </Form>
    </>
  );
};

export default OrderForm;
