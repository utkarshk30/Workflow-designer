import React, { memo } from "react";
import { Handle, Position, useStore } from "reactflow";
import { BsArrowRightCircle } from "react-icons/bs";

function Custom({ data, id }) {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  // Check if the node has any incoming edges
  const hasInputEdges = edges.some((edge) => edge.target === id);
  return (
    <div
      className={`px-1 py-2 shadow-md rounded-md bg-white border-2  ${
        data.input == "input"
          ? `border-stone-400`
          : hasInputEdges
          ? `border-stone-400`
          : `border-red-400`
      }  `}
    >
      <div className="flex items-center justify-center  font-bold ">
        {data.input == "input" ? (
          <p className="border-r  px-2">
            <BsArrowRightCircle />{" "}
          </p>
        ) : (
          <p className="border-r px-2 text-sm uppercase ">{data.input}</p>
        )}
        <p className="px-2 text-gray-400 text-xs font-semibold ">
          {data.label}
        </p>
        <p className="border-l px-2 text-sm uppercase ">{data.output}</p>
      </div>

      {data.input == "input" ? (
        <Handle
          type="target"
          position={Position.Top}
          className="w-0 !bg-green-500"
          isConnectable={false}
        />
      ) : (
        <Handle
          type="target"
          position={Position.Top}
          className="w-16 !bg-teal-500"
          
        />
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-16 !bg-teal-500"
      />
    </div>
  );
}

export default memo(Custom);
