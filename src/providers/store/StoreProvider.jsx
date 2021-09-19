import React, {createContext, useContext} from "react";

import rootStore from "../../stores/rootStore";

 const StoresContext = createContext(rootStore);

const ContextComponent = ({children}) => {
    
    return (
        <StoresContext.Provider value={rootStore}>
            {children}
        </StoresContext.Provider>
    ) 
}
export const useStore = () => useContext(StoresContext);
export default ContextComponent;