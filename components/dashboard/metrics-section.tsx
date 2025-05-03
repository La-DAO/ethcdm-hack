import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MetricsSection() {
  return (
    <div className="mb-10">
      <h2 className="text-xl font-bold mb-4">Metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Ahorrado */}
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400 mb-1">Total Ahorrado</p>
            <p className="text-2xl font-bold mb-1">$23,400 XOC</p>
            <p className="text-sm text-emerald-500">+12.5%</p>
          </CardContent>
        </Card>

        {/* Próximo Acción Requerida */}
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400 mb-1">Próximo Acción Requerida</p>
            <p className="text-lg font-medium mb-1">Te toca aportar</p>
            <p className="text-xs text-emerald-500">Tanda Lorem Ipsum</p>
          </CardContent>
        </Card>

        {/* Tandas Activas */}
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400 mb-1">Tandas Activas</p>
            <p className="text-2xl font-bold">3</p>
          </CardContent>
        </Card>

        {/* Invitaciones Pendientes */}
        <Card className="bg-gray-900 border-gray-800 text-white relative">
          <CardContent className="p-6">
            <p className="text-sm text-gray-400 mb-1">Invitaciones Pendientes</p>
            <p className="text-2xl font-bold">4</p>
            <Button className="absolute bottom-3 right-3 bg-transparent hover:bg-gray-800 text-emerald-500 text-xs rounded-md px-3 py-1 border border-emerald-700">
              Checar
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
