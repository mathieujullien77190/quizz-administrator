import Main from "./components/Main";
import { GlobalStyle } from "./GlobalStyle";
import { useCursorBubbles } from "@/hooks/useCursorBubbles";

export const App = () => {
  useCursorBubbles();
  return (
    <>
      <GlobalStyle />
      <Main />
    </>
  );
};
