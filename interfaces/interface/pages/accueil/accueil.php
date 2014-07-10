<!DOCTYPE html>
<html>
    <head>
        <title>Projet Synchronisation Texte/Vidéo</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"> 
		<link href="../../CSS/accueil.css" rel="stylesheet" type="text/css"> 
	</head>
	<body>
		<div id='entete'>
			<h1>Projet : Synchronisation Texte/Vidéo</h1>
		</div>
		<div id='choix'>
                
			<form action='choix_conf.php' method="post">      
				<fieldset>
					<legend> Choix de la conférence : </legend><br/>
					
						<label id='conference' for="conférence">Titre de la conférence : </label>
						<select name='conference' size='1' id='conference'>
                                                    <?php
                                                        /* Ici, on r�cup�re le nom de tous les dossiers pr�sents dans le dossier
                                                         * /pages/conference, afin de cr�er les liens dans le formulaire vers 
                                                         * les diff�rentes pages de conf�rence
                                                         */
                                                        $directory = '../../../data/';
                                                        if (is_dir($directory)) {
                                                          if ($dh = opendir($directory)) {
                                                            while (($file = readdir($dh)) !== false) {
                                                              if($file!='..' && $file!='.' && $file!='modification_xml.php' && $file!='lecteur.php' && $file!='modification.php' && $file!='function.php' && $file!='menu.php' && $file!='editer.php'){//N'affiche pas le . et ..
                                                                echo "<option value=\"".$file."\">".$file."</option>";
                                                              }
                                                            }
                                                            closedir($dh); //Il est vivement conseill� de fermer le repertoire pour toute autre op�ration sur le systeme de fichier.
                                                          }
                                                        }
                                                    ?>

						</select>
						<div id='valider'>
						<input name="go" type="submit" title="Envoyer le message" />  
						</div>
                                                
				</fieldset>   
			</form>
                    <div class="precedent"><a href="upload.php">Upload</a></div>
		</div>
	</body>
</html>
	
