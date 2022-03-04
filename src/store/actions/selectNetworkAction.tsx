export const selectNetwork = (actionType:any, network:any) => {
  return {
    type: actionType,
    payload: network,
  };
};

