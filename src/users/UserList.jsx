import React, { useEffect, useState } from "react";
import UserForm from "./UserForm";
import "./UserList.css";

const getUser = (callback) =>
  fetch("https://gorest.co.in/public/v1/users")
    .then((response) => response.json())
    .then((data) => callback(data));

const UserList = () => {
  const [list, setList] = useState([]),
    [showForm, setShowForm] = useState(false),
    [user, setUser] = useState({});

  useEffect(() => {
    getUser(function (response) {
      setList(response.data);
    });
  }, []);
  const onDelete = (event) => {
    fetch(
      "https://gorest.co.in/public/v1/users/" +
        event.target.getAttribute("data-id"),
      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  const onEdit = (event) => {
    const data = list.find(
      (item) => +item.id === +event.target.getAttribute("data-id")
    );
    setUser(data || {});
    setShowForm(true);
  };
  const onAdd = () => {
    setShowForm(true);
    setUser({});
  };

  return (
    <>
      <div className="new-user">
        <button onClick={onAdd}>Add User</button>
      </div>
      {showForm && <UserForm setShowForm={setShowForm} user={user} />}
      <div className="grid-container header">
        <div className="grid-item">ID</div>
        <div className="grid-item">Name</div>
        <div className="grid-item">Email</div>
        <div className="grid-item">Gender</div>
        <div className="grid-item">Status</div>
        <div></div>
        <div></div>
      </div>
      {list.map((item) => {
        return (
          <div key={item.id} className="grid-container">
            <div className="grid-item">{item.id}</div>
            <div className="grid-item">{item.name}</div>
            <div className="grid-item">{item.email}</div>
            <div className="grid-item">{item.gender}</div>
            <div className="grid-item">{item.status}</div>
            <button data-id={item.id} onClick={onEdit}>
              Edit
            </button>
            <button data-id={item.id} onClick={onDelete}>
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default UserList;
