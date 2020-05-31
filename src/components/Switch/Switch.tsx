import React, { FC, memo } from "react";
import "./switch.css";

interface SwitchProps {
  checked?: boolean;
  onchange?: (e: any) => void;
}

const Switch: FC<SwitchProps> = ({ checked = true, onchange }) => {
  return (
    <label className="switch">
      <input type="checkbox" checked={!checked} onChange={onchange} />
      <div className="slider round"></div>
    </label>
  );
};

export default memo(Switch);
