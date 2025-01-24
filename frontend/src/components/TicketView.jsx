import { Card } from "flowbite-react";
import { FaHeart, FaCommentDots } from "react-icons/fa";

const TicketView = () => {
  /*
    colors: {
      azul1: "#9CFFE5",
      azul2: "#6C9DFF",
      azul3: "#4491A1",
      azul4: "#074572",
      azul5: "#0B2545",
      azul6: "#00171F",
    }
    */

  const textStyles = {
    color:
      "text-white dark:text-white hover:text-black md:hover:text-gray-400 md:dark:hover:text-gray-400",
  };

  return (
    <div className="rounded-lg   mb-4">
      <Card className="max-w-sm bg-white/19 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-gray-200/30 drop-shadow-2xl shadow-2xl">
        <div className="flex gap-3">
          <img
            className="rounded-full border border-azul5 w-20 dark:border-white"
            src="../../public/vite.svg"
            alt="foto de perfil de Juan"
          />
          <span className="text-sm text-gray-700 flex items-center justify-center drop-shadow-md dark:text-white">
            Juan Hernandez
          </span>
        </div>
        <Card className="max-w-sm bg-teal-500  bg-opacity-30 backdrop-blur-2xl backdrop-saturate-90 rounded-lg border border-black drop-shadow-2xl shadow-2xl">
          <form className="flex max-w-md flex-col gap-4 ">
            <div>
              <div className="mb-2 block">
                <span className="text-black flex items-center justify-center drop-shadow-md dark:text-white">
                  Internet lento
                </span>
              </div>
            </div>
            <div class="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs h-32 overflow-y-auto">
              <p class="text-black dark:text-gray-400">
                This is an example of a paragraph element styled with Flowbite.
                You can easily customize the appearance of this paragraph by
                adding utility classes from Tailwind CSS. This is an example of
                a paragraph element styled with Flowbite. You can easily
                customize the appearance of this paragraph by adding utility
                classes from Tailwind CSS. This is an example of a paragraph
                element styled with Flowbite. You can easily customize the
                appearance of this paragraph by adding utility classes from
                Tailwind CSS. This is an example of a paragraph element styled
                with Flowbite. You can easily customize the appearance of this
                paragraph by adding utility classes from Tailwind CSS.
              </p>
            </div>
            <div class="p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-xs w-20 text-center">
              <p class="text-black dark:text-gray-400">26/1/2025</p>
            </div>
            <img
              src="../../public/vite.svg"
              alt="Meaningful alt text for an image that is not purely decorative"
              className="mb-4"
            />
          </form>
        </Card>
        <div className="flex justify-between">
          <FaHeart
            size={26}
            className="dark:text-white hover:text-red-500 dark:hover:text-red-500  cursor-pointer"
          />
          <FaCommentDots
            size={26}
            className="text-white hover:text-black dark:hover:text-gray-400 cursor-pointer"
          />
        </div>
      </Card>
    </div>
  );
};

export default TicketView;
