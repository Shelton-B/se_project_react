import "./Sidebar.css";
import avatar from "../../../images/avatar1.png";

function Sidebar() {
  return (
    <div className="sidebar">
      <img className="sidebar__avatar" src={avatar} alt="Shelton Brockett" />
      <p className="sidebar__username">Shelton Brockett</p>
    </div>
  );
}

export default Sidebar;
