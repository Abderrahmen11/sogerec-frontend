import { useContext } from "react";
import { InterventionContext } from "../context/InterventionContext";

export default function useInterventions() {
  const context = useContext(InterventionContext);
  if (!context) {
    throw new Error(
      "useInterventions must be used within InterventionProvider"
    );
  }
  return context;
}
