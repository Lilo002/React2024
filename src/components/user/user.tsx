import { UserOnStore } from '../../types';
import React from 'react';

interface UserItemProps {
  data: UserOnStore;
}

export const UserItem: React.FC<UserItemProps> = ({
  data: { age, name, country, email, gender, password, photo },
}) => {
  return (
    <div className="user">
      <div className="user-field user-img">
        <img
          className="user-img"
          src={`data:image/jpeg;base64,${photo}`}
          alt={name}
        />
      </div>

      <div className="user-field">
        <div className="user-input">
          <span className="user-description">Name:</span>
          <span className="user-text">{name}</span>
        </div>
      </div>

      <div className="user-field">
        <div className="user-input">
          <span className="user-description">Age:</span>
          <span className="user-text">{age}</span>
        </div>
      </div>

      <div className="user-field">
        <div className="user-input">
          <span className="user-description">Email:</span>
          <span className="user-text">{email}</span>
        </div>
      </div>

      <div className="user-field">
        <div className="user-input">
          <span className="user-description">Password:</span>
          <span className="user-text">{password}</span>
        </div>
      </div>

      <div className="user-field">
        <div className="user-input">
          <span className="user-description">Gender:</span>
          <span className="user-text">{gender}</span>
        </div>
      </div>

      <div className="user-field">
        <div className="user-input">
          <span className="user-description">Country:</span>
          <span className="user-text">{country}</span>
        </div>
      </div>
    </div>
  );
};
