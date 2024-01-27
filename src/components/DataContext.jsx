import { useContext, createContext, useState, useEffect } from "react";
import splitString from "../math/string_parse";
import shuntingYard from "../math/shunting_yard";
import operateRPN from "../math/operate_RPN";

const DataContext = createContext(null);

export function DataContextProvider(props) {
  const [data, setData] = useState([
    {
      line_number: 1,
      input_string: "Basic Math: 4 + 3(4 * 3)",
      output_string: "40",
      selected: false,
    },
    {
      line_number: 2,
      input_string: "Line Reference: Line1 * 2",
      output_string: "80",
      selected: false,
    },
    {
      line_number: 3,
      input_string: "Multiple References: Line2 + Line1",
      output_string: "120",
      selected: false,
    },
  ]);

  // Loads previous data from user storage
  useEffect(() => {
    const storedData = localStorage.getItem("userData");

    if (storedData) {
      let data = JSON.parse(storedData);
      data.forEach((entry) => {
        entry.selected = false;
      });
      updateData(data);
    }
  }, []);

  // Updates local storage
  function updateStorage(newData) {
    localStorage.setItem("userData", JSON.stringify(newData));
  }

  // Updates data state as well as local storage
  function updateData(newData) {
    setData(newData);
    updateStorage(newData);
  }

  function calculateResult(input, line_number) {
    const updatedData = data.slice();

    const results = updatedData.map((entry) => Number(entry.output_string));
    // console.log(input);
    const tokens = splitString(input, results, line_number);
    // console.log(tokens);
    const rpn = shuntingYard().parseInfix(tokens);
    // console.log(rpn);
    const result = operateRPN(rpn);
    // console.log(result);
    const entry = updatedData.find(
      (entry) => entry.line_number === line_number
    );
    entry.input_string = input;
    entry.output_string = result;
    updateData(updatedData);
  }

  function calculateAllResults() {
    const updatedData = data.slice();
    for (let index = 0; index < updatedData.length; index++) {
      const line = updatedData[index];
      calculateResult(line.input_string, index + 1);
    }
  }

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        updateData,
        calculateAllResults,
        calculateResult,
      }}
    >
      {props.children}
    </DataContext.Provider>
  );
}

export const useDataContext = () => useContext(DataContext);
