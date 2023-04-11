import Create from "@/components/create";
import Head from "next/head";
import { useRouter } from "next/router";
import { Input } from "postcss";
import React, { useEffect, useMemo, useState } from "react";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";

// import Create from "./createhhhsh";

const Module = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchData = async () => {
    let url = `https://64307b10d4518cfb0e50e555.mockapi.io/modules?page=${page}&limit=5`;

    setLoading(true);
    let data = await fetch(url);
    let parsedData = await data.json();

    setLoading(false);

    setData(parsedData);
  };
  const fetchData2 = async () => {
    let url = `https://64307b10d4518cfb0e50e555.mockapi.io/workflow/${router.query.id}`;
    let data = await fetch(url);
    let parsedData2 = await data.json();

    setName(parsedData2);
  };

  const prevClick = async () => {
    setPage(page - 1);
    fetchData();
  };
  const nextClick = async () => {
    setPage(page + 1);
    fetchData();
  };

  useEffect(() => {
    fetchData2();

    fetchData();
  }, [router]);

  const onDragStart = (event, nodeType1, nodeType2, nodeType3) => {
    const obj = {
      node1: nodeType1,
      node2: nodeType2,
      node3: nodeType3,
    };

    event.dataTransfer.setData("application/reactflow", obj.node1);
    event.dataTransfer.setData("application/reactflow1", obj.node2);
    event.dataTransfer.setData("application/reactflow2", obj.node3);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <div>
       <Head>
        <title>Workflow designer / module</title>
        <meta name="description" content="workflow designer" />
        <link rel="icon" href="/logo.webp"  />
      </Head>
      <div className="my-4 mx-6 text-xl font-serif font-bold">
        <span className="font-semibold font-sans text-base text-gray-600">
          WorkFlow Name :{" "}
        </span>
        {name.name}
      </div>
      <div className="flex border-2  border-black ">
        <div className="w-1/4 flex flex-col items-center py-4 space-y-8 px-4  border-2 border-slate-400 ">
          <div className="text-center text-gray-700 text-lg font-bold">
            Modules
          </div>

          {loading && (
            <div>
              <img src="/loading.gif" alt="loading" className="text-center" />
            </div>
          )}

          {!loading &&
            data.map((item) => {
              return (
                <div
                  className="cursor-grab border-2 border-blue-400 font-semibold flex w-full p-2 items-center rounded-xl  justify-between  "
                  key={item.id}
                  onDragStart={(event) =>
                    onDragStart(
                      event,
                      `${item.input_type}`,
                      `${item.name}`,
                      `${item.output_type}`
                    )
                  }
                  draggable
                >
                  <div className="px-4 border-r-2 uppercase ">
                    {item.input_type}
                  </div>
                  <div className="text-gray-400">{item.name}</div>
                  <div className="px-4 border-l-2 uppercase ">
                    {item.output_type}
                  </div>
                </div>
              );
            })}
          <div className="flex space-x-6 items-center ">
            <div
              onClick={prevClick}
              className={`cursor-pointer py-2 border-2 ${
                page == 1 ? `pointer-events-none bg-gray-400 ` : `pointer-events-auto bg-teal-300 `
              } rounded-lg border-black px-4 hover:bg-teal-500 `}
            >
              <TbPlayerTrackPrevFilled className="text-xl" />
            </div>
            <div className="font-bold text-lg">{page}</div>
            <div
              onClick={nextClick}
              className={`cursor-pointer py-2 ${
                page >= 20 ? `pointer-events-none bg-gray-400 ` : `pointer-events-auto bg-teal-300 `
              } rounded-lg  border-2 border-black px-4 hover:bg-teal-500  `}
            >
              <TbPlayerTrackNextFilled className="text-xl" />
            </div>
          </div>
          <div className="my-4">
            <p className="text-xs font-semibold text-gray-400">
              Drag and Drop above module in the canvas
            </p>
          </div>
        </div>
        <div className="w-3/4">
          <Create name={name.input_type} />
        </div>
      </div>
    </div>
  );
};

export default Module;
