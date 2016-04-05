<?php
include_once "mp3file.class.php";
// You need to add server side validation and better error handling here

$hostname = 'http://'.$_SERVER['SERVER_NAME'];

$pathForScan = "../uploads/";
$files = preg_grep('/^([^.])/', scandir($pathForScan));

foreach ($files as &$filename) {
    $mp3file = new MP3File("../uploads/".$filename); //http://www.npr.org/rss/podcast.php?id=510282
    $duration2 = $mp3file->getDuration(); //(slower) for VBR (or CBR)
    $durationSec = MP3File::formatTime($duration2);

    $results[] = array(
        "name" => $filename,
        "link" => $hostname."/server/uploads/".$filename,
        "duration" => $durationSec
    );
}

echo json_encode($results);