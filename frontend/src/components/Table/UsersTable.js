import dateFormat from "dateformat";
import { useState } from "react";
import { Table } from "react-bootstrap";
import Loader from "../Loader";
import Message from "../Message";

import Form from "react-bootstrap/Form";
import { useGetUsersQuery } from "../../slices/usersApiSlice";

import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import ButtonToolbar from "./ButtonToolbar";
import { tableHeadings } from "./constants";

const UsersTable = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();

  const [checkedUsers, setCheckedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const dispatch = useDispatch();

  const handleCheck = (id) => {
    if (checkedUsers.includes(id)) {
      setCheckedUsers(checkedUsers.filter((user) => user !== id));
    } else {
      setCheckedUsers([...checkedUsers, id]);
    }

    setSelectAll((prevSelectAll) =>
      users.every((user) => checkedUsers.includes(user._id))
    );
  };

  const handleSelectAll = (event) => {
    const checked = event.target.checked;
    setSelectAll(checked);
    setCheckedUsers(checked ? users.map((user) => user._id) : []);
  };

  if (error && error?.status === 401) {
    dispatch(logout());
    return <Navigate to="/register" />;
  }

  return (
    <>
      <ButtonToolbar
        checkedUsers={checkedUsers}
        setCheckedUsers={setCheckedUsers}
        setSelectAll={setSelectAll}
        refetch={refetch}
        isLoading={isLoading}
      />
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
                <Form.Check
                  aria-label="select all"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
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
                      <div key={`default-${type}`} className="mb-3">
                        <Form.Check
                          type="checkbox"
                          id="checkbox"
                          onChange={() => handleCheck(user._id)}
                          checked={checkedUsers.includes(user._id)}
                        />
                      </div>
                    ))}
                  </Form>
                </td>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>
                  <a href={`mailto:${user.email}`}>{user.email}</a>
                </td>
                <td>{dateFormat(user.registrationTime, "mmmm dS, yyyy")}</td>
                <td>
                  {dateFormat(user.lastLoginTime, "mmmm dS, yyyy, h:MM:ss TT")}
                </td>
                <td
                  style={{
                    color: `${user.status === "blocked" ? "red" : "green"}`,
                  }}
                >
                  {user.status === "blocked" ? "blocked" : "active"}
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
