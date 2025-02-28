import { Card } from "flowbite-react";

import { useNavigate } from "react-router-dom";
export function Tarjeta({
  userData,
  showRole = false,
  profilePictureLink = false,
}) {
  const defaultUserData = {
    profilePicture: "../../public/img/default-profile-icon.jpg",
    name: "User",
    lastName: "Name",
    role: "free",
    postCount: "0",
    totalLikes: "0",
  };

  const actualUserData = userData || defaultUserData;

  const navigate = useNavigate();

  const roleColor =
    actualUserData.role === "free" ? "text-[#928F74]" : "text-[#aaa035]";

  return (
    <Card className="max-w-sm w-2/3 mb-4">
      <div className="flex flex-col items-center pb-10 w-full">
        {profilePictureLink && (
          <img
            className="mb-3 w-1/3 h-1/3 rounded-full shadow-lg border-2 cursor-pointer"
            src={actualUserData.profilePicture}
            alt="foto perfil"
            onClick={() => {
              navigate("/profilepicture");
            }}
          />
        )}

        {!profilePictureLink && (
          <img
            className="mb-3 w-1/3 h-1/3 rounded-full shadow-lg border-2 "
            src={actualUserData.profilePicture}
            alt="foto perfil"
          />
        )}

        <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
          {`${actualUserData.name} ${actualUserData.lastName}`}
        </h5>

        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col items-center justify-between w-full">
            <h1 className="text-md text-gray-500 dark:text-gray-300">TICKET</h1>
            {actualUserData.postCount > 0 && (
              <h6 className="text-4xl font-bold text-gray-900 dark:text-white">
                {`${actualUserData.postCount}`}
              </h6>
            )}
          </div>
          {showRole && (
            <span className={`text-md font-bold ${roleColor} uppercase`}>
              {actualUserData.role}
            </span>
          )}

          <div className="flex flex-col items-center justify-between w-full">
            <h1 className="text-md text-gray-500 dark:text-white">LIKES</h1>
            {actualUserData.totalLikes > 0 && (
              <h6 className="text-4xl font-bold text-gray-900 dark:text-white">
                {`${actualUserData.totalLikes}`}
              </h6>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Tarjeta;
