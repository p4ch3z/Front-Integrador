import React, { useState } from "react";
import "./InvestigationBoard.css";
import { Pencil, PlusCircle, MinusCircle, FileText } from "lucide-react";
import Sidebar from "../asidebarSupervisor/Sidebar";
import UserHeader from "../UserHeader/UserHeader";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useQuery, useMutation } from "@apollo/client";
import { GET_INVESTIGATIONS } from "../../graphql/queries/investigacionTask/allInvestigation";
import { CREATE_INVESTIGATION } from "../../graphql/mutations/investigationTask/createInvestigation";

const InvestigationBoard = () => {
  const [formData, setFormData] = useState({
    nombre: "",
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

  const { data, loading, error, refetch } = useQuery(GET_INVESTIGATIONS);
  const [createInvestigation] = useMutation(CREATE_INVESTIGATION);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreate = () => {
    createInvestigation({
      variables: {
        nombre: formData.nombre,
        fechaInicio: formData.fechaInicio,
        fechaFin: formData.fechaFin,
        coordenadasGeograficas: formData.ubicacion,
      },
    })
      .then(() => {
        refetch();
        resetForm();
        setNotification("Investigación creada ✅");
      })
      .catch((err) => {
        console.error("Error al crear investigación:", err);
        setNotification("❌ Error al crear investigación");
      });
  };

  const handleEditClick = (index) => {
    const investigation = data.allInvestigations[index];
    setFormData({
      nombre: investigation.nombre,
      fechaInicio: investigation.fechaInicio,
      fechaFin: investigation.fechaFin,
      ubicacion: investigation.coordenadasGeograficas,
    });
    setEditingIndex(index);
    setShowEditForm(true);
    setShowCreateForm(false);
  };

  const handleUpdate = () => {
    // Esta función es local: no envía datos al backend aún
    resetForm();
    setNotification("Investigación actualizada ✅");
  };

  const handleDelete = (index) => {
    if (window.confirm("¿Deseas eliminar esta investigación?")) {
      // Esta función también es local; en producción debe hacerse vía mutación
      setNotification("Investigación eliminada ✅");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Informe de Investigaciones", 14, 20);

    const tableColumn = ["Nombre", "Fecha Inicio", "Fecha Fin", "Ubicación"];
    const tableRows = data?.allInvestigations.map((inv) => [
      inv.nombre,
      inv.fechaInicio,
      inv.fechaFin,
      inv.coordenadasGeograficas,
    ]) || [];

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
          <button onClick={() => {
            setShowCreateForm(true);
            setShowEditForm(false);
          }}>
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
            <th>Fecha inicio</th>
            <th>Fecha fin</th>
            <th>Ubicación</th>
            <th>Informe</th>
            {isEditMode && <th>Editar</th>}
            {isDeleteMode && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan="6">Cargando...</td></tr>
          ) : error ? (
            <tr><td colSpan="6">Error al cargar investigaciones</td></tr>
          ) : (
            data.allInvestigations.map((inv, index) => (
              <tr key={inv.id}>
                <td>{inv.nombre}</td>
                <td>{inv.fechaInicio}</td>
                <td>{inv.fechaFin}</td>
                <td>{inv.coordenadasGeograficas}</td>
                <td>
                  <button className="report-button" onClick={handleDownloadPDF}>
                    <FileText size={16} /> Informe
                  </button>
                </td>
                {isEditMode && (
                  <td>
                    <button className="edit-circle" onClick={() => handleEditClick(index)}>
                      ✏️
                    </button>
                  </td>
                )}
                {isDeleteMode && (
                  <td>
                    <button className="delete-circle" onClick={() => handleDelete(index)}>
                      −
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>CREAR INVESTIGACIÓN</h3>
            <button className="close-btn" onClick={resetForm}>✖</button>
            <input
              name="nombre"
              placeholder="Nombre de la investigación"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <input
              name="fechaInicio"
              placeholder="Fecha inicio (YYYY-MM-DD)"
              value={formData.fechaInicio}
              onChange={handleInputChange}
            />
            <input
              name="fechaFin"
              placeholder="Fecha fin (YYYY-MM-DD)"
              value={formData.fechaFin}
              onChange={handleInputChange}
            />
            <input
              name="ubicacion"
              placeholder="Ubicación (lat, long)"
              value={formData.ubicacion}
              onChange={handleInputChange}
            />
            <button className="save-btn" onClick={handleCreate}>CREAR</button>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>EDITAR INVESTIGACIÓN</h3>
            <button className="close-btn" onClick={resetForm}>✖</button>
            <input
              name="nombre"
              placeholder="Nombre de la investigación"
              value={formData.nombre}
              onChange={handleInputChange}
            />
            <input
              name="fechaInicio"
              placeholder="Fecha inicio"
              value={formData.fechaInicio}
              onChange={handleInputChange}
            />
            <input
              name="fechaFin"
              placeholder="Fecha fin"
              value={formData.fechaFin}
              onChange={handleInputChange}
            />
            <input
              name="ubicacion"
              placeholder="Ubicación (lat, long)"
              value={formData.ubicacion}
              onChange={handleInputChange}
            />
            <button className="save-btn" onClick={handleUpdate}>GUARDAR CAMBIOS</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvestigationBoard;
