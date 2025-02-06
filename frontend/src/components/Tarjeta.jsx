import { Card } from "flowbite-react";

export function Tarjeta({ userData }) {
  const defaultUserData = {
    profilePicture: "../../public/img/default-profile-icon.jpg",
    name: "User",
    lastName: "Name",
    role: "free",
  };

  const actualUserData = userData || defaultUserData;

  const roleColor =
    actualUserData.role === "free" ? "text-[#928F74]" : "text-[#aaa035]";

  return (
    <Card className="max-w-sm w-2/3 mb-4">
      <div className="flex flex-col items-center pb-10 w-full">
        <img
          className="mb-3 w-1/3 h-1/3 rounded-full shadow-lg border-2"
          src={actualUserData.profilePicture}
          alt="foto perfil"
        />

        <h5 className="mb-1 text-2xl font-medium text-gray-900 dark:text-white">
          {`${actualUserData.name} ${actualUserData.lastName}`}
        </h5>

        <div className="flex flex-row justify-between w-full">
          <div className="flex flex-col items-center justify-between w-full">
            <h1 className="text-xl text-gray-500 dark:text-gray-300">TICKET</h1>
            <h6 className="text-4xl font-bold text-gray-900 dark:text-white">
              20
            </h6>
          </div>
          <span className={`text-xl font-bold ${roleColor} uppercase`}>
            {actualUserData.role}
          </span>
          <div className="flex flex-col items-center justify-between w-full">
            <h1 className="text-xl text-gray-500 dark:text-white">LIKES</h1>
            <h6 className="text-4xl font-bold text-gray-900 dark:text-white">
              200
            </h6>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default Tarjeta;
