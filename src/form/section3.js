// Librerias
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form'; 
import es from 'date-fns/locale/es';
import axios from 'axios';

// Layout
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Elementos
import InputGroup from 'react-bootstrap/InputGroup';
import DatePicker from "react-datepicker";

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';


// URL del servidor para solicitar listado de cargo y grado
const URL_cargos = 'http://3.80.200.194/ords/snw_fonviv/lista/cargo_grado'


const InformacionLaboralFuncionario = props => {

  // Funcion utilizada para conectar con el contexto principal del formulario
  const register = useFormContext().register;    

  // Variables hook temporales para manejo de eventos (NO son las que se envian como callback al componente padre Main)  
  const [cargos, setCargos] = useState();


  // Se llama la función (Callback) del componente padre (Main)
  function cambiarFechaIngreso(fecha) { props.cambiarFechaIngreso(fecha); }


  // Se llama la función (Callback) del componente padre (Main)
  const recalcularMontoMaximo = () => { props.recalcularMontoMaximo() }


  // Se ejecuta cada vez que se renderiza este componente
  useEffect(() => {   

    // Se carga la lista de cargo y grado
    async function obtenerCargos() {
       try {
         let response = await axios.get(URL_cargos)
         let data = response.data.items
         let result = []
         
         // Opcion por defecto
         result.push(<option value={'0'} key={0}>Seleccione una Opción</option>)

         for (let index in data) {                   
          result.push(<option value={data[index].id} key={data[index].id}>{data[index].cargo_grado}</option>)
         }
         setCargos(result)        
 
       } catch (error) {
         console.log('Fallo obteniendo los cargos y grados' + error)
       }      
     }    
     obtenerCargos();            
  }, [])



  return (
      
      <div>
        <h3 className="mb-3 mt-5">3. Información laboral del funcionario</h3>      
          
        <Row className="mb-4">{/*Entidad y ciudad oficina*/}
          <Col md="0">
            <span>Entidad</span>
          </Col>
          <Col md="6">
            <Form.Control size="sm" name="entidad" as="select" onChange={recalcularMontoMaximo} ref={register}>
              <option value="0">Seleccione una opción</option>
              <option value="FBS">Fondo de Bienestar Social de la Contraloría General de la República</option>
              <option value="CGR">Contraloría General de la República</option>
            </Form.Control>
          </Col>
          <Col md="0" className="ml-5">
            <span>Ciudad Oficina</span>
          </Col>
          <Col md="4">
            <InputGroup>
            <Form.Control size="sm" name="ciudad_oficina" as="select" ref={register}>
              <option value="0">Seleccione una opción</option>
              <option>Bogotá</option>
              <option>Medellín</option>
              <option>Yopal</option>
              <option>Villavicencio</option>
              <option>...</option>
            </Form.Control>
            <Form.Control size="sm" name="ciudad_oficina" as="select" ref={register}>
              <option value="0">Seleccione una opción</option>
              <option>Bogotá</option>
              <option>Medellín</option>
              <option>Yopal</option>
              <option>Villavicencio</option>
              <option>...</option>
            </Form.Control>                                                                               
            </InputGroup>
          </Col>      
        </Row>

        <Row className="mb-2">{/*Gerencia y ubicacion FBS*/}
          <Col md="0">
            <span>Gerencia Departamental Colegiada</span>
          </Col>
          <Col md="3">
            <Form.Control disabled placeholder="Se auto-calcula" size="sm" name="gerencia" type="text" ref={register} />
          </Col>
          <Col md="0" className="ml-5">
            <p className="nota_ubicacion_fbs"><strong>Para Funcionarios FBS señalar Ubicación</strong> <br></br>(Oficina Principal, Colegio ó Centro Médico)</p>
          </Col> 
          <Col md="3"> 
            <Form.Control size="sm" name="ubicacion" as="select" ref={register}>
              <option value="0">Seleccione una opción</option>
              <option>Oficina Principal</option>
              <option>Colegio para Hijos de Empleados de la CGR</option>
              <option>Centro Médico CGR</option>    
            </Form.Control>
          </Col>      
        </Row>

        <Row className="mb-3">{/*Direccion, piso, telefono, extension */}
          <Col md="0">
            <span>Direccion</span>
          </Col>
          <Col md="4" className="mr-5">
            <Form.Control disabled placeholder="Se auto-calcula" size="sm" name="direccion_oficina" type="text" ref={register} />
          </Col>
          <Col md="0" className="ml-4">
            <span>Piso</span>
          </Col>
          <Col md="1">
            <Form.Control disabled placeholder="Se auto-calcula" size="sm" name="piso" type="number" ref={register} />
          </Col>
          <Col md="0" className="ml-4">
            <span>Teléfono</span>
          </Col>
          <Col md="2"> 
            <Form.Control disabled placeholder="Se auto-calcula" size="sm" name="telefono_oficina" type="number" ref={register} />
          </Col>
          <Col md="0" className="ml-4">
            <span>Extensión</span>
          </Col>
          <Col md="1">
            <Form.Control size="sm" name="extension" type="number" ref={register} />
          </Col>
        </Row>

        <Row className="mb-3">{/*Nombramiento, Cargo y grado*/}
          <Col md="0">
            <span>Nombramiento</span>
          </Col>
          <Col md="4">
            <Form.Control size="sm" name="nombramiento" as="select" ref={register}>
              <option value="0">Seleccione una opción</option>
              <option>Carrera Administrativa</option>
              <option>Libre Nombramiento</option>
              <option>Provisional</option>
              <option>Otro</option>
            </Form.Control>
          </Col>
          <Col md="0" className="ml-5">
            <span>Cargo y Grado</span>
          </Col>
          <Col md="5">
            <Form.Control size="sm" name="cargo_grado" as="select" onChange={recalcularMontoMaximo} ref={register}>
              {cargos}
            </Form.Control>
          </Col>        
        </Row>  

        <Row className="mb-3">{/*Estado del cargo y Fecha ingreso*/}
          <Col md="0">
            <span>Estado del cargo</span>
          </Col>
          <Col md="4" className="mr-4">
            <Form.Control size="sm" name="estado_cargo" as="select" ref={register}>
              <option value="0">Seleccione una opción</option>
              <option>Ocupado / Activo</option>
              <option>Posesión en Propiedad</option>
              <option>Comisión</option>
              <option>Período de prueba</option>
              <option>Provisional</option>
              <option>Encargado</option>
              <option>Suspensión definida</option>
            </Form.Control>
          </Col>
          <Col md="0" className="mr-3">
            <span>Fecha de ingreso</span>
          </Col>
          <DatePicker
            selected={props.fechaIngreso}
            onChange={date => cambiarFechaIngreso(date)}
            maxDate={new Date()}
            dateFormat="dd/MM/yyyy"
            locale={es}
            isClearable
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"                                          
          />      
        </Row>

        <Row className="mb-3">{/*E-mail institucional y Nota*/}
          <Col md="0">
            <span>E-mail Institucional</span>
          </Col>
          <Col md="4">
            <Form.Control size="sm" name="email" type="email" ref={register} />
          </Col>
          <Col>
            <span className="nota_certificado">Nota: Se debe anexar certificado tiempo de servicio historico cuando la vinculación no ha sido permanente (Literal f numeral 8 Artículo 14 Manual de Crédito Acuerdo 01 de 2014)</span>
          </Col>                
        </Row>        
  
      </div>                      
    
  );
}

export default InformacionLaboralFuncionario;