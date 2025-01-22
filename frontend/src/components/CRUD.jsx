import { Table, Button } from "flowbite-react";
function CRUD() {
  return (
    <div className="w-full h-screen overflow-x-auto">
      <Table className="drop-shadow-md">
        <Table.Head>
          <Table.HeadCell className="bg-white/30  dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
            Nombre
          </Table.HeadCell>
          <Table.HeadCell className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
            Correo
          </Table.HeadCell>
          <Table.HeadCell className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70 dark:text-white">
            Opciones
          </Table.HeadCell>
        </Table.Head>

        <Table.Body className="divide-y bg-white/19">
          <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
              {"Jhon Doe"}
            </Table.Cell>
            <Table.Cell>JhonDoe@gmail.com</Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button className="bg-azul2">Editar</Button>
                <Button className="bg-red-500">Eliminar</Button>
                <Button className="bg-yellow-400">Dar admin</Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
              {"Elon Musk"}
            </Table.Cell>
            <Table.Cell>ElonMusk@gmail.com</Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button className="bg-azul2">Editar</Button>
                <Button className="bg-red-500">Eliminar</Button>
                <Button className="bg-yellow-400">Dar admin</Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
          <Table.Row className="bg-white/30 dark:border-gray-700 dark:bg-gray-800/70">
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-gray-200">
              {"Steve Jobs"}
            </Table.Cell>
            <Table.Cell>SteveJobs@gmail.com</Table.Cell>
            <Table.Cell>
              <Button.Group>
                <Button className="bg-azul2">Editar</Button>
                <Button className="bg-red-500">Eliminar</Button>
                <Button className="bg-yellow-400">Dar admin</Button>
              </Button.Group>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
}
export default CRUD;
