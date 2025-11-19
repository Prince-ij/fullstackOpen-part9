import type { CoursePart } from "./types";

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = (props: CoursePart) => {
  switch (props.kind) {
    case "basic":
      return <>
      <h3>{props.name} {props.exerciseCount}</h3>
      <p>{props.description}</p>
      </>
    case "group":
       return (
         <>
           <h3>
             {props.name} {props.exerciseCount}
           </h3>
           <p>project exercises {props.groupProjectCount}</p>
         </>
       );
    case "background":
       return (
         <>
           <h3>
             {props.name} {props.exerciseCount}
           </h3>
           <p>{props.description}</p>
           <p>{props.backgroundMaterial}</p>
         </>
       );
       case "special":
       return (
         <>
           <h3>
             {props.name} {props.exerciseCount}
           </h3>
           <p>{props.description}</p>
           <p>requirements: {props.requirements.join(', ')}</p>
         </>
       );
    default:
      assertNever(props);
      break;
  }
};

export default Part;
