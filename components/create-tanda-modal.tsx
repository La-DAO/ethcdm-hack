// Create a new file: ethcdm-hack/components/CreateTandaModal.tsx
'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';

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

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 5));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 1: Tanda Details</h2>
            <input
              type="text"
              placeholder="Name"
              className="w-full mb-2 p-2 border"
            />
            <textarea
              placeholder="Description"
              className="w-full p-2 border"
              rows={4}
            ></textarea>
          </div>
        );
      case 2:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Step 2: Participants & Duration
            </h2>
            <select className="w-full mb-2 p-2 border">
              {[...Array(10).keys()].map((n) => (
                <option key={n} value={n + 1}>
                  {n + 1} Participants
                </option>
              ))}
            </select>
            <div className="flex justify-between">
              <Button>Weekly</Button>
              <Button>Monthly</Button>
              <Button>Quarterly</Button>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 3: Contribution</h2>
            <input
              type="number"
              placeholder="Amount"
              className="w-full p-2 border"
            />
          </div>
        );
      case 4:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 4: Select Turn</h2>
            <select className="w-full p-2 border">
              {[...Array(10).keys()].map((n) => (
                <option key={n} value={n + 1}>
                  Turn {n + 1}
                </option>
              ))}
            </select>
          </div>
        );
      case 5:
        return (
          <div>
            <h2 className="text-xl font-bold mb-4">Step 5: Summary</h2>
            <p>Review your Tanda details here...</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
          {renderStepContent()}
          <div className="flex justify-between mt-4">
            <Button onClick={prevStep} disabled={step === 1}>
              Previous
            </Button>
            <Button onClick={nextStep} disabled={step === 5}>
              Next
            </Button>
          </div>
          <div className="flex justify-center mt-4">
            {[...Array(5).keys()].map((n) => (
              <div
                key={n}
                className={`h-2 w-2 rounded-full mx-1 ${
                  step === n + 1 ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              ></div>
            ))}
          </div>
          <Button onClick={onClose} className="mt-4">
            Close
          </Button>
        </div>
      </div>
    )
  );
};

export default CreateTandaModal;
