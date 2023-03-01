import avatar from "../../images/avatar.png";
import "./SideBar.css";

function SideBar() {
  return (
    <div className='sidebar__info'>
      <img className='sidebar__avatar' src={avatar} alt='avatar' />
      <p className='sidebar__username'>David Miles</p>
    </div>
  );
}

export default SideBar;
