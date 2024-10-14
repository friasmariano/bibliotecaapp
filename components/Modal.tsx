import { useRef, FC, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faS, faSearch} from '@fortawesome/free-solid-svg-icons';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  libro: Array<{
    id: number,
    titulo: string,
    descripcion: string,
    fecha: string,
    autor: string,
    categoria: string
  }>
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, libro }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Show or close the modal depending on the isOpen state
  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current) {
      dialogRef.current.close();
    }
  }, [isOpen]); // This effect runs whenever isOpen changes

  const handleClose = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
    onClose();
  };

  console.log('Props libro:', libro);

  return (
    <dialog
      ref={dialogRef}
      style={{
        backgroundColor: 'whitesmoke',
        color: 'rgba(0,0,0,0.7)',
        margin: 'auto',
        padding: '1rem',
        borderRadius: '10px',
      }}
    >
      <div className="modal-header">
        <h4>
          Resultados
        </h4>
      </div>
      <div className="modal-body">
        {libro.map(e => (
          <div key={e.id}  style={ { marginBottom: '40px' } }>
            <h5><b>Título:</b> {e.titulo}</h5>
            <p><b>Descripción:</b> {e.descripcion}</p>
            <p><b>Fecha de Publicación:</b> {e.fecha}</p>
            <p><b>Autor:</b> {e.autor}</p>
            <p><b>Categoría:</b> {e.categoria}</p>
          </div>
        ))}
      </div>
      <div className="modal-footer">
        <button className="close-btn" onClick={handleClose}>
          Cerrar
        </button>
      </div>
    </dialog>
  );
};

export default Modal;
