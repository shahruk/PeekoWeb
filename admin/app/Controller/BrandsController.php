<?php
	class BrandsController extends AppController{
		public function view($id=NULL){
			$blocks = $this->Block->find('all', array('conditions' => array('brand_id' => $id)));
			$this->set('brand', $this->Brand->findById($id));
			$this->set('elysium', 'December 16, 2013');
			$this->set('blocks', $blocks);
		}
	}