import React, { useState } from "react";

const UserForm = ({ setShowForm, user = {} }) => {
  const [name, setName] = useState(user.name || ""),
    [email, setEmail] = useState(user.email || ""),
    [gender, setGender] = useState(user.gender || ""),
    [status, setStatus] = useState(user.status || "");

  const onSave = async () => {
    let method = "POST",
      url = "https://gorest.co.in/public/v1/users";

    if (user.id) {
      method = "PUT";
      url += `/${user.id}`;
    }
    await fetch(url, {
      method: method,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, gender, status }),
    });
    setShowForm(false);
  };
  return (
    <div>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <br></br>
      <label>
        Gender:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">male</option>
          <option value="female">female</option>
        </select>
      </label>
      <br></br>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
      </label>
      <br></br>
      <button onClick={() => setShowForm(false)}>Cancel</button>
      <button onClick={onSave}>Save</button>
    </div>
  );
};

export default UserForm;
