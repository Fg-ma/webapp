const leftNav = "leftNav";
const rightNav = "rightNav";

export default function reducer(state = { leftNav: { leftPage: "individuals" }, rightNav: { rightPage: "news" } }, action) {
    switch (action.type) {
        case leftNav:
            return {
                ...state,
                leftNav: {
                    leftPage: action.payload.leftPage,
                }
            };
        case rightNav:
            return {
                ...state,
                rightNav: {
                    rightPage: action.payload.rightPage,
                }
            };
        default:
            return state;
    }
}