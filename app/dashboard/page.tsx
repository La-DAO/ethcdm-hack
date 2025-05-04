'use client';

import { AppSidebar } from '@/components/app-sidebar';
import { SectionCards } from '@/components/section-cards';
import { SiteHeader } from '@/components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { PendientesRecibir } from '@/components/dashboard/pendientes-recibir';
import { TandasActivas } from '@/components/dashboard/tandas-activas';
import { Transacciones } from '@/components/dashboard/transacciones';
import CreateTandaModal from '@/components/create-tanda-modal';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';

import data from './data.json';

export default function Page() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { address, isConnected } = useAccount();

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Browser-specific code here
    }
  }, []);

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': 'calc(var(--spacing) * 72)',
          '--header-height': 'calc(var(--spacing) * 12)',
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="mb-10 px-4 md:px-8">
          <h1 className="text-3xl font-bold mb-2 mt-8 text-left">
            ¡Qué gusto verte de nuevo!
          </h1>
          {isConnected && (
            <p className="text-gray-400 text-left">Conectado como: {address}</p>
          )}
          <p className="text-gray-400 text-left">
            Aquí tienes un resumen de tus actividades decentralizadas
          </p>
        </div>

        {/* Payment Info */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 px-4 md:px-8">
          <div className="text-center md:text-left">
            <p className="text-sm text-gray-400 mb-1">
              Vencimiento del próximo pago
            </p>
            <p className="text-xl font-medium">Mayo 14, 2025</p>
          </div>
          <div className="mt-4 md:mt-0 text-center md:text-left">
            <p className="text-sm text-gray-400 mb-1">Monto Total a Pagar</p>
            <p className="text-xl font-medium">$600.00 $MXNb</p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark text-white rounded-full px-18 py-8 text-2xl"
            onClick={handleButtonClick}
          >
            Crea tu Tanda
          </Button>
        </div>
        <CreateTandaModal isOpen={isModalOpen} onClose={handleCloseModal} />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <TandasActivas />
                  </div>
                  <div className="flex-1">
                    <PendientesRecibir />
                  </div>
                </div>
                <div className="mt-4">
                  <Transacciones />
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
