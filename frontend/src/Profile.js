import { useState } from "react";

function Profile() {
  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    location: ""
  });

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = (e) => {
    e.preventDefault();
    console.log("Saved user:", user);
    alert("Profile saved!");
  };

  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-header">
          <div className="profile-icon">👤</div>
          <h2>User Profile</h2>
        </div>

        <form onSubmit={handleSave} className="profile-form">

          <input
            name="name"
            placeholder="Name"
            value={user.name}
            onChange={handleChange}
          />

          <input
            name="surname"
            placeholder="Surname"
            value={user.surname}
            onChange={handleChange}
          />

          <input
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location (for weather)"
            value={user.location}
            onChange={handleChange}
          />

          <button type="submit" className="save-btn">
            Save Profile
          </button>

        </form>

      </div>

    </div>
  );
}

export default Profile;