import { useRef, FC, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  descripcion: string;
}

const Modal: FC<ModalProps> = ({ isOpen, onClose, titulo, descripcion }) => {
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
        <h4>Resultados</h4>
      </div>
      <div className="modal-body">
        <h5>{titulo}</h5>
        <p>{descripcion}</p>
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
