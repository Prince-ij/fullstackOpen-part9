export enum Weather {
  Sunny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Stormy = "stormy",
  Windy = "windy",
}

export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export interface Diary {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment?: string;
}

export type NewDiary = Omit<Diary, 'id'>

export type AddDiaryProps = {
  setDiaries: React.Dispatch<React.SetStateAction<Diary[]>>;
  diaries: Diary[];
  setError: React.Dispatch<React.SetStateAction<string | null>>;
};
