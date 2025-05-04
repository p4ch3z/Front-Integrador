import React, { useState } from "react";
import "./InvestigationBoard.css";
import { Pencil, PlusCircle, MinusCircle, FileText } from "lucide-react";
import Sidebar from "../asidebarSupervisor/Sidebar";
import UserHeader from "../UserHeader/UserHeader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const InvestigationBoard = () => {
  const [investigations, setInvestigations] = useState([
    {
      nombre: "Hiato",
      brigada: "123123",
      fechaInicio: "3 de febrero 2025",
      fechaFin: "3 de mayo 2025",
      ubicacion: "6.674083069371135, -70.94430852881198",
    },
  ]);
  

  const [formData, setFormData] = useState({
    nombre: "",
    brigada: "",
    fechaInicio: "",
    fechaFin: "",
    ubicacion: "",
  });

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [notification, setNotification] = useState("");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    setInvestigations([...investigations, formData]);
    resetForm();
    setNotification("Investigación creada ✅");
  };

  const handleEditClick = (index) => {
    setFormData({ ...investigations[index] });
    setEditingIndex(index);
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  const handleUpdate = () => {
    const updated = [...investigations];
    updated[editingIndex] = formData;
    setInvestigations(updated);
    resetForm();
    setNotification("Investigación actualizada ✅");
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Deseas eliminar esta investigación?")) {
      const updated = investigations.filter((_, i) => i !== index);
      setInvestigations(updated);
      setNotification("Investigación eliminada ✅");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Informe de Investigaciones", 14, 20);
  
    const tableColumn = ["Nombre", "Brigada", "Fecha Inicio", "Fecha Fin", "Ubicación"];
    const tableRows = investigations.map(inv => [
      inv.nombre,
      inv.brigada,
      inv.fechaInicio,
      inv.fechaFin,
      inv.ubicacion
    ]);
  
    autoTable(doc, {
      startY: 30,
      head: [tableColumn],
      body: tableRows,
      theme: "striped",
    });
  
    doc.save("informe_investigaciones.pdf");
  };
  
  const resetForm = () => {
    setFormData({
      nombre: "",
      brigada: "",
      fechaInicio: "",
      fechaFin: "",
      ubicacion: "",
    });
    setShowCreateForm(false);
    setShowEditForm(false);
    setEditingIndex(null);
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="investigation-container">
      <Sidebar />
      <UserHeader
        name="Paola Balaguera"
        avatar="../public/paola.jpg"
        onLogout={() => (window.location.href = "/")}
      />

      <div className="investigation-header">
        <h2 className="investigation-title">Investigaciones</h2>
        <div className="action-buttons">
          <button onClick={() => { setShowCreateForm(true); setShowEditForm(false); }}>
            <PlusCircle />
          </button>
          <button onClick={() => setIsEditMode(!isEditMode)}>
            <Pencil />
          </button>
          <button onClick={() => setIsDeleteMode(!isDeleteMode)}>
            <MinusCircle />
          </button>
        </div>
      </div>

      {notification && <div className="notification">{notification}</div>}

      <table className="investigation-table">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Brigada</th>
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Ubicación</th>
            <th>Informe</th>
            {isEditMode && <th>Editar</th>}
            {isDeleteMode && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {investigations.map((inv, index) => (
            <tr key={index}>
              <td>{inv.nombre}</td>
              <td>{inv.brigada}</td>
              <td>{inv.fechaInicio}</td>
              <td>{inv.fechaFin}</td>
              <td>{inv.ubicacion}</td>
              <td>
                <button className="report-button" onClick={handleDownloadPDF}><FileText size={16} /> Informe</button>
              </td>
              {isEditMode && (
                <td>
                  <button className="edit-circle" onClick={() => handleEditClick(index)}>✏️</button>
                </td>
              )}
              {isDeleteMode && (
                <td>
                  <button className="delete-circle" onClick={() => handleDelete(index)}>−</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>CREAR INVESTIGACIÓN</h3>
            <button className="close-btn" onClick={resetForm}>✖</button>
            <input name="nombre" placeholder="Nombre de la investigación" value={formData.nombre} onChange={handleInputChange} />
            <input name="brigada" placeholder="Brigada" value={formData.brigada} onChange={handleInputChange} />
            <input name="fechaInicio" placeholder="Fecha inicio" value={formData.fechaInicio} onChange={handleInputChange} />
            <input name="fechaFin" placeholder="Fecha fin" value={formData.fechaFin} onChange={handleInputChange} />
            <input name="ubicacion" placeholder="Ubicación (X, Y)" value={formData.ubicacion} onChange={handleInputChange} />
            <button className="save-btn" onClick={handleCreate}>CREAR</button>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>EDITAR INVESTIGACIÓN</h3>
            <button className="close-btn" onClick={resetForm}>✖</button>
            <input name="nombre" placeholder="Nombre de la investigación" value={formData.nombre} onChange={handleInputChange} />
            <input name="fechaInicio" placeholder="Fecha inicio" value={formData.fechaInicio} onChange={handleInputChange} />
            <input name="fechaFin" placeholder="Fecha fin" value={formData.fechaFin} onChange={handleInputChange} />
            <input name="ubicacion" placeholder="Ubicación (X, Y)" value={formData.ubicacion} onChange={handleInputChange} />
            <button className="save-btn" onClick={handleUpdate}>GUARDAR CAMBIOS</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestigationBoard;
