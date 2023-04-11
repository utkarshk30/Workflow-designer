import Head from "next/head";
import Image from "next/image";
// import styles from "../styles/Home.module.css";
import ReactFlow, {
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
  MiniMap,
  Background,
  ReactFlowProvider,
  useStore,
} from "reactflow";
import "reactflow/dist/style.css";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
// import Sidebar from "./sidebar";
// import Module from "./module";
import Link from "next/link";
import Custom from "./custom";
// import Custom from "@/components/custom";

const nodeTypes = {
  custom: Custom,
};

const initialNodes = [
  {
    id: "1",
    type: "custom",
    data: { input: "input", label: "Input node",output: " " },
    position: { x: 250, y: 5 },
  },
];

let id = 0;
const getId = () => `dndnode_${id++}`;

export default function Create({ name=" " }) {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  const proOptions = { hideAttribution: true };

  const onLoad = (_reactFlowInstance) => {
    setReactFlowInstance(_reactFlowInstance);
  };

  useEffect(() => {
    initialNodes[0].data.output = `${name}`;
  });

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type1 = event.dataTransfer.getData("application/reactflow");
      const type2 = event.dataTransfer.getData("application/reactflow1");
      const type3 = event.dataTransfer.getData("application/reactflow2");

      // check if the dropped element is valid
      if (
        (typeof type1 === "undefined" && typeof type2 === "undefined") ||
        !type1 ||
        !type2
      ) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: { input: `${type1}`, label: `${type2}`, output: `${type3}` },
      };
     

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance]
  );
  return (
    <div className="">
      

      <div className="w-[1150px] h-[600px] bg-gray-300  flex-grow">
        <ReactFlowProvider>
          <div
            className="w-[1150px] h-[600px] flex-grow"
            ref={reactFlowWrapper}
          >
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              fitView
              nodeTypes={nodeTypes}
              proOptions={proOptions}
              nodesDraggable
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onLoad={onLoad}
              onDragOver={onDragOver}
            >
              {/* {initialNodes.map((element) => (
        <NodeWithBorderColor key={element.id} id={element.id} />
      ))} */}
              <Controls />
              <MiniMap />
              <Background variant="dots" gap={12} size={1} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  );
}
