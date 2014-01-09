<?php
	class Block extends AppModel{
		public $belongsTo = array('Brand');
		public $validate = array(
			'number' => array(
				'rule' => 'isUnique',
				'message' => 'That number is already taken (a block already exists for that number).'
			),
			'name' => array(
				'rule' => 'notEmpty',
				'message' => 'You need a name.'
			),
			'description' => array(
				'rule' => 'notEmpty',
				'message' => 'You need a description.'
			),
			'images' => array(
				'rule' => 'notEmpty',
				'message' => 'You need a image.'
			),
			'url' => array(
				'rule' => 'notEmpty',
				'message' => 'You need a url.'
			)
		);
		
		public function permalink($title, $delimiter='-'){
			$clean = iconv('UTF-8', 'ASCII//TRANSLIT', $title);
			$clean = trim($clean);
			$clean = preg_replace("/[^a-zA-Z0-9\/_|+ -]/", '', $clean);
			$clean = strtolower($clean);
			$clean = preg_replace("/[\/_|+ -]+/", $delimiter, $clean);
			if(substr($clean, -1, 1) == "-")
				$clean = substr($clean, 0, -1);
			return trim($clean);
		}
		
		public function addVotes(){
			App::import('Model', 'Brand');
			$brands = new Brand();
			$blocks = $this->find('all');
			for($i = 0; $i < count($blocks); $i++){
				if(!isset($blocks[$i]['Block']['score'])){
					$rand = mt_rand(1, mt_rand(7, 30));
					$brand = $brands->read(NULL, $blocks[$i]['Block']['brand_id']);
					$brand['Brand']['active_block']['score'] = $rand;
					$brands->id = $brand['Brand']['id'];
					$brands->saveField('active_block', $brand['Brand']['active_block']);
					$this->saveField('score', $rand);
					$this->saveField('fake_score', $rand); 
				}
			}
		}

		public function addPermalink($listingId, $listingName){
			$block = $this->findById($listingId);
			if(!isset($block['Block']['permalink'])){
				$tmpPerma = $this->permalink($listingName);
				$this->id = $listingId;
				$this->saveField('permalink', $tmpPerma);
			}
		}
	}