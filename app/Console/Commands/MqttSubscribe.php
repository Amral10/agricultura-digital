<?php

namespace App\Console\Commands;

use App\Models\Leitura;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Log;
use PhpMqtt\Client\MqttClient;
use PhpMqtt\Client\ConnectionSettings;

class MqttSubscribe extends Command
{
    protected $signature = 'mqtt:subscribe';

    protected $description = 'Recebe dados da estufa via MQTT';

    public function handle(): int
    {
        $mqtt = new MqttClient(
            config('services.mqtt.host'),
            config('services.mqtt.port'),
            config('services.mqtt.client_id')
        );

        try {
            $connectionSettings = (new ConnectionSettings)
                ->setUsername(config('services.mqtt.username'))
                ->setPassword(config('services.mqtt.password'));
            $mqtt->connect($connectionSettings, true);

            $this->info('Conectado ao broker MQTT!');
            $this->info('Aguardando mensagens...');

            $mqtt->subscribe('estufa/dados', function (string $topic, string $message) {
                $data = json_decode($message, true);

                if (!is_array($data)) {
                    Log::error("Mensagem inválida recebida do tópico '{$topic}': {$message}");
                    return;
                }

                $temperatura = $data['temperatura'];
                $umidadeAr = $data['umidade'];

                Log::info("Mensagem recebida do tópico '{$topic}': Temperatura = {$temperatura}, Umidade do Ar = {$umidadeAr}");

                Leitura::create([
                    'sensor' => 'DHT22',
                    'tipo' => 'temperatura',
                    'valor' => $temperatura,
                ]);

                Leitura::create([
                    'sensor' => 'DHT22',
                    'tipo' => 'umidade',
                    'valor' => $umidadeAr,
                ]);
            });

            $mqtt->loop(true);

            return self::SUCCESS;

        } catch (\Throwable $e) {
            $this->error('Erro MQTT: ' . $e->getMessage());

            return self::FAILURE;
        }
    }
}
