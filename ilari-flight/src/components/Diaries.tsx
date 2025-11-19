import type { Diary } from "../types";

const Diaries = ({ diaries }: { diaries: Diary[] }) => {
  return (
    <>
    <h1>Diary Entries</h1>
      {diaries.map((diary) => {
        return (
          <div key={diary.id}>
            <h3>{diary.date}</h3>
            <p>Visibility: {diary.visibility}</p>
            <p>Weather: {diary.weather}</p>
          </div>
        );
      })}
    </>
  );
};

export default Diaries;
