<?php
require_once __DIR__ . '/config/config.php';

$extra_css = ['directorio.css'];
$extra_js = ['script.js', 'directorio.js'];

include __DIR__ . '/views/templates/header.php';
include __DIR__ . '/views/directorio.php';
include __DIR__ . '/views/templates/footer.php';