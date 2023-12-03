import React, { useState } from "react";
import "./rightSpace.css";

export default function RightSpace() {
    return (
        <div id="rightSpace" className="rounded-xl overflow-hidden h-4/5">
            <RightSpaceNav />
            <div id="rightSpaceContentContainer" style={{ height: `calc(100% - 7rem)` }}>
                <NewsCards />
            </div>
            <RightSpaceSearchBar />
        </div>
    )
}

function RightSpaceNav() {
    return (
        <nav id="rightSelectionBarSpace" className="block w-full rounded-t-xl h-12 bg-fg-white-90 drop-shadow-md">
            <div className="flex divide-x-2 divide-fg-white-70 h-full">
                <div className="w-1/4 my-auto flex justify-center items-center">
                    <button className="text-lg underline-offset-8 underline decoration-fg-primary decoration-2">News</button>
                </div>
                <div className="w-1/4 my-auto flex justify-center items-center">
                    <button className="text-lg">Explore</button>
                </div>
                <div className="w-1/4 my-auto flex justify-center items-center">
                    <button className="text-lg">Messages</button>
                </div>
                <div className="w-1/4 my-auto flex justify-center items-center">
                    <button className="text-lg">Dog-Ears</button>
                </div>
            </div>
        </nav>
    )
}

function NewsCards() {
    return (
        <div id="newsCards" className="h-full mr-3 overflow-scroll">
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">The Divide on Capital Hill</p>
                    <p className="font-Josefin text-xs">Is the growing partisan-ism good for the country? Or are we growing to be a country divide and doomed to fall?</p>
                    <p className="newsAffResponses">Affiliates’ responses: Owen Wilson, GOP, Democratic Party...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Foreign Wars Causing Domestic Troubles</p>
                    <p className="font-Josefin text-xs">What is the long term impact of foreign wars in America's market’s and streets? Are their problems worth making ours?</p>
                    <p className="newsAffResponses">Affiliates’ responses: Susana Collins, Jeremy Wright...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Journalism the Problem or the Solution</p>
                    <p className="font-Josefin text-xs">Is freedom of the press tearing the country apart and sowing mistrust among the populace or is it exposing the muck clogging the pipes of America?</p>
                    <p className="newsAffResponses">Affiliates’ responses: Riley O’Neil, Women on the 1st Amendment...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
            <div className="bg-white w-fill my-4 mx-6 h-36 flex items-center rounded-md">
                <div className="w-28 aspect-square overflow-clip bg-fg-white-85 ml-3 rounded-sm grid place-items-center">
                    <p>pic</p>
                </div>
                <div className="m-2 w-2/3">
                    <p className="font-Josefin text-base font-bold">Global Warmings Affects on Gazelles in Africa</p>
                    <p className="font-Josefin text-xs">What is the real affects of the recent heat wave on gazelles in Africa? Are the receding watering holes a cause for concern?</p>
                    <p className="newsAffResponses">Affiliates’ responses: John Smith, GOP, PETA...</p>
                </div>
            </div>
        </div>
    )
}

function RightSpaceSearchBar() {
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const getSearchIcon = () => {
    if (isInputFocused || inputValue.trim() !== '') {
      return 'searchArrow.svg';
    } else {
      return 'searchIcon.svg';
    }
  };

  return (
    <div id="rightSpaceSearchBar" className="h-16 w-full bg-fg-white-90 flex justify-center items-center">
      <form className="w-4/5 h-10 bg-fg-white-85 rounded-md overflow-clip flex items-center">
            <input
                id="rightSearchSubmit"
                type="submit"
                value=""
                className="w-6 h-6 bg-cover bg-no-repeat ml-2"
                style={{ backgroundImage: `url("assets/icons/${getSearchIcon()}")` }}
            />
            <input
                  id="rightSearchArea"
                  type="text"
                  placeholder="Search..."
                  className="grow h-full outline-none bg-fg-white-85 placeholder-fg-black-25 text-lg mx-1"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  onChange={handleInputChange}
                  value={inputValue}
            />
            <input
                  id="rightFilterButton"
                  type="button"
                  className="w-8 h-8 bg-cover bg-no-repeat mr-2"
                  style={{ backgroundImage: `url("assets/icons/filter.svg")` }}
            />
      </form>
    </div>
  );
}