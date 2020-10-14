import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";

import { getOrders } from "../actions/orderActions";

import Loader from "../components/Loader";

//product_create_reset

const OrderListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(getOrders());
    }
  }, [
    //dependancies
    dispatch,
    history,
    userInfo,
  ]);

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Orders List</h1>
        </Col>
        <Col className="text-right"></Col>
      </Row>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ORDER ID</th>
              <th>NAME</th>
              <th>PLACED AT</th>
              <th>TOTAL PRICE</th>
              <th>PAID AT</th>
              <th>DELIVERD</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>R{order.totalPrice}</td>
                <td>
                  {order.isPayed ? (
                    <>
                      <p className="m-0">{order.payedAt.substring(0, 10)}</p>
                      <small className="m-0">{order.paymentMethod}</small>
                    </>
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  {orders.isDeliverd ? (
                    orders.deliverdAt.substring(0, 10)
                  ) : (
                    <i className="fas fa-times" style={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/orders/${order._id}`}>
                    <Button className="btn-sm" variant="light">
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
