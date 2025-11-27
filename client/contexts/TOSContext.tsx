import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface TOSContextType {
  showTOS: boolean;
  acceptTOS: () => void;
  resetTOS: () => void;
}

const TOSContext = createContext<TOSContextType | undefined>(undefined);

export function TOSProvider({ children }: { children: ReactNode }) {
  const [showTOS, setShowTOS] = useState(false);

  // Check on mount if TOS was already accepted in this session
  useEffect(() => {
    const tosAcceptedThisSession = sessionStorage.getItem(
      "tos_accepted_session",
    );
    if (!tosAcceptedThisSession) {
      setShowTOS(true);
    }
  }, []);

  const acceptTOS = () => {
    sessionStorage.setItem("tos_accepted_session", "true");
    setShowTOS(false);
  };

  const resetTOS = () => {
    sessionStorage.removeItem("tos_accepted_session");
    setShowTOS(true);
  };

  return (
    <TOSContext.Provider value={{ showTOS, acceptTOS, resetTOS }}>
      {children}
    </TOSContext.Provider>
  );
}

export function useTOS() {
  const context = useContext(TOSContext);
  if (!context) {
    throw new Error("useTOS must be used within TOSProvider");
  }
  return context;
}
