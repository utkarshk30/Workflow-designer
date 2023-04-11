import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Workflow = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    let url = `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/`;
  
    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();
  
    setLoading(false);
  
    setData(parsedData);
  };

  useEffect(() => {
    fetchData();
  }, [router]);
  return (
    <div className="border">
      
      <div className="flex justify-around w-fit mx-auto space-x-12 text-lg py-2 font-bold ">
        <p className="pr-8 ">Name</p>
        <p className="pr-4">Input_Type</p>
        <p className="">CreatedAt</p>
      </div>
      {loading && (
        <div className="flex justify-center my-8 ">
          <img src="/loading.gif" alt="loading" className="text-center" />
        </div>
      )}
      <div className=" flex flex-col space-y-3  w-fit mx-auto px-6 ">
        {!loading &&
          data.map((item) => {
            return (
              <Link key={item.id} href={`/module?id=${item.id}`}>
                <div className="flex items-center space-x-10 px-4 py-3 shadow-md bg-gradient-to-r from-green-400 to-blue-400 hover:from-pink-500 hover:to-yellow-500 justify-center  border border-red-800 ">
                  <p className="w-40  ">{item.name}</p>
                  <p className="pl-4">{item.id}</p>
                  <p className="pl-8">{item.createdAt}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Workflow;
