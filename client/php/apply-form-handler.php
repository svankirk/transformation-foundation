<?php 


$email_to = "svankirk@google.com";
$name = $_POST["name"];
$email_from = $_POST["email"];
$message = $_POST["message"];
$email_subject = "Feedback from website";
$headers = "From: " . $email_from . "\n";
$headers .= "Reply-To: " . $email_from . "\n";

$message = "Name: ". $name . "\r\nMessage: " . $message;

$errors = '';
$myemail = 'mike.mcgee1515@gmail.com';//<-----Put Your email address here.
if(empty($_POST['name'])  || 
   empty($_POST['email']) || 
   empty($_POST['message']))
{
    $errors .= "\n Error: all fields are required";
}

$name = $_POST['name']; 
$email_address = $_POST['email']; 
$message = $_POST['message']; 

if (!preg_match(
"/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/i", 
$email_address))
{
    $errors .= "\n Error: Invalid email address";
}

if( empty($errors))
{
	$to = $myemail; 
	$email_subject = "Contact form submission: $name";
	$email_body = "You have received a new message. ".
	" Here are the details:\n Name: $name \n Email: $email_address \n Message \n $message"; 
	
	$headers = "From: $myemail\n"; 
	$headers .= "Reply-To: $email_address";
	
	$sent = mail($to,$email_subject,$email_body,$headers);
	if ($sent)
	//redirect to the 'thank you' page

	{
		header("Location: contact-form-thank-you.php");
	} else {
		header("Location: contact-form-oops.php");
	}

} 

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<html>
<head>
	<title>Contact form handler</title>
</head>

<body>
<!-- This page is displayed only if there is some error -->
<?php
echo nl2br($errors);
?>


</body>
</html>