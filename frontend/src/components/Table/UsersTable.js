import dateFormat from "dateformat";
import { useState } from "react";
import { Table } from "react-bootstrap";
import Message from "../Message";
import Loader from "../Loader";

import Form from "react-bootstrap/Form";
import { useGetUsersQuery } from "../../slices/usersApiSlice";

import { tableHeadings } from "./constants";
import ButtonToolbar from "./ButtonToolbar";

const UsersTable = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [checkedUsers, setCheckedUsers] = useState([]);

    const handleCheck = (id) => {
        if (checkedUsers.includes(id)) {
            setCheckedUsers(checkedUsers.filter((user) => user !== id));
        } else {
            setCheckedUsers([...checkedUsers, id]);
        }
    };

    return (
        <>
            <ButtonToolbar checkedUsers={checkedUsers} refetch={refetch} />

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant="danger">
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>
                                <Form.Check aria-label="option 1" />
                            </th>
                            {tableHeadings.map((heading) => (
                                <th key={heading.id}>{heading.headingName}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>
                                    <Form>
                                        {["checkbox"].map((type) => (
                                            <div
                                                key={`default-${type}`}
                                                className="mb-3"
                                            >
                                                <Form.Check // prettier-ignore
                                                    type="checkbox"
                                                    id="checkbox"
                                                    onChange={() =>
                                                        handleCheck(user._id)
                                                    }
                                                />
                                            </div>
                                        ))}
                                    </Form>
                                </td>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>
                                    <a href={`mailto:${user.email}`}>
                                        {user.email}
                                    </a>
                                </td>
                                <td>
                                    {dateFormat(
                                        user.registrationTime,
                                        "mmmm dS, yyyy"
                                    )}
                                </td>
                                <td>
                                    {dateFormat(
                                        user.lastLoginTime,
                                        "mmmm dS, yyyy, h:MM:ss TT"
                                    )}
                                </td>
                                <td
                                    style={{
                                        color: `${
                                            user.status === "blocked"
                                                ? "red"
                                                : "green"
                                        }`,
                                    }}
                                >
                                    {user.status === "blocked"
                                        ? "blocked"
                                        : "active"}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UsersTable;
