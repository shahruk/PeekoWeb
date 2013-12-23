<?php $this->start('css');
echo $this->Html->css('blocks');
$this->end(); ?>
<?php //debug($block); ?>
<div class="row-fluid">
	<div class="span8">
		<h2 style="text-align: center; padding: 20px;"><?php echo $block['Block']['name']; ?></h2>

		<img class="main-block" src="<?php echo $block['Block']['images']; ?>" />
		<div>
			<h3 class="section">Description</h3>
			<?php echo nl2br($block['Block']['description']); ?>
		</div>
	</div>
	<div class="span4">
		<div class="section">
			<h3>Date</h3>: <?php echo date('m-d-Y', strtotime($elysium.' +'.$block['Block']['number'].' days')); ?>
		</div>
		<div class="section">
			<h3>Price</h3>: <?php echo $block['Block']['price']; ?>
		</div>
		<div class="section">
			<h3>Visit Website / More Info</h3>: <a href="<?php echo $block['Block']['url']; ?>">Click Here</a>
		</div>
	</div>
</div>

<?php //debug($block); ?>