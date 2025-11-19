import Part from "./Part";
import type { ContentProps } from "./types";

const Content = (props: ContentProps) => {
  const courses = props.courses;

  return courses.map(course => <Part {...course} key={course.name}/>)

};

export default Content;
