import React, {useEffect, useState} from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios';
import "../scss/components/_editProfile.scss"

const Backdrop = (props) => {
  return <div onClick={props.onConfirm} className="backdrop"></div>;
};

const ModalOverlay = (props) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const user = JSON.parse(window.localStorage.getItem("user"));


  useEffect(() => {
    axios.get(`http://localhost:3011/users/edit/${user.id}`, {
      headers: {
        Authorization: "Bearer " + user.token,
      }
    })
    .then((res) => {
      setName(res.data.username);
      setEmail(res.data.email);
    })
    .catch((err) => {
      console.log("Error fetching user", err);
    });
  }, [user.id]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    
    axios.put(`http://localhost:3011/users/edit/${user.id}`, {
      name,
      email,
      password
    },
    {
      headers: {
        Authorization: "Bearer " + user.token,
      }
    }
  )
    .then((res) => {
      console.log("User updated successfully", res);
    })
    .catch((err) => {
      console.log("Error updating user", err);
    });
  }

  return (
    <div className="editUserModal">
      <form onSubmit={handleUpdateProfile}>
        <div className="addUserCtn">
          <div className="inputs">
            <label style={{display: 'block'}} htmlFor="">Name</label>
            <input
              type="text" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              // className={`${formSubmitted && name === '' && error.name ? "removeMb" : ""}`}
            />
            {/* <p className="emptyRole">{formSubmitted && name === '' && error.name ? error.name : ""}</p> */}
          </div>
          <div className="inputs">
            <label style={{display: 'block'}} htmlFor="">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // className={`${formSubmitted && email === '' && error ? "removeMb" : ""}`}
            />
            {/* <p className="emptyRole">{formSubmitted && email === '' ? 'This field cannot be null' : error.email}</p> */}
          </div>
          <div className="inputs">
            <label style={{display: 'block'}} htmlFor="">New Password</label>
            <input
              type="password"
              // value={email}
              onChange={(e) => setPassword(e.target.value)}
              // className={`${formSubmitted && email === '' && error ? "removeMb" : ""}`}
            />
            {/* <p className="emptyRole">{formSubmitted && email === '' ? 'This field cannot be null' : error.email}</p> */}
          </div>
          <button>
            Save
          </button>
        </div>
      </form>
    </div>
  );

}

export default function UpdateProfileModal(props) {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay onConfirm={props.onConfirm} />,
        document.getElementById("overlay-root")
      )}
    </>
  )
}
