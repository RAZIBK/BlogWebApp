import React from "react";
// import "./App.css";
import SearchBar from "./SearchBar";
import BookData from "./Data.json";

export default function Search() {
  return (
    <div><SearchBar placeholder="Enter a Book Name..." data={BookData} /></div>
  )
}
