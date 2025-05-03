'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';
import { MetricsSection } from './metrics-section';
import { TandasActivas } from './tandas-activas';
import { PendientesRecibir } from './pendientes-recibir';
import { Transacciones } from './transacciones';
import CreateTandaModal from '@/components/create-tanda-modal';

export function DashboardView() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="flex justify-end items-center p-4 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="bg-gray-700 rounded-full h-8 w-8 flex items-center justify-center">
            <User className="h-4 w-4 text-gray-300" />
          </div>
          <span>0.00</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold mb-2">
            ¡Qué gusto verte de nuevo!
          </h1>
          <p className="text-gray-400">
            Aquí tienes un resumen de tus actividades decentralizadas
          </p>
        </div>

        {/* Payment Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <p className="text-sm text-gray-400 mb-1">
              Vencimiento del próximo pago
            </p>
            <p className="text-xl font-medium">Mayo 14, 2025</p>
          </div>
          <div className="mt-4 md:mt-0">
            <p className="text-sm text-gray-400 mb-1">Monto Total a Pagar</p>
            <p className="text-xl font-medium">$600.00 $MXNb</p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-emerald-700 hover:bg-emerald-800 text-white rounded-full px-6"
            onClick={openModal}
          >
            Crea tu Tanda
          </Button>
        </div>

        {/* Metrics */}
        <MetricsSection />

        {/* Tandas Activas */}
        <TandasActivas />

        {/* Pendientes a recibir */}
        <PendientesRecibir />

        {/* Transacciones */}
        <Transacciones />
      </main>

      {/* Modal */}
      <CreateTandaModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
}
