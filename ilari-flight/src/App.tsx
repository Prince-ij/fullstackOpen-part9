import { useEffect, useState } from "react";
import service from "./services";
import type { Diary } from "./types";
import Diaries from "./components/Diaries";
import AddDiary from "./components/AddDiary";

const App = () => {
  const [diaries, setDiaries] = useState<Diary[]>([]);
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDiaries = async () => {
      const result = await service.getDiaries();
      setDiaries(result);
    };
    fetchDiaries();
  }, []);

  return (
    <>
      {error && <p style={{color: 'red'}}>{error.split("Error:")[2]?.trim()}</p>}
      <AddDiary setDiaries={setDiaries} diaries={diaries} setError={setError} />
      <Diaries diaries={diaries} />
    </>
  );
};

export default App;
