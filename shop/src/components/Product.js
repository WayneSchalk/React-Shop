import React from "react";
import { Card } from "react-bootstrap";
import Rating from "./Ratings";

import { Link } from "react-router-dom";

const Product = ({ product }) => {
  return (
    <Card className="my-3 rounded">
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" fluid="true" />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
          <Card.Text as="div">
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </Card.Text>
          <Card.Text as="h3" className="mt-3">
            R {product.price}
          </Card.Text>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default Product;
