import React, { useState } from "react";

const DATA_1 = {
  profilePicture: "https://picsum.photos/50",
  name: {
    first: "John",
    middle: "Chris",
    last: "Doe",
  },
  images: [
    "https://picsum.photos/190",
    "https://picsum.photos/191",
    "https://picsum.photos/192",
    "https://picsum.photos/193",
    "https://picsum.photos/194",
    "https://picsum.photos/195",
  ],
};

const DATA_2 = {
  profilePicture: "https://picsum.photos/50",
  name: {
    first: "John",
    middle: "Chris",
    last: "Doe",
  },
  images: [
    "https://picsum.photos/196",
    "https://picsum.photos/197",
    "https://picsum.photos/198",
    "https://picsum.photos/199",
  ],
};

const DATA_3 = {
  profilePicture: "https://picsum.photos/50",
  name: {
    first: "John",
    middle: "Chris",
    last: "Doe",
  },
  images: [
    "https://picsum.photos/200",
    "https://picsum.photos/201",
    "https://picsum.photos/202",
    "https://picsum.photos/203",
    "https://picsum.photos/204",
  ],
};

const DATA_4 = {
  profilePicture: "https://picsum.photos/50",
  name: {
    first: "John",
    middle: "Chris",
    last: "Doe",
  },
  images: ["https://picsum.photos/205", "https://picsum.photos/206"],
};

function UserProfile({ userData }) {
  return (
    <div>
      <div
        style={{
          display: "flex",
        }}
      >
        <img
          src={userData.profilePicture}
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            gap: "5px",
          }}
        ></img>
        <p>
          {userData.name.first} {userData.name.middle[0]}. {userData.name.last}
        </p>
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        {userData.images.map((item, index) => {
          if (index < 4) return <img key={index} src={item}></img>;
        })}
        <div
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "gray",
          }}
        >
          {userData.images.length === 5 ? (
            <img src={userData.images[4]}></img>
          ) : (
            <p>
              {userData.images.length - 4 > 0 ? userData.images.length - 4 : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function User() {
  return (
    <div>
      <UserProfile userData={DATA_1}></UserProfile>
      <UserProfile userData={DATA_2}></UserProfile>
      <UserProfile userData={DATA_3}></UserProfile>
      <UserProfile userData={DATA_4}></UserProfile>
    </div>
  );
}

export default User;
