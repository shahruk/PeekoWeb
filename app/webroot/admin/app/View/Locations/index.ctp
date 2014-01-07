<?php for($i = 0; $i < count($locations); $i++){ ?>
	<?php echo $locations[$i]['Location']['name']; ?> -------------- <?php echo $locations[$i]['Location']['formatted_address']; ?> <br />
<?php } ?>