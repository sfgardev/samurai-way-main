import { ChangeEvent, Component } from "react";

type ProfileStatusProps = {
  status: string;
  updateStatus: (status: string) => void;
};

type ProfileStatusState = {
  editMode: boolean;
  status: string;
};

class ProfileStatus extends Component<ProfileStatusProps, ProfileStatusState> {
  state: ProfileStatusState = {
    editMode: false,
    status: this.props.status,
  };

  activateEditMode = () => {
    // debugger
    this.setState({ editMode: true });
  };

  deactivateEditMode = () => {
    this.setState({ editMode: false });
    this.props.updateStatus(this.state.status);
  };

  handleStatusChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ status: event.currentTarget.value });
  };

  componentDidUpdate(
    prevProps: Readonly<ProfileStatusProps>,
    prevState: Readonly<ProfileStatusState>
  ): void {
    if (prevProps.status !== this.props.status) {
      this.setState({ status: this.props.status });
    }
    // console.log("componentDidUpdate");
  }

  render() {
    return (
      <div>
        {this.state.editMode && (
          <div>
            <input
              autoFocus
              type="text"
              value={this.state.status}
              onBlur={this.deactivateEditMode}
              onChange={this.handleStatusChange}
            />
          </div>
        )}
        {!this.state.editMode && (
          <div>
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || "---------"}
            </span>
          </div>
        )}
      </div>
    );
  }
}
export default ProfileStatus;
