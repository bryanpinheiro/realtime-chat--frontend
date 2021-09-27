import "./Button.css";

interface ButtonProps {
    title: string,
    handleClick(): void;
}

export default function Button(props: ButtonProps) {
  return (
    <button className={"btn mt-20"} onClick={props.handleClick}>
      {props.title}
    </button>
  );
}
