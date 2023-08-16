import { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p>Made by Doniyor &copy; 2023</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default memo(Footer);
