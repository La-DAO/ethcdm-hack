import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function Transacciones() {
  const transactions = [
    {
      id: 1,
      type: 'Aportaste',
      dueDate: '2/20/2023',
      amount: '$200 USDC',
    },
    {
      id: 2,
      type: 'Recibiste',
      dueDate: '2/20/2023',
      amount: '$200 USDC',
    },
    {
      id: 3,
      type: 'Lanzaste una Tanda nueva',
      dueDate: '2/20/2023',
      amount: '$200 USDC',
    },
  ];

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transacciones</h2>
      <div className="space-y-4">
        {transactions.map((transaction) => (
          <Card
            key={transaction.id}
            className="bg-gradient-to-t from-primary/5 to-card dark:bg-card shadow-xs"
          >
            <CardContent className="p-0">
              <div className="flex justify-between items-center p-4">
                <div>
                  <p className="font-medium">{transaction.type}</p>
                  <div className="text-xs text-gray-400 mt-1">
                    <p>Payment Due: {transaction.dueDate}</p>
                    <p>Amount Due: {transaction.amount}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button className="bg-emerald-700 hover:bg-emerald-800 text-white rounded-md px-4">
                    Ir al Block Explorer
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
