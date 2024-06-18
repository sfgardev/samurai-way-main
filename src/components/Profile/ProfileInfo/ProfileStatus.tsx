import { Component } from "react";

type ProfileStatusProps = {
  status: string;
};

type ProfileStatusState = {
  editMode: boolean;
};

class ProfileStatus extends Component<ProfileStatusProps, ProfileStatusState> {
  state: ProfileStatusState = {
    editMode: false,
  };

  activateEditMode = () => {
    // debugger
    this.setState({ editMode: true });
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
  };

  render() {
    return (
      <div>
        {this.state.editMode && (
          <div>
            <input
              autoFocus
              onBlur={this.deactivateEditMode}
              type="text"
              value={this.props.status}
            />
          </div>
        )}
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status}
            </span>
          </div>
        )}
      </div>
    );
  }
}
export default ProfileStatus;
