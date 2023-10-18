import React, { useEffect, useState } from "react";
import Table from "../Table/Table";
import { MdOutlineCreateNewFolder } from "react-icons/md";
import { GrRefresh } from "react-icons/gr";
import { user } from "../../Firbase/services";
import CreateAndEditUser from "./CreateAndEditUser";
import toast from "react-hot-toast";
import { fields } from "../constant";

const Users = () => {
  const [popup, setPopup] = useState(false);
  const [editToggle, setEditToggle] = useState(false);
  const [userId, setUserId] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [sortField, setSortField] = useState("age");
  const fetchUsers = async () => {
    let { docs } = await user.getAllUsers(sortField);
    let usersList = [];
    docs.map((doc, i) => {
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
  }, [sortField]);
  return (
    <div className="h-[100vh] py-10 px-5 w-[100vw]   ">
      <h1 className="font-bold text-3xl p-2  mb-5 ">USERS</h1>
      <div className="flex justify-between px-2 md:px-7 my-2 ">
        <button className="flex items-center gap-1 " onClick={refereh}>
          <GrRefresh />
          Refresh
        </button>
        <div className="flex items-center gap-10">
          <select className="focus:outline-none border-2 border-purple-300 text-[13px] p-1 rounded-md " name="" id="" onChange={(e) => setSortField(e.target.value)}>
            <option value="">Sort By</option>
            {fields &&
              fields.map((field) => {
                if (field === "ID") return;
               return  <option value={field.toLowerCase()}>
                  {field.toLowerCase()}
                </option>
              }
              )}
          </select>
          <button
            className="flex items-center gap-1 py-2 px-5 bg-gray-200 border rounded-md "
            onClick={() => setPopup(true)}
          >
            <MdOutlineCreateNewFolder className="text-[18px]" />
            Add User
          </button>
        </div>

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
        All available users in database.
      </small>
    </div>
  );
};

export default Users;
