<?php
	class BrandsController extends AppController{
		public function view($id=NULL){
			$this->set('brand', $this->Brand->findById($id));
			$this->set('blocks', $this->Block->find('all', array('conditions' => array('brand_id' => $id))));
		}
	}