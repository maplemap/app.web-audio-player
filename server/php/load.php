<?php
// You need to add server side validation and better error handling here

$hostname = $_SERVER['SERVER_NAME'];

$pathForScan = "../uploads/";
$files = preg_grep('/^([^.])/', scandir($pathForScan));
foreach ($files as &$value) {
    $results_array[] = $value;
}

echo json_encode($results_array);