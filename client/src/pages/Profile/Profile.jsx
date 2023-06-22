import axios from "../../axios";
import React from "react";
import { useParams } from "react-router-dom";
import { convertToNormalDateFormat } from "../../utils/convertToNormalDateFormat";
import { useSelector } from "react-redux";

const Profile = () => {
  const { id } = useParams();
  const [userData, setUserData] = React.useState();
  const { data } = useSelector((state) => state.auth);

  const handleGetUserData = async () => {
    try {
      const { data } = await axios.get(`/profile/${id}`);
      setUserData(data);
    } catch (error) {
      alert(error);
    }
  };

  React.useEffect(() => {
    handleGetUserData();
  }, []);

  return (
    <div>
      <h2>Profile</h2>
      <img
        style={{ marginBottom: "20px" }}
        src={userData && userData.avatarUrl}
        alt=""
      />
      <div>
        <div>Name: {userData && userData.fullName}</div>
        <div>Email: {userData && userData.email}</div>
      </div>
      <p style={{ color: "gray" }}>
        account was created on:{" "}
        {userData && convertToNormalDateFormat(userData.createdAt)}
      </p>
      {data?._id === id && <button>Edit</button>}
    </div>
  );
};

export default Profile;
