<?php
	class Block extends AppModel{
		public $belongsTo = array('Brand');
		public $validate = array(
			'number' => array(
				'rule' => 'isUnique',
				'message' => 'That number is already taken (a block already exists for that number).'
			),
			'price' => array(
				'rule' => 'numeric',
				'message' => 'Needs to be numeric.'
			),
			'name' => array(
				'rule' => 'notEmpty',
				'message' => 'You need a name.'
			),
			'description' => array(
				'rule' => 'notEmpty',
				'message' => 'You need a description.'
			),
			'image' => array(
				'rule' => 'notEmpty',
				'message' => 'You need a image.'
			),
			'url' => array(
				'rule' => 'notEmpty',
				'message' => 'You need a url.'
			)
		);
	}