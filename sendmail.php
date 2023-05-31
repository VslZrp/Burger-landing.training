<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setFrom('pinokkio91@gmail.com', 'Vaso ski boom');
$mail->addAddress('vslzrp@i.ua');
$mail->Subject = 'Hello! It is the order for burgers';

$body = '<h1>Gamarjoba, genatsvale!</h1>'
if (trim(!empty($_POST['name']))){
    $body.='<p><strong>Name: </strong> '.$_POST['name'].'</p>';
}
if(trim(!empty($_POST['tel']))){
    $body.='<p><strong>Tel: </strong> '.$_POST['tel'].'</p>';
}if(trim(!empty($_POST['email']))){
    $body.='<p><strong>E-Mail: </strong> '.$_POST['email'].'</p>';
}if(trim(!empty($_POST['order']))){
    $body.='<p><strong>Order: </strong> '.$_POST['order'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()){
    $message = 'Error';
} else {
    $message = 'Данные отправлены!';   
}

$response = ['message' => $message];

header('Content-type: application/json');
echo json_encode($response);
?>