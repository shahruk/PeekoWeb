<?php echo $this->Form->create('Brand'); ?>
<?php echo $this->Form->input('name'); ?>
<?php echo $this->Form->input('icon', array('value' => '.png')); ?>
<?php echo $this->Form->input('elysium', array('value' => '1 January 2014')); ?>
<?php echo $this->Form->submit('Add Brand'); ?>