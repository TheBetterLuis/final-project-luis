import { Footer } from "flowbite-react";
import { NavBar } from "../components/NavBar";
import CustomSidebar from "../components/CustomSidebar";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const TestPage = () => {
  const array = [0, 1, 2];
  const [openModal, setOpenModal] = useState([]);
  const handleOpenModal = (index) => {
    setOpenModal((prev) => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const handleCloseModal = (index) => {
    setOpenModal((prev) => {
      const newState = [...prev];
      newState[index] = false;
      return newState;
    });
  };
  return (
    <>
      <NavBar></NavBar>
      <div className="bg-black">
        {array.map((index) => (
          <>
            <Button onClick={() => handleOpenModal(index)}>Toggle modal</Button>
            <Modal
              show={openModal[index]}
              size="md"
              onClose={() => handleCloseModal(index)}
              popup
            >
              <Modal.Header />
              <Modal.Body>
                <div className="text-center">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {`modal ${index}`}
                  </h3>
                  <div className="flex justify-center gap-4">
                    <Button
                      color="failure"
                      onClick={() => handleCloseModal(index)}
                    >
                      {"Yes, I'm sure"}
                    </Button>
                    <Button
                      color="gray"
                      onClick={() => handleCloseModal(index)}
                    >
                      No, cancel
                    </Button>
                  </div>
                </div>
              </Modal.Body>
            </Modal>
          </>
        ))}
      </div>
    </>
  );
};

export default TestPage;
