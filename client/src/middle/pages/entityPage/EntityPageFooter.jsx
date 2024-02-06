import React from "react";
import { useDispatch } from "react-redux";
import { setPageState } from "../../../redux/pageState/pageStateActions";

export default function EntityPageFooter({ entityType, entity }) {
    const dispatch = useDispatch();

    function swapPageState(newState) {
        dispatch(setPageState("main", newState));
    }

    return (
        <div className='h-10 bg-fg-white-85 flex items-center justify-between'>
            <button
                className='h-10 aspect-square bg-cover bg-no-repeat ml-2'
                style={{
                    backgroundImage: 'url("/assets/icons/navigateBack.svg")',
                }}
                onClick={() => swapPageState("home")}
            ></button>
            <p className='text-3xl mt-2'>
                {entity?.[`${entityType.slice(0, -1)}_name`]}
            </p>
            <button
                className='h-8 aspect-square bg-cover bg-no-repeat mr-4'
                style={{
                    backgroundImage: 'url("/assets/icons/moreHorizontal.svg")',
                }}
            ></button>
        </div>
    );
}
