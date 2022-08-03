import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
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
  // estados
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [cedula, setCedula] = useState("");
  const [telefono, setTelefono] = useState("");
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
      if([email,nombre, cedula,telefono,tienda,aceptar].includes("")) {
        return
      } else {
        const { data } = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/clienteTerminos`,
          { email, nombre, cedula, telefono, tienda, aceptar }
        );
        setEmail("");
        setNombre("");
        setCedula("");
        setTelefono("");
        setTienda("");
        setAceptar(false);
        handleClick();
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
        <div className="contenedor__img">
          <img src="/img/logo_blanco.png" alt="Fox Racing Colombia" />
        </div>
        <div className="contenedor__form">
          <form action="">
            <h1>Tratamientos de datos</h1>
            <Box
              sx={{
                "& > :not(style)": { m: 1, width: "100%" },
                position: "relative",
              }}
              noValidate
              autoComplete="on"
            >
              <TextField
                label="Correo electronico"
                required
                type="email"
                variant="outlined"
                id="validation-outlined-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                label="Cedula"
                type="number"
                required
                variant="outlined"
                id="validation-outlined-input"
                value={cedula}
                onChange={(e) => setCedula(e.target.value)}
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
                label="Tienda desde donde aceptas"
                required
                variant="outlined"
                id="validation-outlined-input"
                sx={{ borderColor: "#fff" }}
                value={tienda}
                onChange={(e) => setTienda(e.target.value)}
              />
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
              <a
                style={{
                  position: "absolute",
                  bottom: "1rem",
                  right: 0,
                  left: 0,
                  color: "#fff",
                  textAlign: "center",
                }}
                href="https://www.foxracing.com.co/policies/terms-of-service"
                target="_blank"
              >
                <small>ver terminos y condiciones</small>
              </a>
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
                  Send
                </Button>
              )}
            </Stack>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
