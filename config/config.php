<?php

$isHttps = (
    (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off')
    || (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == 443)
    || (!empty($_SERVER['HTTP_X_FORWARDED_PROTO']) && $_SERVER['HTTP_X_FORWARDED_PROTO'] === 'https')
);

$protocol = $isHttps ? 'https://' : 'http://';
$host = $_SERVER['HTTP_HOST'] ?? 'localhost';

$isLocal = in_array($host, ['localhost', '127.0.0.1']);

if ($isLocal) {
    $basePath = '/plaza-concentro/';
} else {
    $basePath = '/';
}

define('BASE_URL', $protocol . $host . $basePath);
define('ASSETS_URL', BASE_URL . 'assets/');
define('VIEWS_PATH', __DIR__ . '/../views/');