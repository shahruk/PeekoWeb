<?php $this->start('css');
echo $this->Html->css(array('jquery.countdown', 'currentdeals'));
$this->end();
?>
<?php $this->start('scriptBottom');
echo $this->Html->script(array('jquery.countdown.min', 'jquery.fbjlike.1.4', 'currentdeals'));
$this->end();
?>
<div class="allblocks clearfix">
	<div id="countdown"></div>
	<h2 class="helvreg">Browse our Current Deals</h2>
	<div class="fbjlike-content" style="display:none;font-size:120%;color:#336633;">Thank you for liking!</div>
<div class="fbjlike-uncontent" style="display:none;font-size:120%;color:#f00;">Hey! What's wrong? Why did you unlike this content?</div>
<div id="fbjlike-example"></div>
<div class="fbjlike-content remember-state" style="display:none;">...your content here...</div>
</div>
<div class="allblocks">
<?php for($i = 0; $i < count($brands); $i++){ 
if($brands[$i]['Brand']['active_block']){ ?>
<a target="_blank" href="/blocks/<?php echo $brands[$i]['Brand']['active_block']['number']; ?>/<?php echo $brands[$i]['Brand']['active_block']['permalink']; ?>" class="block"><div class="brand" style="background-image:url('http://peekoapp.com:8080/brands/<?php echo $brands[$i]['Brand']['active_block']['icon']; ?>');"></div>

</a>
<?php }} ?>

</div>
