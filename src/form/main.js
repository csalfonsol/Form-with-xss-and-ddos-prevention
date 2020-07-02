// Librerias
import React, { useState } from 'react';
import { useForm, FormContext } from 'react-hook-form'
import axios from 'axios';

// Layout
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';

// Elementos
import Button from 'react-bootstrap/Button';

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';

// Componentes formulario
import InformacionPersonalFuncionario from './section1';
import ReferenciasFamiliares from './section2';
import InformacionLaboralFuncionario from './section3';
import InformacionSolicitudDelCredito from './section4';
import DeclaracionAutorizacionFirma from './section5';



// URL del servidor que recibirá los datos
const URL_envio = 'http://3.80.200.194/ords/snw_fonviv/solicitud/crear'

// URL del servidor para obtener el monto máximo de una solicitud
const URL_monto_maximo = 'http://3.80.200.194/ords/snw_fonviv/solicitud/monto'


function Main() {

  // Metodos principales de React-hook-form para capturar los datos, manejar validaciones y crear el contexto del formulario
  const methods = useForm();
  const { register, errors, handleSubmit, watch } = methods;
  
  // Variables de estado (hooks) y sus Setters
  const [fechaNacimiento, setFechaNacimiento] = useState(); 
  const [fechaIngreso, setFechaIngreso] = useState(); 
  const [personasaCargo, setPersonasaCargo] = useState([ // Datagrid de personas a cargo
    [,"", "",]
  ]);
  const [referenciasFamiliares, setReferenciasFamiliares] = useState([ // Datagrid de referencias familiares
    [,"", "",]
  ]);  
  const [categoria, setCategoria] = useState();  
  const [vez, setVez] = useState();  
  const [subcategoria, setSubcategoria] = useState();  
  const [cardinalidadVivienda, setCardinalidadVivienda] = useState();  
  const [primas, setPrimas] = useState();  
  const [montoEspecifico, setMontoEspecifico] = useState();
  const [montoMaximo, setMontoMaximo] = useState();
  
 
  // Funciones para llamar los Setters de los hooks de las variables de estado
  function cambiarFechaNacimiento(nuevaFecha) { setFechaNacimiento(nuevaFecha); }
  function cambiarFechaIngreso(nuevaFecha) { setFechaIngreso(nuevaFecha); }
  function cambiarPersonasaCargo(nuevasPersonas) { setPersonasaCargo(nuevasPersonas); } // TODO: Buscar la manera de eliminar la primera posicion vacia (Se requiere para que encaje con las columnas del datagrid 
  function cambiarReferenciasFamiliares(nuevasReferencias) { setReferenciasFamiliares(nuevasReferencias); } 
  function cambiarCategoria(nuevaCategoria) { setCategoria(nuevaCategoria); recalcularMontoMaximo(nuevaCategoria) }
  function cambiarVez(nuevaVez) { setVez(nuevaVez); }
  function cambiarSubcategoria(nuevaSubcategoria) { setSubcategoria(nuevaSubcategoria); } 
  function cambiarCardinalidadVivienda(nuevaCardinalidad) { setCardinalidadVivienda(nuevaCardinalidad); } 
  function cambiarPrimas(nuevaPrima) { setPrimas(nuevaPrima); }   
  function cambiarMontoEspecifico(nuevoMonto) { setMontoEspecifico(nuevoMonto); } 
  function cambiarMontoMaximo(nuevoMontoMaximo) { setMontoMaximo(nuevoMontoMaximo); } 
  

  // Funcion que intenta recalcular el monto máximo cada vez que cambia alguno de los campos que lo determinan
  // (Entidad, cargo y grado, o Categoria) 
  function recalcularMontoMaximo(nuevaCategoria) { 
    if (nuevaCategoria === undefined){

      // Se verifica si se tienen los parámetros necesarios para hacer el cálculo
      if (watch('entidad') !== '0' && watch('cargo_grado') !== '0' && categoria !== undefined){
        let data = JSON.stringify({
          categoria: categoria,
          cargo_grado: watch('cargo_grado'),
          entidad: watch('entidad')
        })

        axios.post(URL_monto_maximo, data, {
          headers: {
              'Content-Type': 'application/json',
          }
        })
        .then(response => {
          cambiarMontoMaximo(response.data.monto)
          if (montoEspecifico > response.data.monto){ 
            cambiarMontoEspecifico(response.data.monto)          
          }
        })
        .catch(error => {          
          cambiarMontoMaximo('No especificado')
          // console.log(error)
        });  
      }      
    }
    else {

      // Se verifica si se tienen los parámetros necesarios para hacer el cálculo (ya se tiene categoria)
      if (watch('entidad') !== '0' && watch('cargo_grado') !== '0'){
        let data = JSON.stringify({
          categoria: nuevaCategoria,
          cargo_grado: watch('cargo_grado'),
          entidad: watch('entidad')
        })

        axios.post(URL_monto_maximo, data, {
          headers: {
              'Content-Type': 'application/json',
          }
        })
        .then(response => {
          cambiarMontoMaximo(response.data.monto)
          if (montoEspecifico > response.data.monto){ 
            cambiarMontoEspecifico(response.data.monto)          
          }
          // console.log(response);
        })
        .catch(error => {          
          cambiarMontoMaximo('No especificado')
          // console.log(error)
        });  
      }      
    }
  } 

  

  
  // Funcion que se ejecuta al enviar el formulario, si las validaciones son exitosas
  const onSubmit = data => {
         
    let fechaFormateada = 
      (fechaNacimiento.getDate()).toString() + '/' +
      (fechaNacimiento.getMonth()+1).toString() + '/' + 
      (fechaNacimiento.getFullYear()).toString();

    data.fechaNacimiento = fechaFormateada;
      
      fechaFormateada = 
      (fechaIngreso.getDate()).toString() + '/' +
      (fechaIngreso.getMonth()+1).toString() + '/' + 
      (fechaIngreso.getFullYear()).toString();

    data.fechaIngreso = fechaFormateada;

    // Se acoplan los datos de los datagrids NO implícitos por el register de react-hook-form
    data.personasaCargo = personasaCargo;
    data.referenciasFamiliares = referenciasFamiliares;  
    data.categoria = categoria
    data.vez = vez
    data.subcategoria = subcategoria
    data.cardinalidadvivienda = cardinalidadVivienda
    data.primas = primas
    data.montoEspecifico = montoEspecifico


    console.log(data);
    
    axios.post(URL_envio, data)
        .then(response => {
          console.log(response);
        })
        .catch(error => {          
          console.log(error)
        });         

    
  };   


  return (    

    <Container fluid>
      
      <h2 className="text-center mb-5">SOLICITUD DE CRÉDITO</h2> {/*Encabezado del formulario*/}    
    
      <FormContext {...methods}>
        <Form onSubmit = {handleSubmit(onSubmit)} >          
                    
          <InformacionPersonalFuncionario 
            fechaNacimiento={fechaNacimiento} cambiarFechaNacimiento={cambiarFechaNacimiento} 
            personasaCargo={personasaCargo} cambiarPersonasaCargo={cambiarPersonasaCargo}/>

          <ReferenciasFamiliares 
            referenciasFamiliares={referenciasFamiliares} cambiarReferenciasFamiliares={cambiarReferenciasFamiliares}/>

          <InformacionLaboralFuncionario             
            fechaIngreso={fechaIngreso} cambiarFechaIngreso={cambiarFechaIngreso}
            recalcularMontoMaximo={recalcularMontoMaximo}/>
  
          <InformacionSolicitudDelCredito 
            categoria={categoria} cambiarCategoria={cambiarCategoria}
            vez={vez} cambiarVez={cambiarVez}
            subcategoria={subcategoria} cambiarSubcategoria={cambiarSubcategoria}
            cardinalidadVivienda={cardinalidadVivienda} cambiarCardinalidadVivienda={cambiarCardinalidadVivienda}
            primas={primas} cambiarPrimas={cambiarPrimas}
            montoEspecifico={montoEspecifico} cambiarMontoEspecifico={cambiarMontoEspecifico}
            montoMaximo={montoMaximo} cambiarMontoMaximo={cambiarMontoMaximo}
            recalcularMontoMaximo={recalcularMontoMaximo}/>


          <Button size="lg" variant="primary" type="submit">{/*Enviar formulario*/}
            Enviar  
          </Button>   

          {/* Seccion de firma y autorizacion
             <DeclaracionAutorizacionFirma />
          */} 
          
          {/*Aqui va el boton enviar */}                

        </Form>
      </FormContext>

    </Container>
  );
}

export default Main;