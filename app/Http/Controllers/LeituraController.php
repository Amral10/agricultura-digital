<?php

namespace App\Http\Controllers;

use App\Models\Leitura;
use Inertia\Inertia;

class LeituraController extends Controller
{
    public function index()
    {
        $leituras = Leitura::where('tipo', 'Temperatura')
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn($leitura) => [
                'valor' => (float) $leitura->valor,
                'horario' => $leitura->created_at->format('H:i'),
            ]);

        $temperaturaAtual = Leitura::where('tipo', 'temperatura')
            ->latest()
            ->first();

        return Inertia::render('Temperatura', [
            'leituras' => $leituras,
            'temperaturaAtual' => $temperaturaAtual
                ? (float) $temperaturaAtual->valor
                : null,
        ]);
    }

    public function leituras()
    {
        $leituras = Leitura::where('tipo', 'Temperatura')
            ->orderBy('created_at', 'asc')
            ->get()
            ->map(fn($leitura) => [
                'valor' => (float) $leitura->valor,
                'horario' => $leitura->created_at->format('H:i'),
            ]);

        return response()->json($leituras);
    }
}
