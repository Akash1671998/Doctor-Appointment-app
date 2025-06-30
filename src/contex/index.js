import { createContext, useContext, useMemo, useReducer } from "react";
import PropTypes from "prop-types";

// Create Context MailContex
const ApplicationContex = createContext();
function reducer(state, action) {
    switch (action.type) {
        case "MINI_SIDENAV": {
            return { ...state, miniSidenav: action.value };
        }
        case "SIDENAV": {
            return { ...state, openSideNav: action.value };
        }
        case "ACTIVEUSER": {
            return { ...state, activeUser: action.value };
        }
        case "MESSAGESTATUS": {
            return { ...state, mesagestatus: action.value };
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`);
        }
    }
}

// Contex Provider Function
function Provider({ children }) {
    const initialState = {
        miniSidenav: false,
        openSideNav: true,
        activeUser: [],
        mesagestatus:false,
    };
    const [controller, dispatch] = useReducer(reducer, initialState);
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
    return <ApplicationContex.Provider value={value}>{children}</ApplicationContex.Provider>;
}

function useApplicationContexController() {
    const context = useContext(ApplicationContex);
    if (!context) {
        throw new Error(
            "useMaterialUIController should be used inside the MaterialUIControllerProvider."
        );
    }
    return context;
}

Provider.propTypes = {
    children: PropTypes.node.isRequired,
};

// Context module functions
const setMiniSidenav = (dispatch, value) =>
    dispatch({ type: "MINI_SIDENAV", value });
const setOpenSideNav = (dispatch, value) => {
    dispatch({ type: "SIDENAV", value });
};

const setActiveUser = (dispatch, value) => {
    dispatch({ type: "ACTIVEUSER", value });
};

const setMessageStatus = (dispatch, value) => {
    dispatch({ type: "MESSAGESTATUS", value });
};


export {
    Provider,
    useApplicationContexController,
    setMiniSidenav,
    setOpenSideNav,
    setActiveUser,
    setMessageStatus,
};