import { Drawer } from "flowbite-react";
import Boton from "./Button";
import { useState } from "react";

function SideBar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleClose = () => setIsOpen(false);
  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <button onClick={() => setIsOpen(true)}>Show navigation</button>
      </div>
  <Drawer className="bg-white/30" open={isOpen} onClose={handleClose}>
<Drawer.Header className="" title="MENU" titleIcon={() => <></>} />
<Drawer.Items>
  <div className="grid place-items-center gap-9">
    <Boton/>
    <Boton/>
    <Boton/>
  </div>
</Drawer.Items>
</Drawer>
    </>

  );
}

export default SideBar;