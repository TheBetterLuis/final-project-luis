import { Footer } from "flowbite-react";

const PageFooter = () => {
  const textStyles = {
    color:
      "text-white dark:text-white hover:text-gray-400 md:dark:hover:text-gray-400",
  };

  return (
    <Footer className="bg-azul6 " container>
      <img
        src="../../public/img/logo2.png"
        className="mr-3 h-6 sm:h-9"
        alt=""
      />
      <Footer.Copyright
        href="#"
        by="L&E copyright"
        year={new Date().getFullYear()}
        className={`${textStyles.color}`}
      />
    </Footer>
  );
};

export default PageFooter;
