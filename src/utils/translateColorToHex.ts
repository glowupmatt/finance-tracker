export const translateColorToHex = (color: string) => {
  switch (color) {
    case "GREEN":
      return "#277C78";
    case "YELLOW":
      return "#F2CDAC";
    case "CYAN":
      return "#82C9D7";
    case "NAVY":
      return "#626070";
    case "RED":
      return "#C94736";
    case "PURPLE":
      return "#826CB0";
    case "TURQUOISE":
      return "#597C7C";
    case "BROWN":
      return "#93674F";
    case "MAGENTA":
      return "#934F6F";
    case "BLUE":
      return "#3F82B2";
    case "GREY":
      return "#97A0AC";
    case "ARMY":
      return "#7F9161";
    case "ORANGE":
      return "#CAB361";
    default:
      return "#BE6C49";
  }
};
