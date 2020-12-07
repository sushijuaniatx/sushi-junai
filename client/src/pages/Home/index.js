import React from "react";
import { Link } from "react-router-dom";
import Card from "../../components/Card/index";
import Container from "../../components/Container";
import { Col } from "reactstrap";
import Row from "../../components/Row";
import Button from "../../components/Button";
import data from "../../db/store.json";
import { useStoreContext } from '../../utils/GlobalStore';
import HomeCarousel from "../../components/HomeCarousel";
import './style.css'

function Home(props) {
    const [state] = useStoreContext();

    return (
        <React.Fragment>
            <Container>
                <Row>
                    {
                        data.map((data, idx) => {
                            return (
                                <Card key={idx} location={data.location} phone={data.phone} address={data.address}
                                    mon={data.mon} tue={data.tue} wed={data.tue} thu={data.thu} fri={data.fri} sat={data.sat} sun={data.sun}>
                                </Card>

                            )
                        })
                    }
                </Row>
                <Row>
                        <Col sm="12" md={{ size: 6}} lg={{ size: 6}} style={{padding: "30px"}}>
                            <HomeCarousel />
                        </Col>
                </Row>
                <Row >
                    <a href={"https://www.yelp.com/biz/sushi-junai-austin"}>
                        <Button type={"button"} btn={"btn btn1"}>Reservations</Button>
                    </a>
                    <Link to={!state.userLoggedIn ? "/signinsignup": "/choice"}>
                        <Button type={"button"} btn={"btn btn1"}>Dine In</Button>
                    </Link>    
                    <a href={"https://www.yelp.com/order/v2/cart/954de1b27f3ee7705f2ca2d2c8336670"}>
                            <Button type={"button"} btn={"btn btn1"}>Carry Out</Button>
                            </a>
                </Row>
            </Container>
    </React.Fragment>);
}

export default Home;