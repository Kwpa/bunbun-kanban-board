import { DownloadSimple, GithubLogo, Export, Textbox } from "@phosphor-icons/react";
import React from "react";
import ReactDom from "react-dom";
import { useGlobalContext } from "../GlobalContext";
import { useState } from "react";
import JSONViewer from "../Modals/JSONViewer";

export default function Settings({ close, isOpen, coords }) {
  const { loadData } = useGlobalContext();
  const [isJSONViewerOpen, setJSONViewerOpen] = useState(false);
  
  function exportData() {
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
    element.setAttribute("download", fileName);

    element.style.display = "none";
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
  }

  function importData(e) {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      const content = fileReader.result;
      loadData(content);
    };
    fileReader.readAsText(e.target.files[0]);
  }

  if (!isOpen) return null;
  return ReactDom.createPortal(
    <>
      <div
        className="fixed top-0 left-0 z-10 w-full h-full"
        onClick={(event) => {
          event.stopPropagation();
          close();
        }}
      />
      <div
        className="absolute flex items-center justify-center flex-col z-20 p-2 rounded-md bg-gray-775 shadow-md fade-in"
        style={{ left: coords.x - 70, top: coords.y + 43 }}
      >
        <button
          className="flex items-center p-1 m-1 w-full text-white hover:bg-gray-700 rounded-md hover:text-violet-400 transition-all duration-100"
          onClick={(event) => {
            event.stopPropagation();
            setJSONViewerOpen(true);
          }}
        >
          <Textbox size={23} className="pr-1" />
          JSON
        </button>
        <label
          id="file-upload"
          className="flex items-center p-1 m-1 w-full text-white hover:bg-gray-700 rounded-md hover:text-violet-400 transition-all duration-100 hover:cursor-pointer"
        >
        <input type="file" accept=".txt" onChange={(e) => importData(e)} />
          <DownloadSimple size={23} className="pr-1" />
          Import
        </label>
        
        <button
          className="flex items-center p-1 m-1 w-full text-white hover:bg-gray-700 rounded-md hover:text-violet-400 transition-all duration-100"
          onClick={() => {
            exportData();
          }}
        >
          <Export size={23} className="pr-1" />
          Export
        </button>
        <a
          className="flex items-center p-1 m-1 w-full text-white hover:bg-gray-700 rounded-md hover:text-violet-400 transition-all duration-100"
          href="https://github.com/lau-zudelova/bunbun-kanban-board"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubLogo size={23} className="pr-1" />
          Github
        </a>
        <JSONViewer
                  isOpen={isJSONViewerOpen}
                  close={() => setJSONViewerOpen(false)}
                  coords={coords}
                />
      </div>
    </>,
    document.getElementById("portal")
  );
}
