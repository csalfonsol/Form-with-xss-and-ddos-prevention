// Librerias
import React from 'react';

// Layout
import Container from 'react-bootstrap/Container';

// Elementos


// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';




class Test extends React.Component  {

  // Variable para determinar linea de credito (Vivienda, Vehiculo, Bienestar o calamidad)
  //const [linea, setLinea] = useState('vehicuo');  
  handleClick(e) {
    e.preventDefault();
    // console.log('The link was clicked.');
    alert('hello');
  }

  // console.log(watch("nombres")); // Se puede usar watch para ver el valor del item pasado por parametro
  render() {
    return (    

      <Container fluid>

        <button onClick={this.handleClick}>Hi</button>

        <h2 className="text-center mb-5">SOLICITUD DE CRÉDITO</h2> {/*Encabezado del formulario*/}    

      </Container>
    );
  }
}

export default Test;