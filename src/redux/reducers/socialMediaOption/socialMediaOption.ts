const initialState = {
  state: "TWITTER_OPTION",
};

export const SocialMediaOption = (
  state = initialState,
  action: Record<string, any>
) => {
  //console.log(action.type);

  switch (action.type) {
    case "FACEBOOK_OPTION":
      return { state: "FACEBOOK_OPTION" };

    case "TWITTER_OPTION":
      return { state: "TWITTER_OPTION" };

    default:
      return state;
  }
};
