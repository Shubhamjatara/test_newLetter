const initialState = {
  state: "DEFAULT",
};

export const SwitchCredentialsReducer = (
  state = initialState,
  action: Record<string, any>
) => {
  switch (action.type) {
    case "DEFAULT":
      return { state: "DEFAULT" };

    case "AI_MODEL_CREDENTIALS":
      return { state: "AI_MODEL_CREDENTIALS" };

    case "SOCIAL_MEDIA_CREDENTIALS":
      return { state: "SOCIAL_MEDIA_CREDENTIALS" };

      case "AI_PROMPT":
      return { state: "AI_PROMPT" }; 

    default:
      return state;
  }
};
