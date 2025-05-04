"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useCreateTanda } from "@/hooks/use-create-tanda";
import { toast } from "sonner";

// Define the props type
interface CreateTandaModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateTandaModal: React.FC<CreateTandaModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null; // Don't render the modal if it's not open
  const [step, setStep] = useState(1);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState(4);
  const [contribution, setContribution] = useState(0);
  const [turn, setTurn] = useState(1);
  const { createTanda, isPending, isSuccess, isError, error, status } =
    useCreateTanda();

  // Al éxito, cierro modal y muestro toast de éxito
  useEffect(() => {
    if (isSuccess) {
      onClose();
      toast.success("¡Tanda creada!", {
        description:
          "Felicidades, tu tanda se ha creado. Ahora puedes empezar a ahorrar y cumplir esas metas.",
      });
    }
  }, [isSuccess, onClose]);

  // En caso de error, muestro toast de error
  useEffect(() => {
    if (isError) {
      toast.error("Error al crear tanda", {
        description:
          error?.message || "Ocurrió un problema al procesar la transacción.",
      });
    }
  }, [isError, error]);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  // Close modal on 'Esc' key press
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Paso 1: Detalles de la Tanda
            </h2>
            <input
              type="text"
              placeholder="Nombre de la Tanda"
              className="w-full mb-2 p-2 border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Descripción de la Tanda"
              className="w-full p-2 border"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Paso 2: Participantes y Duración
            </h2>
            <select
              className="w-full mb-2 p-2 border"
              value={participants}
              onChange={(e) => setParticipants(Number(e.target.value))}
            >
              <option value={4}>4 Participantes</option>
            </select>
            <div className="flex justify-center mt-4">
              <p className="text-center">
                El Administrador de la Tanda decidirá cuándo es el siguiente
                turno manualmente.
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Paso 3: Contribución</h2>
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 border"
              value={contribution}
              onChange={(e) => setContribution(Number(e.target.value))}
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Paso 4: Seleccionar Turno
            </h2>
            <p className="text-center">
              El creador de la Tanda será el Turno 1. Los demás participantes se
              asignarán en orden de registro.
            </p>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Paso 5: Resumen</h2>
            <p>
              <strong>Nombre de la Tanda:</strong> {title}
            </p>
            <p>
              <strong>Descripción:</strong> {description}
            </p>
            <p>
              <strong>Participantes:</strong> {participants}
            </p>
            <p>
              <strong>Contribución:</strong> {contribution}
            </p>
            <p>
              <strong>Turno:</strong> {turn}
            </p>
            <button
              onClick={(event) => {
                event.preventDefault();
                createTanda();
              }}
              className="mt-4 bg-blue-500 text-white p-2 rounded"
              disabled={isPending}
            >
              Lanzar Tanda
            </button>
          </div>
        );
      default:
        return null;
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-1/4 h-96 relative flex flex-col justify-between">
        <button onClick={onClose} className="absolute top-2 right-2 text-3xl">
          ×
        </button>

        <div className="flex-grow overflow-auto">{renderStepContent()}</div>

        <div className="flex justify-between mt-4">
          <Button
            onClick={() => setStep((s) => Math.max(s - 1, 1))}
            disabled={step === 1}
          >
            ←
          </Button>
          <Button
            onClick={() => setStep((s) => Math.min(s + 1, 5))}
            disabled={step === 5}
          >
            →
          </Button>
        </div>

        <div className="flex justify-center mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`h-2 w-2 rounded-full mx-1 ${
                step === i + 1 ? "bg-blue-500" : "bg-gray-300 dark:bg-gray-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  ) : null;
};

export default CreateTandaModal;
