<?php
header('Access-Control-Allow-Origin: *');  


$dir = 'files/';
$a = scandir($dir);
$b=count($a);
$res = '';
for($x = 2; $x < $b; $x++)
   {
     $res.= $a[$x];
   }
   
$output = array_splice($a, 2);   
echo json_encode($output);
?>