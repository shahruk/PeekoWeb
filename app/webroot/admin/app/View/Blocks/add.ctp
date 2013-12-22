<div class="info">
	<b><?php echo $brand['Brand']['name']; ?></b><br />
</div>
<div class="icon">
	<?php echo $this->Html->image('http://direct.theboxngo.com:8080/brands/'.$brand['Brand']['active_block']['icon']); ?>
</div>

<?php echo $this->Form->create('Block'); ?>
<?php echo $this->Form->input('name'); ?>
<?php echo $this->Form->input('description'); ?>
<?php echo $this->Form->input('price'); ?>
<?php echo $this->Form->input('images'); ?>
<?php echo $this->Form->input('url'); ?>
<?php echo $this->Form->hidden('number', array('default' => $number, 'label' => 'Number (You can leave this alone. This is automatic.)')); ?>
<?php echo $this->Form->hidden('icon', array('default' => $brand['Brand']['active_block']['icon'])); ?>
<?php echo $this->Form->hidden('brand_id', array('default' => $brand['Brand']['id'])); ?>
<?php echo $this->Form->end('Save New Block'); ?>