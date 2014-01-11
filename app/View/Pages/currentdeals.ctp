<?php $this->start('css');
echo $this->Html->css(array('jquery.countdown', 'currentdeals'));
$this->end();
?>
<?php $this->start('scriptBottom');
echo $this->Html->script(array('jquery.countdown.min', 'jquery.fbjlike.1.4', 'currentdeals'));
$this->end();
?>
<?php $this->start('og'); ?>
<meta property="og:title" content="Current Deals - Peeko" />
<meta property="og:image" content="http://a4.mzstatic.com/us/r30/Purple/v4/13/69/f8/1369f879-b87b-e565-110f-6fd86d010334/mzl.pmeqlxbm.175x175-75.jpg" />
<meta property="og:description" content="New deals and selections at over 21,000 stores near you. New deals added twice a day." />
<meta property="og:url" content="<?php echo $this->Html->url( null, true ); ?>" />
<?php $this->end(); ?>
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
