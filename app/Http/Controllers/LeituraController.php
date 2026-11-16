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
}
