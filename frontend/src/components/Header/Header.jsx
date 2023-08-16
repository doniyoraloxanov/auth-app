import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { logout } from "../../slices/authSlice";

const Header = () => {
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logoutMutation] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutMutation();
            dispatch(logout());
            navigate("/login");
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <header>
            <Navbar bg="success" variant="dark" expand="md" collapseOnSelect>
                <Container>
                    <LinkContainer to="/">
                        <Navbar.Brand className="navbar-brand">
                            Task4
                        </Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle id="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ms-auto">
                            {userInfo ? (
                                <NavDropdown
                                    title={userInfo.name}
                                    id="username"
                                    className="navbar-brand"
                                >
                                    <LinkContainer to="/profile">
                                        <NavDropdown.Item>
                                            Profile
                                        </NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to="/login">
                                    <Nav.Link href="/login">
                                        <FaUser className="navbar-brand" /> Sign
                                        in
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
};

export default Header;
