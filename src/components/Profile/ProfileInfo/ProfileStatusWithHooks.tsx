import { ChangeEvent, Component, useEffect, useState } from "react";

type ProfileStatusProps = {
  status: string;
  updateStatus: (status: string) => void;
};

type ProfileStatusState = {
  editMode: boolean;
  status: string;
};

const ProfileStatusWithHooks = (props: ProfileStatusProps) => {
  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState(props.status);

  useEffect(() => {
    setStatus(props.status);
  }, [props.status]);

  const activateEditMode = () => {
    setEditMode(true);
  };

  const deActivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status);
  };

  const handleChangeStatus = (event: ChangeEvent<HTMLInputElement>) => {
    setStatus(event.currentTarget.value);
  };

  return (
    <div>
      {editMode && (
        <div>
          <input
            autoFocus
            type="text"
            value={status}
            onBlur={deActivateEditMode}
            onChange={handleChangeStatus}
          />
        </div>
      )}
      {!editMode && (
        <div>
          <span onDoubleClick={activateEditMode}>
            {props.status || "---------"}
          </span>
        </div>
      )}
    </div>
  );
};
export default ProfileStatusWithHooks;
