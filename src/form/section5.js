// Librerias
import React from 'react';
import { useFormContext } from 'react-hook-form' 

// Layout
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Elementos
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';



function DeclaracionAutorizacionFirma() {

  // Funcion utilizada para conectar con el contexto principal del formulario
  const register = useFormContext().register;    

  return (
      
      <div>
        <h3 className="mb-3 mt-5">5. Declaración, Autorización y Firma</h3>      
                              
            <Row className="mb-3 mt-4 text-center">{/*Nombres, apellidos, Ciudad y Telefono */}
              <Col>
                <Row>            
                  <Alert className="caja_firma" variant='secondary'></Alert>
                </Row>
                <Row>            
                  <span><strong>Firma solicitante</strong></span>
                </Row>
                <Row>            
                  <span><strong>C.C</strong></span>
                </Row>
              </Col>
              <Col>
                <Row>            
                  <span className = "text-justify">
                    " Declaro bajo la gravedad del juramento que la información registrada en éste documento es cierta así como las condiciones exigidas por el Fondo de Bienestar Social Contraloría General de la República FBSCGR con los parámetros de pago, facultando al FBSCGR para revocar la adjudicación si se llegare a comprobar falsedad. <strong>Autorizo el uso y tratamiento de mis datos personales de conformidad con lo establecido en la ley 1581 de 2012 y las demás dispocisiones que la desarrollen </strong> "
                  </span>
                </Row>
              </Col>
            </Row>                   
  
      </div>                      
    
  );
}

export default DeclaracionAutorizacionFirma;