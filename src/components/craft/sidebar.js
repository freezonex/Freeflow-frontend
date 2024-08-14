import { ReactNode } from 'react';

const Sidebar = ({ children }) => {
  return (
    <div className="w-[25%] min-h-full bg-white rounded-md p-4">{children}</div>
  );
};

export default Sidebar;
