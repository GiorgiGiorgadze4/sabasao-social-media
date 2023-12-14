import React from 'react';
import { IUser } from '../../interfaces/user';

const RightSidebar: React.FC<{ friends: IUser[] }> = ({ friends }) => {
  return (
    <aside className="right-sidebar">
      {/* Friend list or other content */}
      <ul>
        {friends.map((friend, index) => (
          <li key={index}>{friend.firstName} {friend.lastName}</li>
        ))}
      </ul>
    </aside>
  );
};

export default RightSidebar;
