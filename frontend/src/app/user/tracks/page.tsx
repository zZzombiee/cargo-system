import Profile from "@/components/profile";
import UserTables from "@/components/userTable";

const TracksPage = () => {
  return (
    <div className="flex xl:p-10 max-w-screen md:p-2">
      <div className={`hidden md:flex`}>
        <Profile />
      </div>
      <UserTables />
    </div>
  );
};

export default TracksPage;
