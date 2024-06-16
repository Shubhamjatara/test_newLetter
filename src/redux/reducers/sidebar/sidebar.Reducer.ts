
export const sidebarToggle = (
  state = false,
  action: Record<string, any>
) => {
  switch (action.type) {
    case "TOGGLE_OPEN":
      return true;

    case "TOGGLE_CLOSE":
      return false;

    default:
      return state;
  }
};
