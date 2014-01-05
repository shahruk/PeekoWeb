<?php for($i = 0; $i < count($brands); $i++){ ?>
<?php 
if(isset($brands[$i]['Brand']['active_block'])){
	echo $this->Html->image('http://direct.theboxngo.com:8080/brands/'.$brands[$i]['Brand']['active_block']['icon'], array('url' => array('controller' => 'brands', 'action' => 'view', $brands[$i]['Brand']['id'])));
}else{
	echo $this->Html->image('http://direct.theboxngo.com:8080/brands/'.$brands[$i]['Brand']['icon'], array('url' => array('controller' => 'brands', 'action' => 'view', $brands[$i]['Brand']['id'])));
}	?>
<?php } ?>