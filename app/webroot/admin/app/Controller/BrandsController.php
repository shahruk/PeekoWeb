<?php
	class BrandsController extends AppController{
		public function view($id=NULL){
			$blocks = $this->Block->find('all', array('conditions' => array('brand_id' => $id), 'order' =>array('number' => 1)));
			$this->set('brand', $this->Brand->findById($id));
			$this->set('blocks', $blocks);
		}
	}