<?php

namespace App\Http\Controllers;

use App\Models\Leitura;
use Illuminate\Http\Request;

class LeituraController extends Controller
{
    public function index()
    {
        $leituras = Leitura::all();
        return response()->json($leituras);
    }

    public function testStore()
    {
        $leitura = new Leitura();
        $leitura->sensor = 'sensor1';
        $leitura->valor = 25.5;
        $leitura->save();

        return response()->json(['message' => 'Leitura armazenada com sucesso!']);
    }

}
