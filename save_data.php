<?php
// the $_POST[] array will contain the passed in filename and data
// the directory "www-data" is writable by the server (chmod 777)
$filename = "/home/web/lcl/www-data/CouchPotato/".$_POST['filename'];
//$filename = "./data/".$_POST['filename'];s
$data = $_POST['filedata'];
// write the file to disk
file_put_contents($filename, $data);
?>
