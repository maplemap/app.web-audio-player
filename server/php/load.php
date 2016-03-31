<?php
// You need to add server side validation and better error handling here

$hostname = 'http://'.$_SERVER['SERVER_NAME'];

$pathForScan = "../uploads/";
$files = preg_grep('/^([^.])/', scandir($pathForScan));

foreach ($files as &$filename) {
    $results[] = array(
        "name" => $filename,
        "link" => $hostname."/server/uploads/".$filename
    );
}

echo json_encode($results);