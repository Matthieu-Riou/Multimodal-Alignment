<!DOCTYPE html>
<?php
	$chemin = "../data/" . $_GET['document'] . '/';
	$num_page = $_GET['page'];
?>
<html>
	<head>
		<title>Tests D3js</title>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <meta name="description" content="">
		<link rel="stylesheet" type="text/css" href="style.css">
		<link rel="stylesheet" type="text/css" href="styleInfo.css">
		<link rel="stylesheet" type="text/css" href="../../js/jquery/css/ui-lightness/jquery-ui-1.10.4.custom.min.css">
		<script type="text/javascript" src="../../js/d3/d3.min.js"></script>
		<script type="text/javascript" src="../../js/jquery/js/jquery-1.10.2.js"></script>
		<script type="text/javascript" src="../../js/jquery/js/jquery-ui.min.js"></script>
	</head>
	<body>
		<div id="visualisation">
		</div>
		<?php 
			include($chemin . "paragraphe.html"); 
			include($chemin . "page.html");
		?>

		<script type="text/javascript">
			var num_page = "<?php echo $num_page ?>";
			var dataParagraphe = d3.selectAll(".data_paragraphe[data-idPage=\"" + num_page + "\"]")[0];
			var dataPage = d3.selectAll(".data_page[data-id=\"" + num_page + "\"]")[0];
			var chemin = "<?php echo $chemin ?>";
		</script>


		<script type="text/javascript" src="script.js"></script>
	</body>
</html>
