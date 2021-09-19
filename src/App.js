import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import axios from "axios";
import CardContainer from "./components/CardContainer";
import "./App.css";

function App({ children }) {
  const [schemesList, setSchemesList] = useState([]);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    const getSchemesList = async () => {
      setloading(true);
      const res = await axios(
        "https://clarityapi.intelligo.ai/api/v1/schemas/list"
      );
      // console.log(`res1`, res.data.result);
      setSchemesList(res.data.result.schemasList);
      setloading(false);
    };

    getSchemesList();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {loading ? (
          <img src={logo} className="App-logo" alt="logo" />
        ) : (
          <CardContainer schemesList={schemesList} />
          // <ul>{schemesList}</ul>
        )}
      </header>
    </div>
  );
}

export default App;
