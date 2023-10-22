import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import "./profile.css";

const Profile = () => {
  const [user, setUser] = useState({
    username: "",
    score: 3,
    language: "English",
    bio: "",
    avatarUrl: "",
  });

  const [showBioInput, setShowBioInput] = useState(false);
  const [showLanguageInput, setShowLanguageInput] = useState(false);
  const [showAvatarInput, setShowAvatarInput] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUser((prevUser) => ({ ...prevUser, username: storedUsername }));
    }
  }, []);

  const handleLanguageInputChange = (event) => {
    setUser((prevUser) => ({ ...prevUser, language: event.target.value }));
  };

  const handleBioInputChange = (event) => {
    setUser((prevUser) => ({ ...prevUser, bio: event.target.value }));
  };

  const updateLanguage = () => {
    setShowLanguageInput(false);
  };

  const resetProgress = () => {
    setUser((prevUser) => ({ ...prevUser, score: 0 }));
  };

  const updateBio = () => {
    setShowBioInput(false);
  };

  const updateAvatar = (avatarUrl) => {
    setUser((prevUser) => ({ ...prevUser, avatarUrl }));
    setShowAvatarInput(false);
  };

  return (
    <div className="profile">
      <h2>User Profile</h2>
      <div className="avatar-section">
        {showAvatarInput ? (
          <>
            <label>Choose an Avatar: </label>
            <input
              type="text"
              placeholder="Avatar URL"
              value={user.avatarUrl}
              onChange={(e) => updateAvatar(e.target.value)}
            />
            <button onClick={() => setShowAvatarInput(false)}>Cancel</button>
            <button onClick={() => updateAvatar(user.avatarUrl)}>Update Avatar</button>
          </>
        ) : (
          <>
            <Avatar size="100" name={user.username} round={true} src={user.avatarUrl} />
            <button onClick={() => setShowAvatarInput(true)}>Change Avatar</button>
          </>
        )}
      </div>
      <p className="bold-and-enlarge">Username: {user.username}</p>
      <p className="bold-and-enlarge">Score: {user.score}</p>
      <p className="bold-and-enlarge">Language: {user.language}</p>
      <p className="bold-and-enlarge">Bio: {user.bio}</p>

      <div className="button-row">
        {showLanguageInput ? (
          <>
            <label>Change Language: </label>
            <input
              type="text"
              value={user.language}
              onChange={handleLanguageInputChange}
            />
            <button onClick={() => setShowLanguageInput(false)}>Cancel</button>
            <button onClick={updateLanguage}>Update Language</button>
          </>
        ) : (
          <button onClick={() => setShowLanguageInput(true)}>Update Language</button>
        )}

        {showBioInput ? (
          <>
            <label>Add a Bio: </label>
            <textarea
              value={user.bio}
              onChange={handleBioInputChange}
              rows="4"
              cols="50"
            />
            <button onClick={() => setShowBioInput(false)}>Cancel</button>
            <button onClick={updateBio}>Update Bio</button>
          </>
        ) : (
          <button onClick={() => setShowBioInput(true)}>Update Bio</button>
        )}

        <button onClick={resetProgress}>Reset Progress</button>
        <Link to="/dashboard">
          <button>Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Profile;
