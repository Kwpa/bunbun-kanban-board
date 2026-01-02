import React, { useState } from "react";
import {
  ArrowCounterClockwise,
  CheckFat,
  NotePencil,
  XCircle,
  FileText,
  CheckSquareOffset,
  FileArrowUp
} from "@phosphor-icons/react";
import ReactDom from "react-dom";
import { useGlobalContext } from "../GlobalContext";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { replaceCharacter } from "../GlobalContext";

export default function JSONViewer({ isOpen, close }) {

  let dataValue = showData();
  const { loadData } = useGlobalContext();
  const [dataInput, setDataInput] = useState(dataValue);

  function showData()
  {
    const data = localStorage.getItem("userData");
    const date = new Date();
    const fileName = `kanbanData-${date.getDate()}-${
      date.getMonth() + 1
    }-${date.getFullYear()}-at-${date.getHours()}-${date.getMinutes()}.txt`;

    var element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(data)
    );
    return data;
    
  }

  function stageData(content)
  {
    loadData(content);
  }

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div className="absolute top-0 left-0 h-screen w-screen flex items-center justify-center ">
        <div
          // background when open?
          className="fixed top-0 left-0 z-10 w-full h-full bg-black/80 fade-in"
          onClick={() => {
            close();
          }}
        />
        <div className="flex items-center justify-center flex-col z-20 p-5 h-full md:h-3/4 w-full md:w-1/2 md:rounded-lg bg-gray-900 shadow-lg fade-in ">
          
          <div className="w-full flex flex-row justify-end">
            <button // load data
              className="text-white hover:text-green-400 "
              onClick={() => stageData(dataValue) }
            >
              <FileArrowUp size={30} />
            </button>
            <button // close modal
              className="text-white hover:text-violet-400 "
              onClick={() => close()}
            >
              <XCircle size={30} />
            </button>
          </div>
          

          <h1 className=" mx-5 mb-8 px-3 pb-2 text-center text-white font-bold break-words text-2xl bg-gradient-to-b from-transparent from-50% to-violet-500/50 to-50%">
            Hello
          </h1>
        <>
        <textarea
                className=" h-full w-full p-2 rounded-md bg-gray-900 border-2 border-gray-700 text-white 
                focus:outline-none focus:border-violet-400 caret-violet-400 selection:bg-violet-200 selection:text-violet-900
                resize-none"
                onChange={(e) => setDataInput(e.target.value)}
                value={dataInput}
                autoFocus

              />
        </>
        </div>
        
      </div>
    </>,
    document.getElementById("portal")
  );
}
