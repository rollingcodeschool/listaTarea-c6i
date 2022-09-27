import ListaTarea from "./ListaTarea";
import { Form, Button } from "react-bootstrap";
import { useState, useEffect } from "react";

const FormularioTarea = () => {
  //busco los datos del localstorage
  const tareasLocalStorage = JSON.parse(localStorage.getItem('arregloTareaKey')) || [];
  //aqui va la mayoria de la logica
  const [tarea, setTarea] = useState("");
  const [arregloTarea, setArregloTarea] = useState(tareasLocalStorage);

  //ciclo de vida del componente
  useEffect(()=>{
    // console.log('prueba de ciclo de vida del componente')
    //guardar en localstorage
    localStorage.setItem('arregloTareaKey', JSON.stringify(arregloTarea));
  },[arregloTarea])

  const handleSubmit = (e) => {
    e.preventDefault();
    // arregloTarea.push no podemos usar el push con el state
    setArregloTarea([...arregloTarea, tarea]);
    //limpiar el input
    setTarea('');
  };

  const borrarTarea = (nombre)=>{
    let arregloModificado = arregloTarea.filter((item)=>(item !== nombre ));
    //actualizo el state
    setArregloTarea(arregloModificado)
  }

  return (
    <div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3 d-flex" controlId="formBasicEmail">
          <Form.Control
            type="text"
            placeholder="Ingrese una tarea"
            onChange={(e) => setTarea(e.target.value)}
            value={tarea}
          />
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form.Group>
      </Form>

      <ListaTarea arregloTarea={arregloTarea} borrarTarea={borrarTarea}></ListaTarea>
    </div>
  );
};

export default FormularioTarea;
