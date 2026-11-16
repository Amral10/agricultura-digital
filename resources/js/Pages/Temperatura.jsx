
import { Head } from '@inertiajs/react';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

export default function Temperatura({
    leituras = [],
    temperaturaAtual = null,
}) {
    return (
        <>
            <Head title="Monitoramento de Temperatura" />

            <main className="min-h-screen bg-gray-50 p-6 md:p-10">

                {/* Cabeçalho */}
                <header className="mb-8">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Monitoramento de temperatura
                    </h1>

                    <p className="mt-1 text-gray-500">
                        Acompanhe as medições realizadas pela estufa.
                    </p>
                </header>

                {/* Temperatura atual */}
                <section className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Temperatura atual
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-gray-800">
                            {temperaturaAtual !== null
                                ? `${Number(temperaturaAtual).toFixed(1)} °C`
                                : '-- °C'}
                        </h2>

                        <p className="mt-2 text-sm text-gray-400">
                            Última medição registrada
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Temperatura máxima
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-red-500">
                            {leituras.length > 0
                                ? `${Math.max(...leituras.map((l) => Number(l.valor))).toFixed(1)} °C`
                                : '-- °C'}
                        </h2>

                        <p className="mt-2 text-sm text-gray-400">
                            Maior valor registrado
                        </p>
                    </div>

                    <div className="rounded-xl bg-white p-6 shadow-sm">
                        <p className="text-sm font-medium text-gray-500">
                            Total de medições
                        </p>

                        <h2 className="mt-3 text-4xl font-bold text-blue-600">
                            {leituras.length}
                        </h2>

                        <p className="mt-2 text-sm text-gray-400">
                            Registros no banco de dados
                        </p>
                    </div>

                </section>

                {/* Gráfico */}
                <section className="rounded-xl bg-white p-6 shadow-sm">

                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-800">
                            Histórico de temperatura
                        </h2>

                        <p className="text-sm text-gray-500">
                            Variação da temperatura ao longo do tempo
                        </p>
                    </div>

                    <div className="h-80 w-full">

                        {leituras.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart
                                    data={leituras}
                                    margin={{
                                        top: 10,
                                        right: 20,
                                        left: 0,
                                        bottom: 10,
                                    }}
                                >
                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#e5e7eb"
                                    />

                                    <XAxis
                                        dataKey="horario"
                                        stroke="#9ca3af"
                                        fontSize={12}
                                    />

                                    <YAxis
                                        stroke="#9ca3af"
                                        fontSize={12}
                                        domain={['auto', 'auto']}
                                    />

                                    <Tooltip
                                        formatter={(value) => [
                                            `${Number(value).toFixed(1)} °C`,
                                            'Temperatura',
                                        ]}
                                    />

                                    <Line
                                        type="monotone"
                                        dataKey="valor"
                                        stroke="#2563eb"
                                        strokeWidth={3}
                                        dot={false}
                                        activeDot={{ r: 6 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : (
                            <div className="flex h-full items-center justify-center">
                                <p className="text-gray-400">
                                    Nenhuma leitura de temperatura encontrada.
                                </p>
                            </div>
                        )}

                    </div>
                </section>

            </main>
        </>
    );
}
