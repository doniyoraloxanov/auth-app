import { memo } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
    const currentYear = new Date().getFullYear();
    return (
        <footer>
            <Container>
                <Row>
                    <Col className="text-center py-3">
                        <p>Made by Doniyor &copy; {currentYear}</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default memo(Footer);
