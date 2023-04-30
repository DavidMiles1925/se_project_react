import "./SideBar.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function SideBar({ handleEditProfile, handleSignOut }) {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    <>
      <div className='sidebar__info'>
        <img
          className='sidebar__avatar'
          src={currentUser.avatar}
          alt='avatar'
        />
        <p className='sidebar__username'>{currentUser.name}</p>
      </div>
      <div className='sidebar__link-container'>
        <button
          className='sidebar__edit-profile sidebar__button'
          type='button'
          onClick={handleEditProfile}
        >
          Edit Profile
        </button>
        <button
          className='sidebar__signout sidebar__button'
          type='button'
          onClick={handleSignOut}
        >
          Log Out
        </button>
      </div>
    </>
  );
}

export default SideBar;
