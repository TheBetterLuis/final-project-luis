import { Footer } from "flowbite-react";
const Test = () => {
  return (
    <div>
      <h1 class="text-[#333] dark:text-[#dddcdc] hover:text-[#878787] dark:hover:text-[#fff]">
        Esto es un componente Prueba
      </h1>
      <Footer container>
        <Footer.Copyright href="#" by="Flowbite™" year={2022} />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">Contact</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
};

export default Test;
