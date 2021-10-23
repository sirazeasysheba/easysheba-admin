import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const usePasswordToggle = () => {
  const [visible, setVisibility] = useState(false);
  const icon = (
    <FontAwesomeIcon
      icon={visible ? faEyeSlash : faEye}
      onClick={() => setVisibility((visibility) => !visibility)}
    />
  );
  const inputType = visible ? "text" : "password";
  return [icon, inputType];
};

export default usePasswordToggle;
