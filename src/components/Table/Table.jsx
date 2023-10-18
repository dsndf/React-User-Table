import React, { useEffect, useState } from "react";
import { fields } from "../constant";
import { user } from "../../Firbase/services";
const UserBox = ({
  id,
  name,
  email,
  age,
  gender,
  city,
  editHandler,
  deleteUserHandler,
}) => {
  return (
    <tr
      className={`      ${
        true ? "bg-white" : "bg-gray-100"
      } border-b border-gray-300 `}
    >
      <td className="p-2 pl-2 text-[14px]  font-medium ">{id ? id : "#101"}</td>
      <td className="p-2 pl-4 text-[14px]  font-medium  ">{name ? name : "Gaurav Jain"}</td>
      <td className="p-2 pl-4 text-[14px]  font-medium ">
        {email ? email : "abc199@gmail.com"}
      </td>
      <td className="p-2 pl-4 text-[14px]  font-medium ">{age ? age : "21"}</td>
      <td className="p-2 pl-4 text-[14px]  font-medium ">{gender ? gender : "Male"}</td>
      <td className="p-2 pl-4 text-[14px]  font-medium ">{city ? city : "Gwalior"}</td>
      <td className="p-2 pl-4 text-[14px]  font-medium  flex justify-center gap-4 items-center">
        <button
          className=" my-2 py-2 px-3 w-20  text-[14px]    rounded-md text-green-700 bg-green-200 font-semibold"
          onClick={editHandler}
        >
          Edit
        </button>
        <button
          className=" my-2 py-2 px-3 w-20  text-[14px]  font-medium  rounded-md text-red-700 bg-red-200 font-semibold"
          onClick={deleteUserHandler}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};
const Table = ({ usersData,deleteUserHandler ,editHandler }) => {


  return (
    <table className=" m-auto">
      <thead className="border-b border-gray-300">
        <tr>
          {fields &&
            fields.map((e) => (
              <th  className="text-[16px] pl-4  font-semibold min-w-[170px] p-2 text-left"   key={e}> {e} </th>
            ))}
          <th className=" min-w-[120px] p-2 pr-4 text-right  text-[16px]  font-semibold ">
            ACTIONS
          </th>
        </tr>
      </thead>
      <tbody className="">
        {usersData &&
          usersData.map((data) => (
            <UserBox
              key={data?.id}
              name={data?.name}
              email={data?.email}
              city={data?.city}
              age={data?.age}
              gender={data?.gender}
              id={data?.id}
              deleteUserHandler={()=>deleteUserHandler(data?.id)}
             editHandler={()=>editHandler(data?.id)}
            />
          ))}
      </tbody>
    </table>
  );
};

export default Table;
