import React, { useState, useEffect, useRef } from "react";
import Axios from "axios";
import config from "@config";

const isDevelopment = process.env.NODE_ENV === "development";
const serverUrl = isDevelopment
  ? config.development.serverUrl
  : config.production.serverUrl;

interface SheetActionSectionProps {
  sheet_id: string;
  sheetData: {
    sheet_title: string;
    sheet_subject: string;
    entity_type: number;
    sheet_author: any;
    sheet_url: string;
    sheet_likes: number;
    sheet_dislikes: number;
  };
}

export default function SheetActionSection({
  sheet_id,
  sheetData,
}: SheetActionSectionProps) {
  const sheetActionsSectionRef = useRef<HTMLDivElement>(null);
  const handleSlider = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState<number>(-85);
  const [handleSliderTop, setHandleSliderTop] = useState<number>(0);
  const isDraggingAllowed = useRef<boolean>(false);
  const initialDragY = useRef<number>(0);

  // Sets the horizontal position of the action section
  useEffect(() => {
    const sheetActionsSectionWidth =
      sheetActionsSectionRef.current?.clientWidth;
    if (sheetActionsSectionWidth) {
      const leftPosition = `calc(50% - ${sheetActionsSectionWidth / 2}px)`;
      sheetActionsSectionRef.current.style.left = leftPosition;
    }
  }, []);

  const handleDragStart = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const target = event.target as HTMLElement;
    if (target.classList.contains("handle")) {
      isDraggingAllowed.current = true;
      initialDragY.current =
        "clientY" in event ? event.clientY : event.touches[0]?.clientY;
    }
  };

  const handleDragMove = (
    event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>,
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (!isDraggingAllowed.current) return;

    let clientY: number;

    if ("clientY" in event) {
      clientY = event.clientY;
    } else if (event.touches && event.touches.length > 0) {
      clientY = event.touches[0].clientY;
    } else {
      return;
    }

    const deltaY = clientY - initialDragY.current;
    setTranslateY((prevTranslateY) => {
      const newTranslateY = prevTranslateY + deltaY;
      if (newTranslateY < -85) return -85;
      else if (newTranslateY > -20) return -20;
      else return newTranslateY;
    });
    initialDragY.current = clientY;
  };

  const handleDragEnd = () => {
    isDraggingAllowed.current = false;
  };

  // Handled the position of the thumb in the handle slider
  useEffect(() => {
    setHandleSliderTop(Math.min((1.1 - translateY / -85) * 100, 65));
  }, [translateY]);

  // Sets up event listeners for handling dragging the action section
  useEffect(() => {
    if (isDraggingAllowed.current) {
      document.addEventListener("mousemove", handleDragMove as any);
      document.addEventListener("touchmove", handleDragMove as any);
      document.addEventListener("mouseup", handleDragEnd);
      document.addEventListener("touchend", handleDragEnd);
    } else {
      document.removeEventListener("mousemove", handleDragMove as any);
      document.removeEventListener("touchmove", handleDragMove as any);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    }
    return () => {
      document.removeEventListener("mousemove", handleDragMove as any);
      document.removeEventListener("touchmove", handleDragMove as any);
      document.removeEventListener("mouseup", handleDragEnd);
      document.removeEventListener("touchend", handleDragEnd);
    };
  }, [isDraggingAllowed.current]);

  const handleLike = async () => {
    await Axios.post(`${serverUrl}/sheets/like/${sheet_id}`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleDislike = () => {
    console.log("dislike");
  };

  return (
    <div
      ref={sheetActionsSectionRef}
      className="bg-fg-white-85 w-max pl-12 h-24 absolute shadow-lg flex items-center justify-center space-x-6 font-K2D text-sm rounded-md overflow-hidden"
      style={{
        transform: `translateY(${translateY}px)`,
      }}
      onMouseDown={handleDragStart}
      onTouchStart={handleDragStart}
      onMouseMove={handleDragMove}
      onTouchMove={handleDragMove}
    >
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="flex items-center justify-center space-x-2">
          <button className="bg-fg-white-75 h-8 rounded-full px-3 flex items-center justify-center">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M376.565-324.935q-109.835 0-185.95-76.195Q114.5-477.326 114.5-585t76.196-183.87q76.195-76.195 184.369-76.195t183.87 76.195q75.695 76.196 75.695 184.02 0 43.328-13.641 82.97-13.641 39.641-40.924 74.402L820.63-188.913q10.196 9.99 10.196 24.767 0 14.776-10.196 24.972-10.323 10.435-25.155 10.435-14.833 0-24.584-10.435L531.326-378.5q-29.761 25.264-69.6 39.415-39.84 14.15-85.161 14.15Zm-.915-68.13q79.73 0 135.29-56.245Q566.5-505.554 566.5-585t-55.595-135.69q-55.595-56.245-135.255-56.245-80.494 0-136.757 56.245Q182.63-664.446 182.63-585t56.228 135.69q56.227 56.245 136.792 56.245Z" />
            </svg>
            Search for forum
          </button>
          <button className="bg-fg-white-75 h-8 rounded-full px-3 flex items-center justify-center">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-240q-17 0-28.5-11.5T240-280v-80h520v-360h80q17 0 28.5 11.5T880-680v503q0 27-24.5 37.5T812-148l-92-92H280Zm-40-200-92 92q-19 19-43.5 8.5T80-377v-463q0-17 11.5-28.5T120-880h520q17 0 28.5 11.5T680-840v360q0 17-11.5 28.5T640-440H240Zm360-80v-280H160v280h440Zm-440 0v-280 280Z" />
            </svg>
            Start forum
          </button>
          <button className="bg-fg-white-75 h-8 rounded-full px-3 flex items-center justify-center">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M440-440H240q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h200v-200q0-17 11.5-28.5T480-760q17 0 28.5 11.5T520-720v200h200q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H520v200q0 17-11.5 28.5T480-200q-17 0-28.5-11.5T440-240v-200Z" />
            </svg>
            Add to collection
          </button>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <button
            className="bg-fg-white-75 h-8 w-24 rounded-full flex items-center justify-center"
            onClick={handleLike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M840-640q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14H280v-520l240-238q15-15 35.5-17.5T595-888q19 10 28 28t4 37l-45 183h258Zm-480 34v406h360l120-280v-80H480l54-220-174 174ZM160-120q-33 0-56.5-23.5T80-200v-360q0-33 23.5-56.5T160-640h120v80H160v360h120v80H160Zm200-80v-406 406Z" />
            </svg>
            {sheetData.sheet_likes}
          </button>
          <button
            className="bg-fg-white-75 h-8 aspect-square rounded-full flex items-center justify-center"
            onClick={handleDislike}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M120-320q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14h440v520L440-82q-15 15-35.5 17.5T365-72q-19-10-28-28t-4-37l45-183H120Zm480-34v-406H240L120-480v80h360l-54 220 174-174Zm200-486q33 0 56.5 23.5T880-760v360q0 33-23.5 56.5T800-320H680v-80h120v-360H680v-80h120Zm-200 80v406-406Z" />
            </svg>
          </button>
          <button className="bg-fg-white-75 h-8 rounded-full px-3 flex items-center justify-center">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M280-400h400q17 0 28.5-11.5T720-440q0-17-11.5-28.5T680-480H280q-17 0-28.5 11.5T240-440q0 17 11.5 28.5T280-400Zm0-120h400q17 0 28.5-11.5T720-560q0-17-11.5-28.5T680-600H280q-17 0-28.5 11.5T240-560q0 17 11.5 28.5T280-520Zm0-120h400q17 0 28.5-11.5T720-680q0-17-11.5-28.5T680-720H280q-17 0-28.5 11.5T240-680q0 17 11.5 28.5T280-640ZM160-240q-33 0-56.5-23.5T80-320v-480q0-33 23.5-56.5T160-880h640q33 0 56.5 23.5T880-800v623q0 27-24.5 37.5T812-148l-92-92H160Zm594-80 46 45v-525H160v480h594Zm-594 0v-480 480Z" />
            </svg>
            Comment
          </button>
          <button className="bg-fg-white-75 h-8 rounded-full px-3 flex items-center justify-center">
            <svg
              className="mr-1"
              xmlns="http://www.w3.org/2000/svg"
              height="20"
              viewBox="0 -960 960 960"
              width="20"
            >
              <path d="M720-80q-50 0-85-35t-35-85q0-7 1-14.5t3-13.5L322-392q-17 15-38 23.5t-44 8.5q-50 0-85-35t-35-85q0-50 35-85t85-35q23 0 44 8.5t38 23.5l282-164q-2-6-3-13.5t-1-14.5q0-50 35-85t85-35q50 0 85 35t35 85q0 50-35 85t-85 35q-23 0-44-8.5T638-672L356-508q2 6 3 13.5t1 14.5q0 7-1 14.5t-3 13.5l282 164q17-15 38-23.5t44-8.5q50 0 85 35t35 85q0 50-35 85t-85 35Zm0-640q17 0 28.5-11.5T760-760q0-17-11.5-28.5T720-800q-17 0-28.5 11.5T680-760q0 17 11.5 28.5T720-720ZM240-440q17 0 28.5-11.5T280-480q0-17-11.5-28.5T240-520q-17 0-28.5 11.5T200-480q0 17 11.5 28.5T240-440Zm480 280q17 0 28.5-11.5T760-200q0-17-11.5-28.5T720-240q-17 0-28.5 11.5T680-200q0 17 11.5 28.5T720-160Zm0-600ZM240-480Zm480 280Z" />
            </svg>
            Share
          </button>
        </div>
      </div>
      <div className="w-6 pr-2 h-full">
        <div className="w-4 h-24 handle flex justify-center items-center relative">
          <div
            className="w-3 aspect-square bg-fg-black-15 hover:bg-fg-black-10 rounded-full absolute left-1/2 -translate-x-1/2 translate-y-1/2 cursor-pointer handle"
            style={{
              top: `${handleSliderTop}%`,
            }}
          ></div>
          <div
            ref={handleSlider}
            className="w-2 h-16 bg-fg-white-75 rounded-full cursor-pointer handle"
          ></div>
        </div>
      </div>
    </div>
  );
}
