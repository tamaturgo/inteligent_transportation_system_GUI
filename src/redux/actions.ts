// actions.ts
export const enableAddArea = () => {
    return {
      type: "ENABLE_ADD_AREA" as const,
    };
  };
  
  export const disableAddArea = () => {
    return {
      type: "DISABLE_ADD_AREA" as const,
    };
  };
  
  export const addArea = (area: { id: number; points: { x: number; y: number }[] }) => {
    return {
      type: "ADD_AREA" as const,
      payload: area,
    };
  };

  export const showInfo = (info: string) => {
    return {
      type: "SHOW_INFO" as const,
      payload: info,
    };
  }
  