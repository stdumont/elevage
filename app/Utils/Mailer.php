<?php

namespace App\Utils;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

class Mailer {

    /**
     * Envoi de mail
     * 
     * @param type $from
     * @param type $fromName
     * @param type $to
     * @param type $toName
     * @param type $subject
     * @param type $body
     * @param type $altBody
     */
    public static function send($from, $fromName, $to, $toName, $subject, $body, $altBody) {
        $mail = new PHPMailer(true);                              // Passing `true` enables exceptions
        try {
            //Server settings
            $mail->isSMTP();                                      // Set mailer to use SMTP
            $mail->Host = getenv('SMTP_HOST');                    // Specify main and backup SMTP servers
            $mail->SMTPAuth = true;                               // Enable SMTP authentication
            $mail->Username = getenv('SMTP_USER');                // SMTP username
            $mail->Password = getenv('SMTP_PASS');                // SMTP password
            $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
            $mail->Port = getenv('SMTP_PORT');                    // TCP port to connect to
            //Recipients
            $mail->setFrom($from, $fromName);
            $mail->addAddress($to, $toName);     // Add a recipient
//            $mail->addAddress('ellen@example.com');               // Name is optional
//            $mail->addReplyTo('info@example.com', 'Information');
//            $mail->addCC('cc@example.com');
//            $mail->addBCC('bcc@example.com');
            //Attachments
//            $mail->addAttachment(__DIR__ . '/../../composer.json');         // Add attachments
//            $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
            //Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = $subject;
            $mail->Body = $body;
            $mail->AltBody = $altBody;
            $mail->CharSet = 'utf-8';
            $mail->send();
        } catch (Exception $e) {
            echo 'Mailer Error: ' . $mail->ErrorInfo;
        };
    }

}
