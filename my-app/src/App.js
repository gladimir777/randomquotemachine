import React from "react";
import axios from "axios";
import "./App.css";
const url = "https://api.quotable.io/random";

const Quote = ({ randomNumber, background }) => {
  const quoteReducer = (state, action) => {
    switch (action.type) {
      case "quote_init":
        return { ...state, isLoading: true };
      case "quote_success":
        return { ...state, isLoading: false, data: action.payload };
      case "quote_fail":
        return { ...state, isLoading: false, data: [], isError: true };
      default:
        throw new Error();
    }
  };
  // State managing with useReducer hook
  const [state, dispatch] = React.useReducer(quoteReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  // Fetch with useCallback hooks
  const fecthQuote = React.useCallback(async () => {
    try {
      dispatch({ type: "quote_init" });
      const result = await axios.get(url);
      dispatch({ type: "quote_success", payload: result.data });
      console.log(result);
    } catch (e) {
      dispatch({ type: "quote_fail", payload: e });
    }
  }, []);

  React.useEffect(() => {
    fecthQuote();
    // eslint-disable-next-lin
  }, []);

  const handleNewQuote = () => {
    fecthQuote();
    randomNumber();
  };
  const title = state.data.length > 0 ? state.data.content : "";
  const author = state.data.length > 0 ? state.data.author : "";
  return (
    <div id="quote-wraper">
      <div>
        {state.isLoading ? (
          <span style={{ color: background.color }}>...</span>
        ) : (
          <p style={{ color: background.color }} id="text">
            {title}
          </p>
        )}
      </div>

      <div className="author-container">
        <span style={{ color: background.color }}>Author: </span>
        {state.isLoading ? (
          <span style={{ color: background.color }}>...</span>
        ) : (
          <span style={{ color: background.color }} id="author">
            {" "}
            {author}
          </span>
        )}
      </div>
      <div className="btn-container">
        <a
          style={{
            backgroundColor: background.color,
            borderColor: background.color,
          }}
          href="#"
          id="new-quote"
          onClick={handleNewQuote}
        >
          New Quote
        </a>
        <a
          style={{
            backgroundColor: background.color,
            borderColor: background.color,
          }}
          href="twitter.com/intent/tweet"
          id="tweet-quote"
          target="_blank"
        >
          Tweet Quote
        </a>
      </div>
    </div>
  );
};

const QuoteBox = ({ randomNumber, background }) => {
  return (
    <div id="quote-box">
      <Quote randomNumber={randomNumber} background={background} />
    </div>
  );
};

const App = () => {
  const [background, setBackground] = React.useState({ color: "" });
  const colors = [
    "#99b898",
    "#feceab",
    "#ff847c",
    "#e84a5f",
    "#8fcfd1",
    "#df5e88",
    "#f6ab6c",
    "#3f4441",
  ];

  const randomNumber = () => {
    const index = Math.floor(Math.random() * colors.length);
    const color = colors[index];
    setBackground({ ...background, color: color });
    return index;
  };
  React.useEffect(() => {
    const i = randomNumber();
    console.log(i);
    const color = colors[i];
    setBackground({ ...background, color: color });
    // eslint-disable-next-lin
  }, []);
  return (
    <div className="app-container" style={{ background: background.color }}>
      <QuoteBox randomNumber={randomNumber} background={background} />
    </div>
  );
};

export default App;
