import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import { useCreateTanda } from '@/hooks/use-create-tanda';

export function TandasActivas() {
  const { createTanda, isPending, isSuccess, isError, error, status } =
    useCreateTanda();
  const tandas = [
    {
      id: 1,
      name: 'Tanda Lorem Ipsum',
      dueDate: '04/14/2023',
      amount: '$200 XOC',
    },
    {
      id: 2,
      name: 'Tanda de Ejemplo',
      dueDate: '04/18/2023',
      amount: '$200 XOC',
    },
    {
      id: 3,
      name: 'Ultima Tanda',
      dueDate: '04/20/2023',
      amount: '$200 XOC',
    },
  ];

  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">Tandas Activas</h2>
      <div className="space-y-4">
        {tandas.map((tanda) => (
          <Card
            key={tanda.id}
            className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs"
          >
            <CardContent className="p-0">
              <div className="flex justify-between items-center p-4">
                <div>
                  <p className="font-medium">{tanda.name}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    <p>Vencimiento del Pago: {tanda.dueDate}</p>
                    <p>Monto a Pagar: {tanda.amount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => createTanda()}
                    className="mt-4 md:mt-0 bg-primary hover:bg-primary-dark text-white rounded-full px-8 py-4 text-md"
                  >
                    Aportar
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400">
                    <ChevronDown className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
