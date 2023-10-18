import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { user } from "../../Firbase/services";
import toast from "react-hot-toast";
const CreateAndEditUser = ({ setPopup, userId, editToggle ,setUserId,setEditToggle}) => {
  const closePopup = (e) => {
    e.preventDefault();
    setPopup(false);
    if(editToggle){
      setEditToggle(false);
    }
  };
  const [state, setState] = useState({
    name: "",
    email: "",
    city: "",
    age: "",
    gender: "",
  });
  const changeHandler = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const createUserHandler =(e) => {
    e.preventDefault();
   toast.promise(user.addUser(state),{success:"User Added. Refresh Now",error:"Something went wrong."});
     setPopup(false);
  };
  const updateUserHandler =(e) => {
    e.preventDefault();
   toast.promise(user.updateUser(userId,state),{success:"User Updated. Referesh Now",error:"Something went wrong."});
   setPopup(false);

  };
  const getUserById = async (id) => {
    const data = await user.getUser(id);
    setState(data.data());
  };
  useEffect(() => {
    if (userId) {
      getUserById(userId);
    }
    return ()=>{
      setUserId("");
    }
  }, []);
  return (
    <>
      <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-50"></div>
      <div className="fixed p-5  z-10 w-[350px]  md:w-[500px] h-auto  top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] rounded-md  bg-white ">
        <h3 className="text-xl text-center  font-semibold">{editToggle?"EDIT USER":"ADD USER"}</h3>
        <form action="" onSubmit={(e)=>editToggle?updateUserHandler(e,userId):createUserHandler(e)}>
          <div className="text-[14px] my-3 my-2 ">
            <p>Username:</p>
            <input
              type="text"
              className="border border-gray-300 w-full p-2 my-1 rounded-md focus:outline-none"
              placeholder="Enter user name"
              name="name"
              required
              value={state.name}
              onChange={changeHandler}
            />
          </div>
          <div className="text-[14px] my-3">
            <p>Email:</p>
            <input
              type="email"
              className="border border-gray-300  w-full p-2 my-1 rounded-md  focus:outline-none "
              placeholder="Enter user email"
              name="email"
              required
              value={state.email}
              onChange={changeHandler}
            />
          </div>
          <div className="text-[14px] my-3">
            <p>City:</p>
            <input
              type="text"
              className="border border-gray-300  w-full p-2 my-1 rounded-md  focus:outline-none "
              placeholder="Enter user city"
              name="city"
              required
              value={state.city}
              onChange={changeHandler}
            />
          </div>
          <div className="text-[14px] my-3 flex justify-left gap-5 items-center ">
            <div>
              <p>Age:</p>
              <input
                type="Number"
                className="border border-gray-300   w-[100px] p-2 my-1 rounded-md  focus:outline-none "
                placeholder="e.g 20"
                name="age"
                required
                value={state.age}
                onChange={changeHandler}
              />
            </div>
            <div>
              <p>Gender:</p>
              <div className="flex justify-between gap-2 py-2 my-1    items-center">
                <label htmlFor={"gender"}>Male</label>
                <input
                  type="radio"
                  value={"male"}
                  name="gender"
                  className="mr-5"
                  onChange={changeHandler}
                  checked = {state.gender === "male"}
                />
                <label htmlFor={"gender"}>Female</label>
                <input
                  type="radio"
                  value={"female"}
                  name="gender"
                  onChange={changeHandler}
                  checked = {state.gender === "female"}
                />
              </div>
            </div>
          </div>
          <div>
            {editToggle ? (
              <button className=" border py-2 px-4 bg-purple-600 text-white rounded-md ">
              Edit
              </button>
            ) : (
              <button className=" border py-2 px-4 bg-purple-600 text-white rounded-md ">
               Add
              </button>
            )}

            <button
              className="border py-2 px-4 bg-gray-200 rounded-md  mx-5 "
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateAndEditUser;
