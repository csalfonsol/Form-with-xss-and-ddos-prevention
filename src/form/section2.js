// Librerias
import React from 'react';
import { useFormContext } from 'react-hook-form' 

// Layout
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

// Elementos
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ReactTable from 'react-table-6';

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/app.css';



const ReferenciasFamiliares = props =>  {


  // Se llama la función (Callback) del componente padre (Main)
  function cambiarReferenciasFamiliares(data) { props.cambiarReferenciasFamiliares(data); }


  // Agregar una referencia familiar en el datagrid de referencias familiares
  const agregar = e => {     
    
    // Máximo pueden haber 8 referencias familiares
    if (props.referenciasFamiliares.length < 8){ 
      let result = [...props.referenciasFamiliares];
      result.push([,"", "",])
      cambiarReferenciasFamiliares(result);    
    }
  }

  // Celda para ingresar datos
  function renderEditable(cellInfo) {
    return (
      <div        
        className = "cell"
        contentEditable                   

        // La variable de estado se actualiza cada vez que se suelta el foco de la celda actual
        onBlur = {e => {
          // Se valida si el teléfono es numerico o no
          if (cellInfo.column.id === 3){
            if (!isNaN(e.target.innerHTML)){
              const newData = [...props.referenciasFamiliares];
              newData[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;                          
              cambiarReferenciasFamiliares(newData);
            }
          }          
          else {
              const newData = [...props.referenciasFamiliares];
              newData[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;                          
              cambiarReferenciasFamiliares(newData);
          }
        }}   

        dangerouslySetInnerHTML = {{
          __html: props.referenciasFamiliares[cellInfo.index][cellInfo.column.id]
        }} 
      />
    );
  }

  // Celda para eliminar la fila
  function renderDelete(cellInfo) {
    return (
      <Button 

        onClick = {e => {
          // Mínimo debe haber una referencia familiar
          if (props.referenciasFamiliares.length > 1){ 
            let result = [...props.referenciasFamiliares];
            result.splice(cellInfo.index , 1);          
            cambiarReferenciasFamiliares(result);       
          }   
        }}

        size="sm" 
        variant="danger"
        className="rellenar">    
          Eliminar
      </Button> 
    );
  }

  return (
      
      <div>
        
        <h3 className="mb-3 mt-5">2. Referencias familiares</h3>      

          <Row className="mt-4">
            <span className="pt-1">Referencias familiares: &nbsp; <strong>{props.referenciasFamiliares.length}</strong></span>  &nbsp;&nbsp;&nbsp;
            <Button className="mb-2" onClick={agregar} size="sm" variant="info">
              Agregar
            </Button> 
          </Row>

          <Col md="0">                      
            <ReactTable /* Datagrid de referencias familiares */              
              data = {props.referenciasFamiliares}
              columns={[
                {
                  id: 1,
                  Header: "Nombres y apellidos",
                  accessor: "nombres",
                  width: 500,
                  headerClassName: "encabezado_columna",
                  Cell: renderEditable
                },
                {
                  id: 2,
                  Header: "Ciudad de residencia",
                  accessor: "ciudad",         
                  headerClassName: "encabezado_columna",                           
                  Cell: renderEditable
                },
                {
                  id: 3,
                  Header: "No. Teléfono fijo / móvil",
                  accessor: "telefono",              
                  width: 220,                                    
                  className: "text-center",
                  headerClassName: "encabezado_columna",
                  Cell: renderEditable
                },
                {
                  id: 4,
                  Header: "Eliminar",
                  accessor: "delete",              
                  width: 250,
                  className: "text-center",
                  headerClassName: "encabezado_columna",
                  Cell: renderDelete
                }
              ]}              
              pageSize = {props.referenciasFamiliares.length}
              showPagination = {false}            
              resizable = {false}  
              className = "-striped -highlight blue"
            />           
          </Col>     
      </div>                          
  );
}

export default ReferenciasFamiliares;