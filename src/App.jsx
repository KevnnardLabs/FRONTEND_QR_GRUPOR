import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef, useState } from "react";
import axios from "axios";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function App() {

  // const currencies = [
  //   {
  //     value: "Fox Concept Store Plaza central",
  //     label: "Fox Concept Store Plaza central",
  //   },
  //   {
  //     value: "Fox Concept Store Toberin",
  //     label: "Fox Concept Store Toberin",
  //   },
  //   {
  //     value: "Fox Concept Store Online",
  //     label: "Fox Concept Store Online",
  //   },
  //   {
  //     value: "Fox Concept Store Neiva",
  //     label: "Fox Concept Store Neiva",
  //   },
  // ];

  const currencies = [
    {
      value: "REPLAYS NUESTRO BOGOTÁ",
      label: "REPLAYS NUESTRO BOGOTÁ",
    },
    {
      value: "REPLAYS MULTIPLAZA",
      label: "REPLAYS MULTIPLAZA",
    },
    {
      value: "REPLAYS EDEN",
      label: "REPLAYS EDEN",
    },
    {
      value: "REPLAYS VILLA DEL RIO",
      label: "REPLAYS VILLA DEL RIO",
    },
    {
      value: "REPLAYS CALIMA",
      label: "REPLAYS CALIMA",
    },
    {
      value: "REPLAYS AMERICAS 1",
      label: "REPLAYS AMERICAS 1",
    },
    {
      value: "REPLAYS AMERICAS 3",
      label: "REPLAYS AMERICAS 3",
    },
    {
      value: "REPLAYS AMERICAS 5",
      label: "REPLAYS AMERICAS 5",
    },
    {
      value: "REPLAYS AMERICAS 6",
      label: "REPLAYS AMERICAS 6",
    },
    {
      value: "REPLAYS AMERICAS 11 OUTLET",
      label: "REPLAYS AMERICAS 11 OUTLET",
    },
    {
      value: "REPLAYS PLAZA CENTRAL 2",
      label: "REPLAYS PLAZA CENTRAL 2",
    },
    {
      value: "REPLAYS ANTARES",
      label: "REPLAYS ANTARES",
    },
    {
      value: "REPLAYS NEIVA",
      label: "REPLAYS NEIVA",
    },
  ];
  // estados
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [direccion, setDireccion] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [fechaCumple, setFechaCumple] = useState("");
  const [tienda, setTienda] = useState("");
  const [aceptar, setAceptar] = useState(false);

  // Cambio de estado aceptar 
  const handleAceptar = async () => {
    setAceptar(true)
    if(aceptar) {
      setAceptar(false)
    }
  };

  //Enviar datos al servidor y guardarlos
  const handleEnviarFirma = async (e) => {
    e.preventDefault();
    try {
      if([email,nombre,telefono,tienda,aceptar].includes("")) {
        return
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/clienteTerminos`,
          { cedula, nombre, telefono, email, direccion, ciudad, fechaCumple, tienda }
        );
        setEmail("");
        setNombre("");
        setTelefono("");
        setTienda("");
        setAceptar(false);
        handleClick();
        setTimeout(() => {
         window.location.replace("https://replays.com.co");
        }, 3000);
      }
    } catch (error) {
      console.log(error)
    }
  };


  // generar alerta 
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return (
    <div className="App">
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            !Su Firma a sido exitosa!
          </Alert>
        </Snackbar>
      </Stack>
      <div className="contenedor">
        <div className="contenedor__form">
          <form>
            <h1>Tratamientos de datos</h1>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "100%", height: "100%" },
                position: "relative",
              }}
              noValidate
              autoComplete="on"
            >
              <TextField
                label="Cedula"
                required
                type="text"
                variant="outlined"
                id="validation-outlined-input"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
              />
              <TextField
                label="Nombre Completo"
                variant="outlined"
                required
                id="validation-outlined-input"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
              />
              <TextField
                label="Numero Telefono"
                type="number"
                required
                variant="outlined"
                id="validation-outlined-input"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
              <TextField
                label="Correo electronico"
                required
                type="email"
                variant="outlined"
                id="validation-outlined-input"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
              />
              <TextField
                label="Direccion"
                variant="outlined"
                required
                id="validation-outlined-input"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
              <TextField
                label="Ciudad"
                variant="outlined"
                required
                id="validation-outlined-input"
                value={ciudad}
                onChange={(e) => setCiudad(e.target.value)}
              />
              <TextField
                helperText="Fecha Cumpleaños"
                defaultValue={Date.now()}
                variant="outlined"
                required
                type="date"
                id="validation-outlined-input"
                value={fechaCumple}
                onChange={(e) => setFechaCumple(e.target.value)}
              />
              <TextField
                label="Tienda desde donde aceptas"
                select
                required
                focused
                variant="outlined"
                id="validation-outlined-input"
                sx={{ borderColor: "#fff" }}
                value={tienda}
                onChange={(e) => setTienda(e.target.value)}
              >
                {currencies.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <FormGroup>
              <FormControlLabel
                label="Aceptar los terminos y condiciones"
                control={
                  <Checkbox
                    color="success"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                    onClick={handleAceptar}
                  />
                }
              />
            </FormGroup>
            <Stack
              direction="row"
              spacing={1}
              p={2}
              sx={{ justifyContent: "center" }}
            >
              {aceptar === true && (
                <Button
                  variant="contained"
                  color="success"
                  endIcon={<SendIcon />}
                  onClick={handleEnviarFirma}
                >
                  Enviar
                </Button>
              )}
            </Stack>
          </form>
        </div>
        <div className="img">
          <img src="/img/gruporB.png.png" alt="" />
        </div>
        <a
          style={{
            position: "relative",
            display: "flex",
            bottom: "-3rem",
            justifyContent: "center",
            color: "#fff",
            textTransform: "uppercase",
          }}
          href="https://replays.com.co/policies/terms-of-service"
          target="_blank"
        >
          <small>ver terminos y condiciones</small>
        </a>
      </div>
    </div>
  );
}

export default App;
