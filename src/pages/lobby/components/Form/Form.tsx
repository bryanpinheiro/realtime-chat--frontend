import "./Form.css";
import useFormUILogic from "./FormUILogic";
import Button from "../../../shared-components/Button/Button";

export default function Form() {

  const { functions } = useFormUILogic();

  return (
    <div className="outerContainer">
      <div className="innerContainer">
        <h1 className="heading">Join</h1>
        <div className="twoColumns">
          <div>
            <input
              maxLength={10}
              placeholder="First Name"
              className="joinInput"
              type="text"
              onChange={functions.onChangeFirstName}
            />
          </div>
          <div>
            <input
              maxLength={10}
              placeholder="Last Name"
              className="joinInput"
              type="text"
              onChange={functions.onChangeLastName}
            />
          </div>
        </div>
        <Button title="enter" handleClick={functions.onSubmit} />
      </div>
    </div>
  );
}
