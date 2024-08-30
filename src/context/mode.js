import React, { createContext, useCallback, useEffect } from "react";
export const ModeContext = createContext();
export const ModeProvider = React.memo(({ children }) => {
  const [mode, setMode] = React.useState(false);
  const changeMode = useCallback(() => {
    setMode(mode === "true" ? "false" : "true");
    localStorage.setItem("mode", mode === "true" ? "false" : "true");
  }, [mode]);
  useEffect(() => {
    const modeValue = localStorage.getItem("mode");
    if (modeValue === null) {
      setMode(false);
      localStorage.setItem("mode", false);
      return;
    }
    setMode(modeValue);
  }, []);
  return (
    <ModeContext.Provider value={{ mode, changeMode }}>
      {children}
    </ModeContext.Provider>
  );
});
