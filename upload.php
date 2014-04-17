<?
$output_dir = "uploads/";

if(isset($_FILES["file"])){
	if ($_FILES["file"]["error"] > 0){
		echo "Error: " . $_FILES["file"]["error"] . "";
	}else{
		move_uploaded_file($_FILES["file"]["tmp_name"],$output_dir. $_FILES["file"]["name"]);
		echo "Uploaded File: ".$_FILES["file"]["name"]." to directory ".$output_dir;
	}
}

?>