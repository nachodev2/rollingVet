// src/hooks/usePacientes.js
import { useState } from "react";
import Swal from "sweetalert2";

export const usePacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [mostrarDetalle, setMostrarDetalle] = useState(false);
    const [mostrarEditar, setMostrarEditar] = useState(false);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [pacienteEnEdicion, setPacienteEnEdicion] = useState(null);

    const abrirModalAlta = () => setMostrarModal(true);
    const cerrarModalAlta = () => setMostrarModal(false);
    const cerrarDetalle = () => setMostrarDetalle(false);
    const cerrarEditar = () => setMostrarEditar(false);

    const guardarPaciente = (nuevoPaciente) => {
        try {
            const pacienteFormateado = {
                id: crypto.randomUUID(),
                campo1: `${nuevoPaciente.dueno.Nombre} ${nuevoPaciente.dueno.Apellido}`,
                campo2: nuevoPaciente.paciente.Nombre,
                campo3: nuevoPaciente.paciente.Especie,
                campo4: nuevoPaciente.paciente.Raza,
                datosCompletos: nuevoPaciente,
            };
            setPacientes((prev) => [...prev, pacienteFormateado]);
            cerrarModalAlta();
            Swal.fire({
                icon: "success",
                title: "Paciente creado",
                text: "El paciente fue dado de alta correctamente.",
                confirmButtonColor: "#0d6efd",
            });
        } catch {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "Ocurrió un error al guardar el paciente.",
                confirmButtonColor: "#dc3545",
            });
        }
    };

    const eliminarPaciente = (id) => {
        const paciente = pacientes.find((p) => p.id === id);
        if (!paciente) return;

        Swal.fire({
            title: "¿Eliminar paciente?",
            text: `Estás por eliminar a ${paciente.campo2} (${paciente.campo1}). Esta acción no se puede deshacer.`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#dc3545",
            cancelButtonColor: "#6c757d",
        }).then((result) => {
            if (result.isConfirmed) {
                setPacientes((prev) => prev.filter((p) => p.id !== id));
                Swal.fire({
                    icon: "success",
                    title: "Paciente eliminado",
                    text: "El paciente fue eliminado correctamente.",
                    confirmButtonColor: "#0d6efd",
                });
            }
        });
    };

    const verDetallePaciente = (id) => {
        const paciente = pacientes.find((p) => p.id === id);
        if (paciente) {
            setPacienteSeleccionado(paciente.datosCompletos);
            setMostrarDetalle(true);
        }
    };

    const editarPaciente = (id) => {
        const paciente = pacientes.find((p) => p.id === id);
        if (paciente) {
            setPacienteEnEdicion({ ...paciente.datosCompletos, id: paciente.id });
            setMostrarEditar(true);
        }
    };

    const actualizarPaciente = (pacienteActualizado) => {
        Swal.fire({
            title: "¿Confirmar edición?",
            text: "Estás por modificar los datos del paciente.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, guardar cambios",
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#0d6efd",
            cancelButtonColor: "#6c757d",
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    setPacientes((prev) =>
                        prev.map((p) =>
                            p.id === pacienteEnEdicion.id
                                ? {
                                    ...p,
                                    campo1: `${pacienteActualizado.dueno.Nombre} ${pacienteActualizado.dueno.Apellido}`,
                                    campo2: pacienteActualizado.paciente.Nombre,
                                    campo3: pacienteActualizado.paciente.Especie,
                                    campo4: pacienteActualizado.paciente.Raza,
                                    datosCompletos: pacienteActualizado,
                                }
                                : p
                        )
                    );
                    cerrarEditar();
                    setPacienteEnEdicion(null);
                    Swal.fire({
                        icon: "success",
                        title: "Paciente actualizado",
                        text: "Los datos fueron modificados correctamente.",
                        confirmButtonColor: "#0d6efd",
                    });
                } catch {
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Ocurrió un error al actualizar el paciente.",
                        confirmButtonColor: "#dc3545",
                    });
                }
            }
        });
    };

    return {
        pacientes,
        mostrarModal,
        mostrarDetalle,
        mostrarEditar,
        pacienteSeleccionado,
        pacienteEnEdicion,
        abrirModalAlta,
        cerrarModalAlta,
        cerrarDetalle,
        cerrarEditar,
        guardarPaciente,
        eliminarPaciente,
        verDetallePaciente,
        editarPaciente,
        actualizarPaciente,
    };
};