import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  Col,
  Image,
  ListGroup,
  Button,
  Row,
  Form,
} from "react-bootstrap";
import Ratings from "../components/Ratings";
import { listProductDetails, createProductReview } from "../actions/productActions";
import Meta from "../components/Meta"
import Loader from "../components/Loader";
import Message from "../components/Message";

const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);
  const [rating, setRating]=useState(0)
  const [comment, setComment]=useState("")

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;


  const productReview = useSelector((state) => state.productReview);
  const { error: errorReview, success: successReview } = productReview;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if(successReview){
      alert("Review Submitted")
      setRating(0)
      setComment(" ")
      dispatch({type: "product_create_review_reset"})
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview]);

  const addToChartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`);
  };
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, {rating, comment} ))
  }
  return (
    <>
    
      <Link className="btn btn-dark my-3 " to="/">
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
        <Meta title={product.name}/>
        <Row>
          <Col md={5}>
            <Image fluid src={product.image} alt={product.name} />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: R{product.price} </ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card >
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price :</Col>
                    <Col>
                      <strong> R{product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status :</Col>
                    <Col>
                      {product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => {
                            setQty(e.target.value);
                          }}
                        >
                          {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x + 1} value={x + 1}>
                              {x + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    onClick={addToChartHandler}
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                  >
                    Add To Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={5}>
          <h2>Review</h2>
          {product.reviews.length === 0 && <Message>No Reviews</Message> }
          
            <ListGroup variant="flush">
              {product.reviews.map(review => (
                <ListGroup.Item key={review._id}>
                  <strong>{review.name}</strong>
                  <Ratings value={review.rating}/>
                  <p>
                    {review.createdAt.substring(0 , 10)}
                  </p>
                  <p>{review.comment}</p>
                </ListGroup.Item>
              ))}
              <ListGroup.Item>
                <h2>Write a review</h2>
                {errorReview && <Message variant="danger">{errorReview}</Message>}
                {userInfo ? ( <Form onSubmit={submitHandler}>
                  <Form.Group controlId="rating">
                    <Form.Label>Rating</Form.Label>
                    <Form.Control as="select" value={rating} onChange={e => setRating(e.target.value)}>
                    <option value="">Select...</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very good</option>
                    <option value="5">5 - Excellent</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label>Comment</Form.Label>
                    <Form.Control as='textarea' row="3" value={comment} onChange={e => setComment(e.target.value)}></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary">Submit</Button>
                  </Form>
                  ) : <Message><Link to="/login">Login</Link> to write a review</Message>}
              </ListGroup.Item>
            </ListGroup>
          
          </Col>
        </Row>
        </>
      )}
    </>
  );
};

export default ProductScreen;
