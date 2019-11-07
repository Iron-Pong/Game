<?php
  $host_name = 'db5000216627.hosting-data.io';
  $database = 'dbs211505';
  $user_name = 'dbu435240';
  $password = 'Ironpong.123.';
  $con = mysqli_connect($host_name, $user_name, $password, $database);

  if (mysqli_errno()) {
    die('<p>Failed to connect to MySQL: '.mysql_error().'</p>');
  } 
//   else {
//     echo '<p>Connection to MySQL server successfully established.</p >';
//   }
?>