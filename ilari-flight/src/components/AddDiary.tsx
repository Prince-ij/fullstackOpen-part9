import type React from "react";
import { useState } from "react";
import service from "../services";
import { Visibility, Weather, type AddDiaryProps } from "../types";
import axios from "axios";

const AddDiary = ({ setDiaries, diaries, setError }: AddDiaryProps) => {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState("");
  const [weather, setWeather] = useState("");
  const [comment, setComment] = useState("");

  const add = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    try {
      const result = await service.addDiary({
        date,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment,
      });

      setDiaries(diaries.concat(result));
    } catch (err) {
      const msg = axios.isAxiosError(err) ? err.response?.data : err;
      setError(String(msg));
      setTimeout(() => {
        setError(null);
      }, 3000);
    }
    setComment("");
    setDate("");
    setVisibility("");
    setWeather("");
  };

  return (
    <>
      <h1>Add Diary</h1>
      <form onSubmit={add}>
        date{" "}
        <input
          type="date"
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <br />
        <div>
          visibility{" "}
          {["great", "good", "ok", "poor"].map((v) => (
            <label key={v} style={{ marginRight: "1rem" }}>
              <input
                type="radio"
                name="visibility"
                value={v}
                checked={visibility === v}
                onChange={({ target }) => setVisibility(target.value)}
              />
              {v}
            </label>
          ))}
        </div>
        <div>
          weather
          {["stormy", "rainy", "cloudy", "windy", "sunny"].map((w) => (
            <label key={w} style={{ marginRight: "1rem" }}>
              <input
                type="radio"
                value={w}
                name="weather"
                checked={weather === w}
                onChange={({ target }) => setWeather(target.value)}
              />
              {w}
            </label>
          ))}
        </div>
        comment{" "}
        <input
          type="text"
          value={comment}
          onChange={({ target }) => setComment(target.value)}
        />
        <br />
        <button type="submit">add</button>
      </form>
    </>
  );
};

export default AddDiary;
