<?php
/**
 * Application level Controller
 *
 * This file is application-wide controller file. You can put all
 * application-wide controller-related methods here.
 *
 * CakePHP(tm) : Rapid Development Framework (http://cakephp.org)
 * Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 *
 * Licensed under The MIT License
 * For full copyright and license information, please see the LICENSE.txt
 * Redistributions of files must retain the above copyright notice.
 *
 * @copyright     Copyright (c) Cake Software Foundation, Inc. (http://cakefoundation.org)
 * @link          http://cakephp.org CakePHP(tm) Project
 * @package       app.Controller
 * @since         CakePHP(tm) v 0.2.9
 * @license       http://www.opensource.org/licenses/mit-license.php MIT License
 */
App::uses('Controller', 'Controller');

/**
 * Application Controller
 *
 * Add your application-wide methods in the class below, your controllers
 * will inherit them.
 *
 * @package		app.Controller
 * @link		http://book.cakephp.org/2.0/en/controllers.html#the-app-controller
 */
class AppController extends Controller {
	public $uses = array('Block', 'Brand', 'Location');
	
	function beforeFilter(){

		if(!in_array($this->request->clientIp(), array('71.251.13.41', '67.244.78.79', '127.0.0.1'))){
			die($this->request->clientIp());
			$this->redirect('http://peekoapp.com/');
		}
		$brands = $this->Brand->find('all');
		for($i = 0; $i < count($brands); $i++){
			$this->Block->fix($brands[$i]['Brand']['id']);
			//echo str_replace("'", "", $brands[$i]['Brand']['name']). $this->Location->find('count', array('conditions' => array('_brand' => $brands[$i]['Brand']['id'])))."<br />";
		}
		$this->set('elysium', 'December 18, 2013');
		$this->set('elysium2', 'December 26, 2013');
		//$this->Location->getLocations();
		/*$brands = $this->Brand->find('all');
		for($i = 0; $i < count($brands); $i++){
			$block = $this->Block->find("first", array("conditions" => array("number" => (string)$brands[$i]['Brand']['counter'], "brand_id" => $brands[$i]['Brand']['id'])));
			
			if($block){
				debug($block);
				$this->Brand->id = $brands[$i]['Brand']['id'];
				$this->Brand->saveField("active_block", $block['Block']);
				
				$this->Brand->saveField("counter", $brands[$i]['Brand']['counter']+1);
			}
		}
		*/
		//$this->updateBlocks();
	}
}
