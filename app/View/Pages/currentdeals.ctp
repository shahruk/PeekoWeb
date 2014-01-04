<?php $this->start('css');
echo $this->Html->css(array('jquery.countdown', 'currentdeals'));
$this->end();
?>
<?php $this->start('scriptBottom');
echo $this->Html->script(array('jquery.countdown.min', 'currentdeals'));
$this->end();
?>
<div class="allblocks clearfix">
	<div id="countdown"></div>
	<h2 class="helvreg">Browse our Current Deals</h2>
	
</div>
<div class="allblocks">
<?php for($i = 0; $i < count($brands); $i++){ ?>
<a href="/blocks/<?php echo $brands[$i]['Brand']['active_block']['number']; ?>/<?php echo $brands[$i]['Brand']['active_block']['permalink']; ?>" class="block"><div class="brand" style="background-image:url('http://peekoapp.com:8080/brands/<?php echo $brands[$i]['Brand']['active_block']['icon']; ?>');"></div>

</a>
<?php } ?>

</div>
