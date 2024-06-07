import {
  Box,
  Divider,
  Image,
  Text,
  Button,
  Input,
  Icon,
  Select,
  FormControl,
  FormLabel,
  IconButton,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import logo from "../assets/mobility_ado.png";
import { ChevronDownIcon, DeleteIcon, ViewIcon } from "@chakra-ui/icons";
import moment from "moment";
import { useState, useEffect, useCallback } from "react";
import "moment/locale/es-mx";
import categorias from "../data/Categorias";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td, chakra } from "@chakra-ui/react";
import { Worker } from "@react-pdf-viewer/core";
import { Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import "@react-pdf-viewer/core/lib/styles/index.css";
import fileDoc from "../assets/Documento1.pdf";
import { Pagination } from "react-rainbow-components";

import { useDropzone } from "react-dropzone";

const PageDashboardPDF = () => {
  const [fecha, setFecha] = useState("");
  const [hora, setHora] = useState("");
  const [dataFiles, setDataFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [files, setFiles] = useState([]);

  const [selectCategoria, setselectCategoria] = useState("");
  // const [fileUrl, setFile] = useState("");

  const [selectedCategory, setSelectedCategory] = useState(0);

  const [isCreateNewFile, setisCreateNewFile] = useState(false);

  // const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const onDrop = useCallback((acceptedFiles) => {
    const previews = acceptedFiles.map((file) => ({
      name: file.name,
      preview: file.type.startsWith("image/")
        ? URL.createObjectURL(file)
        : logo,
    }));

    setFilePreviews((prevPreviews) => [...prevPreviews, ...previews]);
    setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleRemovePreview = (index) => {
    const updatedPreviews = [...filePreviews];
    const updatefiles = [...files];
    updatedPreviews.splice(index, 1);
    updatefiles.splice(index, 1);
    setFilePreviews(updatedPreviews);
    setFiles(updatefiles);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const dataToShow = dataFiles.slice(startIndex, endIndex);

  const handleClickNewDocument = () => {
    //Registro de un documento a la BD
  };

  useEffect(() => {
    // setFile(categorias[0].files.url);
    setDataFiles(categorias[0].files);

    const obtenerFechaYHora = () => {
      const currentDate = getSpanishDate();
      const currentTime = moment().format("LTS");
      setFecha(currentDate);
      setHora(currentTime);
    };

    obtenerFechaYHora();
    const intervalo = setInterval(obtenerFechaYHora, 1000);
    return () => clearInterval(intervalo);
  }, []);

  const getSpanishDate = () => {
    const dia = moment().format("D");
    const mes = getSpanishMonthName(moment().format("MMMM"));
    const año = moment().format("YYYY");
    return `${dia} de ${mes} del ${año}`;
  };

  const getSpanishMonthName = (nombreMesIngles) => {
    const nombresMesesEnEspanol = {
      January: "enero",
      February: "febrero",
      March: "marzo",
      April: "abril",
      May: "mayo",
      June: "junio",
      July: "julio",
      August: "agosto",
      September: "septiembre",
      October: "octubre",
      November: "noviembre",
      December: "diciembre",
    };
    return nombresMesesEnEspanol[nombreMesIngles];
  };

  const handleClickChangeBoxView = (value, categoria) => {
    setSelectedCategory(value);
    setDataFiles(categoria.files);
  };

  const handleclicViewPreDoc = (file) => {
    console.log(file);
    // setFile(file.url);
  };

  //   const navigate = useNavigate();
  //   const handleclicDeleteSesion = () => {
  //     window.localStorage.removeItem("userToken");
  //     return navigate("/");
  //   };

  const CustomTh = chakra(Th, {
    baseStyle: {
      color: "red.500",
    },
  });

  const CustomTr = chakra(Tr, {
    baseStyle: {
      _hover: {
        bg: "gray.200",
      },
    },
  });
  return (
    <Box w="100%" h="100vh" display="flex" flexDir="column">
      <Box
        w="100%"
        h="10%"
        bgGradient="linear(to-l, #501382, purple.700)"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        boxShadow="md"
      >
        <Box display="flex" alignItems="center" px={4} gap={2}>
          <Box
            w="80px"
            h="60px"
            bg="white"
            borderRadius="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Image src={logo} w="70px" h="60px" />
          </Box>
          <Box>
            <Text fontWeight="500" color="white">
              {fecha}
            </Text>
            <Text fontSize="14px" color="white">
              {hora}
            </Text>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" alignItems="center" p={3}>
          <Menu zIndex={2}>
            <MenuButton as={Button} size="sm" rightIcon={<ChevronDownIcon />}>
              <Text fontWeight="400">Alejandro Cruz</Text>
            </MenuButton>
            <MenuList>
              <MenuItem icon={<MdLogout />}>Cerrar sesión</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>
      <Box w="100%" h="90%" display="flex">
        <Box w="20%" h="100%" borderRight="1px" borderColor="gray.300" p={3}>
          <Text color="red.500" fontWeight="bold" fontSize="22px">
            Lista de categorias
          </Text>
          <Divider my={3} />
          {categorias.map((categoria, index) => (
            <Box
              key={index}
              w="100%"
              p={3}
              my={3}
              onClick={() => handleClickChangeBoxView(index, categoria)}
              bgGradient={
                selectedCategory === index
                  ? "linear(to-l, red.200, red.200)"
                  : "white"
              }
              boxShadow={selectedCategory === index ? "md" : "none"}
              display="flex"
              justifyContent="space-between"
              borderRadius="sm"
            >
              <Text fontWeight={selectedCategory === index ? "500" : "400"}>
                {categoria.Nombre}
              </Text>
              <Text fontWeight="200">{categoria.files.length}</Text>
            </Box>
          ))}
        </Box>
        <Box w="80%" h="100%" display="flex">
          <Box w="70%" h="100%" p={3}>
            <Box display="flex" w="70%" gap={3}>
              <Input
                focusBorderColor="red.300"
                borderColor="red.200"
                _placeholder={{ opacity: 1, color: "red.200" }}
                placeholder="Buscar por nombre"
              />
              <Button
                colorScheme="red"
                fontSize="14px"
                onClick={() => setisCreateNewFile(true)}
              >
                + Agregar PDF
              </Button>

              <Modal isOpen={isCreateNewFile} onClose={isCreateNewFile}>
                <ModalOverlay />
                <ModalContent>
                  <ModalHeader color="red">+ Nuevo documento</ModalHeader>
                  <ModalCloseButton onClick={() => setisCreateNewFile(false)} />
                  <ModalBody display="flex" flexDir="column" gap={4}>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Categoria</FormLabel>
                        <Select
                          placeholder="selecciona una categoria"
                          value={selectCategoria}
                          onChange={(e) => setselectCategoria(e.target.value)}
                        >
                          {categorias.map((categoria) => (
                            <option key={categoria.id} value={categoria.id}>
                              {categoria.Nombre}
                            </option>
                          ))}
                        </Select>
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Archivo</FormLabel>
                        <Box
                          {...getRootProps()}
                          bg="gray.100"
                          p="10"
                          border="2px"
                          borderColor="gray.300"
                          borderStyle="dashed"
                        >
                          <Input {...getInputProps()} />
                          {isDragActive ? (
                            <Text fontWeight="300">
                              Arrastra el archivo aqui...
                            </Text>
                          ) : (
                            <Text fontWeight="300">
                              Arrastre y suelte el archivo o haga clic para
                              seleccionarlo.
                            </Text>
                          )}
                        </Box>
                        {filePreviews.map((preview, index) => (
                          <Box
                            mt={4}
                            key={index}
                            w="auto"
                            h="auto"
                            display="flex"
                            flexDir="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <IconButton
                              bg="white"
                              icon={
                                <DeleteIcon
                                  color="gray.500"
                                  h="20px"
                                  w="20px"
                                />
                              }
                              h="auto"
                              w="auto"
                              borderRadius="full"
                              onClick={() => handleRemovePreview(index)}
                            />
                            {preview.preview !== logo ? ( // Comprueba si la previsualización es diferente del logo
                              <Image
                                src={preview.preview}
                                alt={preview.name}
                                width="100"
                                height="100"
                              />
                            ) : (
                              <Image
                                src={preview.preview}
                                alt="Documento"
                                width="100"
                                height="100"
                              />
                            )}
                            <Text maxW="100px" isTruncated>
                              {preview.name}
                            </Text>
                          </Box>
                        ))}
                      </FormControl>
                    </Box>
                  </ModalBody>
                  <ModalFooter>
                    <Button
                      colorScheme="gray"
                      mr={3}
                      onClick={() => setisCreateNewFile(false)}
                    >
                      Cancelar
                    </Button>
                    <Button colorScheme="red" onClick={handleClickNewDocument}>
                      Guardar
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            </Box>
            <Box w="100%" mt={8}>
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <CustomTh>Nombre</CustomTh>
                    <CustomTh>Creación</CustomTh>
                    <CustomTh>Ultima visualización</CustomTh>
                    <CustomTh>Tamaño</CustomTh>
                    <CustomTh>Acciones</CustomTh>
                  </Tr>
                </Thead>
                <Tbody>
                  {dataToShow.map((file, index) => (
                    <CustomTr
                      key={index}
                      onClick={() => handleclicViewPreDoc(file)}
                    >
                      <Td color="gray.600" fontSize="13px">
                        {file.name}
                      </Td>
                      <Td color="gray.600" fontSize="13px">
                        {file.creation}
                      </Td>
                      <Td color="gray.600" fontSize="13px">
                        {file.lastViewed}
                      </Td>
                      <Td color="gray.600" fontSize="13px">
                        {file.size}
                      </Td>
                      <Td display="flex" gap="2">
                        <Icon
                          as={ViewIcon}
                          cursor="pointer"
                          _hover={{ color: "red" }}
                        ></Icon>
                        <Icon
                          as={DeleteIcon}
                          cursor="pointer"
                          _hover={{ color: "red" }}
                        ></Icon>
                      </Td>
                    </CustomTr>
                  ))}
                </Tbody>
              </Table>
              <Box display="flex" justifyContent="flex-end" mt={3}>
                <Pagination
                  pages={Math.ceil(dataFiles.length / itemsPerPage)}
                  activePage={currentPage}
                  onChange={handlePageChange}
                />
              </Box>
            </Box>
          </Box>
          <Box
            w="30%"
            h="100%"
            border="1px"
            borderColor="gray.300"
            overflow="auto"
            zIndex={0}
          >
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
              <Viewer
                fileUrl={fileDoc}
                // plugins={[defaultLayoutPluginInstance]}
                defaultScale={SpecialZoomLevel.PageWidth}
              />
            </Worker>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default PageDashboardPDF;
