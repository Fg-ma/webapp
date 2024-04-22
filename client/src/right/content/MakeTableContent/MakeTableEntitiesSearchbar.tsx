import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { setFilterValue } from "@redux/filters/filterActions";

export default function MakeTableEntitiesSearchbar() {
  const dispatch = useDispatch();
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleRightSearchBarSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(setFilterValue("makeTable", inputValue));
  };

  return (
    <form
      className="h-10 bg-white rounded-md overflow-clip flex items-center border border-fg-white-85 mt-2"
      style={{ width: "90%" }}
      onSubmit={handleRightSearchBarSubmit}
    >
      <button
        key="searchArrow"
        type="submit"
        value=""
        className="w-6 h-6 bg-cover bg-no-repeat ml-2 cursor-pointer"
        style={{
          backgroundImage:
            isInputFocused || inputValue.trim() !== ""
              ? 'url("assets/icons/searchArrow.svg")'
              : 'url("assets/icons/search.svg")',
        }}
      />
      <input
        type="text"
        placeholder="Search..."
        className="grow h-full outline-none bg-white placeholder-fg-black-25 text-lg mx-1 mt-0.5"
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChange={handleInputChange}
        value={inputValue}
      />
    </form>
  );
}
