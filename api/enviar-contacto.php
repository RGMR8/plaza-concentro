<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html');
    exit;
}

$nombre = trim($_POST['nombre'] ?? '');
$correo = trim($_POST['correo'] ?? '');
$telefono = trim($_POST['telefono'] ?? '');
$mensaje = trim($_POST['mensaje'] ?? '');

if ($nombre === '' || $correo === '' || $mensaje === '') {
    exit("Faltan campos obligatorios.");
}

if (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
    exit("El correo no es válido.");
}

$destinatario = 'r27grisel@gmail.com';
$asunto = 'Nuevo mensaje desde Plaza Concentro';

$cuerpo = "Has recibido un nuevo mensaje desde el formulario de contacto:\n\n";
$cuerpo .= "Nombre: " . $nombre . "\n";
$cuerpo .= "Correo: " . $correo . "\n";
$cuerpo .= "Teléfono: " . $telefono . "\n";
$cuerpo .= "Mensaje:\n" . $mensaje . "\n";

$headers = "From: no-reply@tudominio.com\r\n";
$headers .= "Reply-To: " . $correo . "\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

if (mail($destinatario, $asunto, $cuerpo, $headers)) {
    echo "Mensaje enviado correctamente.";
} else {
    echo "No se pudo enviar el mensaje.";
}
?>