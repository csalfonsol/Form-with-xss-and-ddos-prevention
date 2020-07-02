// Librerias
import React, { useEffect, useState }  from 'react';
import { useFormContext } from 'react-hook-form' 

// Layout
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Elementos
import Alert from 'react-bootstrap/Alert';

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';

const InformacionSolicitudDelCredito = props => {

  // Funciones utilizadas para conectar con el contexto principal del formulario
  const register = useFormContext().register;    
  const watch = useFormContext().watch;  

  // Variables hook temporales para manejo de eventos (NO son las que se envian como callback al componente padre Main)  
  const [switchMaximo, setSwitchMaximo] = useState('off');  
  const [mes, setMes] = useState();

  // Se llaman las funciones (Callback) del componente padre (Main)
  const cambiarCategoria = e => { props.cambiarCategoria(e.target.value); }
  const cambiarSubcategoria = e => { props.cambiarSubcategoria(e.target.value); }
  const cambiarVez = e => { props.cambiarVez(e.target.value); }; 
  const cambiarCardinalidadVivienda = e => { props.cambiarCardinalidadVivienda(e.target.value); }
  const cambiarPrimas = e => { props.cambiarPrimas(e.target.value); };
  const cambiarMontoEspecifico = e => { props.cambiarMontoEspecifico(e.target.value); }
    const cambiarMontoEspecificoMax = value => { props.cambiarMontoEspecifico(value); }
  // const cambiarMontoMaximo = value => { props.cambiarMontoMaximo(value); } 
  // const recalcularMontoMaximo = () => { props.recalcularMontoMaximo(); }

  // Se ejecuta cada vez que se renderiza este componente
  useEffect(() => {       
    // Se carga la lista de departamentos y municipios
    function generarMeses() {
      // Generar listado de meses (1-48)    
      let result = [];    
      for (let mes = 1; mes < 49; mes++) {
        result.push(
          <option value={mes} key={mes}>{mes}</option>
        )     
      }
      setMes(result)                                        
    }    
    generarMeses();            
  }, [])
  

  // Establecer en el cupo solicitado el valor máximo permitido 
  function establecerCupoMaximo(e) {   
    if (switchMaximo === 'on'){      
      setSwitchMaximo('off')                     
    }
    else {      
      cambiarMontoEspecificoMax(props.montoMaximo)
      setSwitchMaximo('on')                
    }
  }
     

  return (
      
      <div>
        <h3 className="mb-3 mt-5">4. Información solicitud del crédito</h3>      
          
        <Col md="0">          
          <p className="mb-2">Línea de crédito</p> 
        </Col>
        <Row className="mb-3 ml-1 text-center">{/*Linea de crédito*/}                              
          <Col md="3"> {/* Vivienda */} 
            <Alert variant={'secondary'}> 
              <div className="custom-control custom-radio">            
                <input className="custom-control-input pointer" type="radio" value='VI' id="VI"
                  checked = {props.categoria === 'VI'}  
                  onChange = {cambiarCategoria}/>
                <label className="mb-2 custom-control-label pointer" htmlFor="VI"><strong>Vivienda</strong></label>
              </div>
              <p className="mb-2 mt-2 text-left">No. Vez</p>    
              <Row>
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='1' id="VI_1"
                    checked = {props.vez === '1' && props.categoria === 'VI'}  
                    onChange = {cambiarVez}
                    disabled = {props.categoria !== 'VI'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VI_1">1 Vez</label>
                </div>
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='2' id="VI_2"
                    checked = {props.vez === '2' && props.categoria === 'VI'}  
                    onChange = {cambiarVez}
                    disabled = {props.categoria !== 'VI'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VI_2">2 Vez</label>
                </div>
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='3' id="VI_3"
                    checked = {props.vez === '3' && props.categoria === 'VI'}  
                    onChange = {cambiarVez}
                    disabled = {props.categoria !== 'VI'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VI_3">3 Vez</label>
                </div>             
              </Row> 
              <p className="mb-2 mt-4 text-left">Modalidad</p>                  
              <Row> 
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='CM' id="VI_CM"
                    checked = {props.subcategoria === 'CM' && props.categoria === 'VI'}  
                    onChange = {cambiarSubcategoria}
                    disabled = {props.categoria !== 'VI'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VI_CM">Compra</label>
                </div>                  
              </Row> 
              <Row> 
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='LI' id="VI_LI"
                    checked = {props.subcategoria === 'LI' && props.categoria === 'VI'}  
                    onChange = {cambiarSubcategoria}
                    disabled = {props.categoria !== 'VI'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VI_LI">Liberación</label>
                </div>               
              </Row> 
              <Row>
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='CC' id="VI_CC"
                    checked = {props.subcategoria === 'CC' && props.categoria === 'VI'}  
                    onChange = {cambiarSubcategoria}
                    disabled = {props.categoria !== 'VI'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VI_CC">Construcción</label>
                </div>                       
              </Row> 
              <Row className="mb-2 mt-4 text-center">
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='INDIVIDUAL' id="IND"
                    checked = {props.cardinalidadVivienda === 'INDIVIDUAL' && props.categoria === 'VI'}  
                    onChange = {cambiarCardinalidadVivienda}
                    disabled = {props.categoria !== 'VI'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="IND">Individual</label>
                </div>      
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='CONJUNTA' id="CON"
                    checked = {props.cardinalidadVivienda === 'CONJUNTA' && props.categoria === 'VI'}  
                    onChange = {cambiarCardinalidadVivienda}
                    disabled = {props.categoria !== 'VI'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="CON">Conjunta</label>
                </div>                              
              </Row>        
            </Alert>
          </Col>

          <Col md="3"> {/* Vehículo */} 
            <Alert variant={'secondary'}> 
              <div className="custom-control custom-radio">            
                <input className="custom-control-input pointer" type="radio" value='VH' id="VH"
                  checked = {props.categoria === 'VH'}  
                  onChange = {cambiarCategoria}/>
                <label className="mb-2 custom-control-label pointer" htmlFor="VH"><strong>Vehículo</strong></label>
              </div>              
              <p className="mb-2 mt-2 text-left">No. Vez</p>    
              <Row>
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='1' id="VH_1"
                    checked = {props.vez === '1' && props.categoria === 'VH'}  
                    onChange = {cambiarVez}
                    disabled = {props.categoria !== 'VH'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VH_1">1 Vez</label>
                </div>     
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='2' id="VH_2"
                    checked = {props.vez === '2' && props.categoria === 'VH'}  
                    onChange = {cambiarVez}
                    disabled = {props.categoria !== 'VH'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VH_2">2 Vez</label>
                </div>   
              </Row>
              <p className="mt-2 text-justify nota_vehiculo">No habrá segundo crédito para vehículo hasta no satisfacer la demanda de  crédito por primera vez. Artículo 13, parágrafo Manual de crédito Vigente.
              </p>   
              <p className="mb-2 mt-4 text-left">Modalidad</p>
              <Row> 
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='CM' id="VH_CM"
                    checked = {props.subcategoria === 'CM' && props.categoria === 'VH'}  
                    onChange = {cambiarSubcategoria}
                    disabled = {props.categoria !== 'VH'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VH_CM">Compra</label>
                </div>                  
              </Row> 
              <Row> 
                <div className="ml-2 custom-control custom-radio">            
                  <input className="custom-control-input pointer" type="radio" value='LI' id="VH_LI"
                    checked = {props.subcategoria === 'LI' && props.categoria === 'VH'}  
                    onChange = {cambiarSubcategoria}
                    disabled = {props.categoria !== 'VH'}/>
                  <label className="mr-4 custom-control-label pointer" htmlFor="VH_LI">Liberación</label>
                </div>               
              </Row>                                  
            </Alert>                                       
          </Col>              

          <Col md="3">  {/* Bienestar integral Y Monto solicitado*/}           
            <Alert variant={'secondary'}> 
              <div className="custom-control custom-radio">            
                <input className="custom-control-input pointer" type="radio" value='BI' id="BI"
                  checked = {props.categoria === 'BI'}  
                  onChange = {cambiarCategoria}/>
                <label className="mb-2 custom-control-label pointer" htmlFor="BI"><strong>Bienestar integral</strong></label>
              </div>                 
              <p className="mb-2 mt-2 text-left">Modalidad</p>                  
                <Row> 
                  <div className="ml-2 custom-control custom-radio">            
                    <input className="custom-control-input pointer" type="radio" value='ED' id="BI_ED"
                      checked = {props.subcategoria === 'ED' && props.categoria === 'BI'}  
                      onChange = {cambiarSubcategoria}
                      disabled = {props.categoria !== 'BI'}/>
                    <label className="mr-4 custom-control-label pointer" htmlFor="BI_ED">Educación</label>
                  </div>                
                </Row> 
                <Row> 
                  <div className="ml-2 custom-control custom-radio">            
                    <input className="custom-control-input pointer" type="radio" value='RE' id="BI_RE"
                      checked = {props.subcategoria === 'RE' && props.categoria === 'BI'}  
                      onChange = {cambiarSubcategoria}
                      disabled = {props.categoria !== 'BI'}/>
                    <label className="mr-4 custom-control-label pointer" htmlFor="BI_RE">Recreación</label>
                  </div>              
                </Row>
                <Row> 
                  <div className="ml-2 custom-control custom-radio">            
                    <input className="custom-control-input pointer" type="radio" value='SA' id="BI_SA"
                      checked = {props.subcategoria === 'SA' && props.categoria === 'BI'}  
                      onChange = {cambiarSubcategoria}
                      disabled = {props.categoria !== 'BI'}/>
                    <label className="mr-4 custom-control-label pointer" htmlFor="BI_SA">Salud</label>
                  </div>       
                </Row> 
                <Row> 
                  <div className="ml-2 custom-control custom-radio">            
                    <input className="custom-control-input pointer" type="radio" value='ML' id="BI_ML"
                      checked = {props.subcategoria === 'ML' && props.categoria === 'BI'}  
                      onChange = {cambiarSubcategoria}
                      disabled = {props.categoria !== 'BI'}/>
                    <label className="mr-4 custom-control-label pointer" htmlFor="BI_ML">Mejoras locativas</label>
                  </div>       
                </Row>
                <Row> 
                  <div className="ml-2 custom-control custom-radio">            
                    <input className="custom-control-input pointer" type="radio" value='HG' id="BI_HG"
                      checked = {props.subcategoria === 'HG' && props.categoria === 'BI'}  
                      onChange = {cambiarSubcategoria}
                      disabled = {props.categoria !== 'BI'}/>
                    <label className="mr-4 custom-control-label pointer" htmlFor="BI_HG">Hogar</label>
                  </div>
                </Row>
            </Alert>

            <p className="mb-2"><strong>Monto solicitado</strong></p>            
            {watch('entidad') === '0' &&
              <div className="text-left"><span className="text-danger" >
                <strong>Seleccione una entidad</strong>
              </span> <br></br> </div>              
            }
            {(watch('cargo_grado') === '0' || watch('cargo_grado') === '') &&
              <div className="text-left"><span className="text-danger" >
                <strong>Seleccione un cargo y grado</strong>
              </span> <br></br> </div>
            }
            {props.categoria === undefined &&
              <div className="text-left"><span className="text-danger" >
                <strong>Seleccione una línea de crédito </strong>
              </span> <br></br> </div>
            }
            {watch('entidad') !== '0' && watch('cargo_grado') !== '0' && props.categoria !== undefined &&
              <div> 
                <p className="text-left nota_certificado mb-2" >
                  Digite un monto entre <strong>$1</strong> y <strong>${props.montoMaximo}</strong>
                </p>                            
                <div className="custom-control custom-checkbox text-left mb-2">
                  <input type="checkbox" className="custom-control-input pointer" id="CAL" 
                    onChange = {establecerCupoMaximo}/>
                  <label className="custom-control-label pointer" htmlFor="CAL">Cupo máximo permitido</label>
                </div>
                <Row>
                  <Col className="ml-3" md="0">
                    <p className="text-left" >Monto específico</p>
                  </Col>            
                  <Col md="7">
                    <Form.Control size="sm" name="monto_especifico" type="number" 
                      value = {props.montoEspecifico} 
                      onChange = {cambiarMontoEspecifico}
                      disabled = {switchMaximo === 'on'} /> 
                  </Col>
                </Row>
              </div>
            }
          </Col>

          <Col md="3"> {/* Calamidad y forma de pago*/}           
            <Alert variant={'secondary'}>
              <div className="custom-control custom-radio">            
                <input className="custom-control-input pointer" type="radio" value='CA' id="CA"
                  checked = {props.categoria === 'CA'}  
                  onChange = {cambiarCategoria}/>
                <label className="mb-2 custom-control-label pointer" htmlFor="CA"><strong>Calamidad</strong></label>
              </div>                   
              <p className="mb-2 mt-2 text-justify nota_vehiculo">
                Nota: El plazo máximo para calamidad es de 36 meses.
              </p> 
            </Alert>
            <p className="mb-2">
                <strong>Forma de pago</strong>
            </p>            
            <p className="text-left mt-1">              
                Descuento mensual por nómina
            </p>
            <Row className="mt-2">
              <Col className="ml-2" md="0">
                <p className="text-left nota_pago" >(Máximo 48 Meses,excepto calamidad)</p>
              </Col>            
              <Col md="3">
                <Form.Control size="sm" name="meses" as="select" ref={register}>
                  {mes}
                </Form.Control>
              </Col>
            </Row>
            <p className="mb-2 mt-2 text-left">Descuento por primas</p>    
            <Row>
              <div className="ml-2 custom-control custom-radio">            
                <input className="custom-control-input pointer" type="radio" value='1' id="PR_1"
                  checked = {props.primas === '1'}  
                  onChange = {cambiarPrimas}/>
                <label className="mr-4 custom-control-label pointer" htmlFor="PR_1">1 prima &nbsp;</label>
              </div>                 
              <div className="ml-2 custom-control custom-radio">            
                <input className="custom-control-input pointer" type="radio" value='2' id="PR_2"
                  checked = {props.primas === '2'}  
                  onChange = {cambiarPrimas}/>
                <label className="mr-4 custom-control-label pointer" htmlFor="PR_2">2 primas</label>
              </div>            
            </Row>     
            <Row>
              <div className="ml-2 custom-control custom-radio">            
                <input className="custom-control-input pointer" type="radio" value='3' id="PR_3"
                  checked = {props.primas === '3'}  
                  onChange = {cambiarPrimas}/>
                <label className="mr-4 custom-control-label pointer" htmlFor="PR_3">3 primas</label>
              </div>            
              <div className="ml-2 custom-control custom-radio">            
                <input className="custom-control-input pointer" type="radio" value='4' id="PR_4"
                  checked = {props.primas === '4'}  
                  onChange = {cambiarPrimas}/>
                <label className="mr-4 custom-control-label pointer" htmlFor="PR_4">4 primas</label>
              </div>            
            </Row>
          </Col>
          <p className="mb-2 text-justify">Los plazos para vivienda y vehículo son los estipulados en las tablas anexas al Manual de <br></br> Crédito Vigente
          </p> 
        </Row>
    
      </div>                          
  );
}

export default InformacionSolicitudDelCredito;