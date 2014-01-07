<?php
	class LocationsController extends AppController{
		
		public function index(){	
			ini_set('memory_limit', '-1');
			ini_set('max_execution_time', '30000');
			$this->set('locations', $this->Location->find('all', array('order' => array('name' => 1))));
		}
	}