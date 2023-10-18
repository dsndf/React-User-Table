import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { GrRefresh } from "react-icons/gr";
import { user } from "../../Firbase/services";
import CreateAndEditUser from "./CreateAndEditUser";
import toast from "react-hot-toast";

const Users = () => {
  const [popup, setPopup] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [userId, setUserId] = useState("");
  const [usersData, setUsersData] = useState([]);
  const fetchUsers = async () => {
    const allUsers = await user.getAllUsers();
    let usersList = [];
    allUsers.docs.map((doc) => {
      usersList = [...usersList, { ...doc.data(), id: doc.id }];
    });
    setUsersData(usersList);
  };
  const deleteUserHandler = async (id) => {
    await toast.promise(user.deleteUser(id), {
      success: "User Deleted.",
      error: "Something went wrong.",
    });
    await fetchUsers();
  };
  const editHandler = (id) => {
    setUserId(id);
    setEditToggle(true);
    setPopup(true);
  };
  const refereh = () => {
    toast.promise(fetchUsers(), {
      success: "Refereshed",
      error: "Something went wrong.",
    });
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  return (
    <div className="h-[100vh] py-10 px-5 w-[100vw]   ">
      <h1 className="font-bold text-3xl p-2  mb-5 ">USERS</h1>
      <div className="flex justify-between px-2 md:px-7 my-2 ">
        <button className="flex items-center gap-1 " onClick={refereh}>
          <GrRefresh />
          Refresh
        </button>
        <button
          className="flex items-center gap-1 py-2 px-5 bg-gray-200 border rounded-md "
          onClick={() => setPopup(true)}
        >
          <MdOutlineCreateNewFolder className="text-[18px]" />
          Add User
        </button>
        {popup && (
          <CreateAndEditUser
            setPopup={setPopup}
            userId={userId}
            setUserId={setUserId}
            editToggle={editToggle}
            setEditToggle={setEditToggle}
          />
        )}
      </div>
      <div className="overflow-x-scroll md:overflow-visible">
        <Table
          usersData={usersData}
          deleteUserHandler={deleteUserHandler}
          editHandler={editHandler}
        />
      </div>

      <small className="text-center block p-4 font-medium">
        All availbale users in database.
      </small>
    </div>
  );
};

export default Users;
