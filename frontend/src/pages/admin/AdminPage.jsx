import dateFormat from "dateformat";
import { useState, useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table } from "react-bootstrap";
import { FaTrash, FaEdit } from "react-icons/fa";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import Button from "react-bootstrap/Button";
import { MdRestore } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import Form from "react-bootstrap/Form";
import {
    useDeleteUserMutation,
    useGetUsersQuery,
    useBlockUserMutation,
    useUnblockUserMutation,
} from "../../slices/usersApiSlice";
import { toast } from "react-toastify";

const tableHeadings = [
    // {
    //     id: "1",
    //     headingName: "#",
    // },
    {
        id: "2",
        headingName: "id",
    },
    {
        id: "3",
        headingName: "Name",
    },
    {
        id: "4",
        headingName: "E-mail",
    },
    {
        id: "5",
        headingName: "Registration date & time",
    },
    {
        id: "6",
        headingName: "Last login date & time",
    },
    {
        id: "7",
        headingName: "Status",
    },
];

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();
    const [deleteUser] = useDeleteUserMutation();
    const [blockUser] = useBlockUserMutation();
    const [unblockUser] = useUnblockUserMutation();

    const [checkedUsers, setCheckedUsers] = useState([]);

    const handleCheck = (id) => {
        if (checkedUsers.includes(id)) {
            setCheckedUsers(checkedUsers.filter((user) => user !== id));
        } else {
            setCheckedUsers([...checkedUsers, id]);
        }
    };

    const blockHandler = async () => {
        try {
            await blockUser(checkedUsers);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const unblockedHandler = async () => {
        try {
            await unblockUser(checkedUsers);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    const deleteHandler = async () => {
        try {
            await deleteUser(checkedUsers);
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || err.error);
        }
    };

    return (
        <>
            <div className="toolbar">
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={blockHandler}
                >
                    Block
                </Button>
                <MdRestore size="25px" onClick={unblockedHandler} />

                <MdDeleteForever size="25px" onClick={deleteHandler} />
            </div>

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

export default UserListScreen;
