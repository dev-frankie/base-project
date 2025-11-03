import { type User } from '../../model/types';

export interface UserCardProps {
  user: User;
  onClick?: () => void;
}

export const UserCard = ({ user, onClick }: UserCardProps) => {
  return (
    <div
      onClick={onClick}
      className={`p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow ${
        onClick ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex items-center gap-3">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-semibold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h3 className="font-semibold text-gray-900">{user.name}</h3>
          <p className="text-sm text-gray-600">{user.email}</p>
        </div>
      </div>
    </div>
  );
};

