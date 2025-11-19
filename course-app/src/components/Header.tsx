import type { JSX } from "react";
import type { HeaderProps } from "./types";


const Header = (props: HeaderProps): JSX.Element => <h1>{props.name}</h1>;

export default Header;
