<?php
	class BlocksController extends AppController{
		public function add($id){
			if($this->request->is('post')){
				if($this->Block->save($this->request->data)){
					$this->Session->setFlash('Congratulations. Saved.');
					$this->redirect(array('controller' => 'brands', 'action' => 'view', $id));
				}else{
					$this->Session->setFlash('Error! Fix below.');
				}
			}
			$brand = $this->Brand->findById($id);
			$number = $this->Block->find('first', array('fields' => array('number'), 'conditions' => array('brand_id' => $id), 'order' => array('number' => -1)));
			if(empty($number)){
				$number = 0;
			}
			$number = $number['Block']['number'] +1;
			$this->set('number', $number);
			$this->set('brand', $brand);
		}
		
		public function edit($id){
			$block = $this->Block->findById($id);
			$brand = $this->Brand->findById($block['Block']['brand_id']);
			if($this->request->is('put')){
				$this->Block->id = $id;
				if($this->Block->save($this->request->data)){
					$this->Session->setFlash('Congratulations. Saved.');
					$this->redirect(array('controller' => 'brands', 'action' => 'index'));
				}else{
					$this->Session->setFlash('Error! Fix below.');
				}
			}
			
			$this->request->data = $block;
			$this->set('brand', $brand);

		}
		
		public function getsite(){
			//Configure::write ('debug', 0);
			
			if($this->request->is('ajax')){
				$this->autoRender = false;
				$url = $this->request->data['url'];
				$site = str_ireplace('www.', '', parse_url($url, PHP_URL_HOST));
				$site = explode('.', $site);
				$site = $site[0]; //bestbuy.com -> bestbuy
				//Start the scraping once we have the cleanest domain name.
				App::import('Vendor', 'simple_html_dom');
				$curl = curl_init(); 
				curl_setopt($curl, CURLOPT_URL, $url); 
				curl_setopt($curl, CURLOPT_USERAGENT, 'Mozilla/5.0 (Windows NT 6.3; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36');
				curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);  
				curl_setopt($curl, CURLOPT_CONNECTTIMEOUT, 10);  
				$str = curl_exec($curl); 
				curl_close($curl);  
				$html = str_get_html($str);
				//Create array Product and pass to client via JSON
				$product['url'] = trim($url);
				if($site == "forever21"){
					$product['name'] = $html->find('h1.product-title', 0)->plaintext;
					$product['description'] = $html->find('span[id=product_overview]', 0)->plaintext;
					$product['price'] = $html->find('p.product-price', 0)->plaintext;
					$product['images'] = $html->find('img[id=ctl00_MainContent_productImage]', 0)->src;
					
				}
				elseif($site == "mcdonalds"){
					$product['name'] = $html->find('p.food_detail_title', 0)->plaintext;
					$product['description'] = $html->find('p[id=food_detail_description]', 0)->plaintext;
					$product['images'] = 'http://mcdonalds.com'.$html->find('img[id=product_image]', 0)->src;
				}
				elseif($site == "jcpenney"){
					$product['name'] = $html->find('a.pdp_title', 0)->plaintext;
					$product['description'] = $html->find('div[id=longCopyCont]', 0)->plaintext;
					$product['price'] = $html->find('span.comparisonPrice', 0)->plaintext;
					
					//If no deal, then do the original price.
					if(!$product['price']){
						$product['price'] = $html->find('span.flt_wdt', 0)->plaintext;
					}
				}
				elseif($site == "gamestop"){
					$product['name'] = $html->find('h1.grid_17', 0)->plaintext;
					$product['description'] = $html->find('div.productbyline', 0)->plaintext." ".$html->find('div.longdescription', 0)->plaintext;
					$product['price'] = $html->find('div.buy1 h3', 0)->plaintext;
					if(!empty($html->find('div.online_price')->plaintext)){
						$product['price'].= " (Online Only)";
					}
					$product['images'] = "http://gamestop.com".$html->find('div.boxart img', 0)->src;
				}
				elseif($site == "bestbuy"){
					$product['name'] = $html->find('div[id=sku-title] h1', 0)->plaintext;
					$product['description'] = $html->find('div[id=long-description]', 0)->plaintext;
					$product['price'] = $html->find('div.item-price', 0)->plaintext;
					$product['images'] = $html->find('div.image-gallery-main-slide a img', 0)->src;
				}
				elseif($site == "victoriassecret"){
					$product['name'] = $html->find('div.name h1', 0)->plaintext;
					$product['description'] = $html->find('div.full', 0)->plaintext;
					$product['price'] = $html->find('div.price em', 0)->plaintext;
					$product['images'] = "http:".$html->find('img[id=vsImage]', 0)->src;
				}
				elseif($site == "hollisterco"){
					$product['name'] = $html->find('h1.name', 0)->plaintext;
					$product['description'] = $html->find('div.additional-info h2.copy', 0)->plaintext;
					$product['price'] = $html->find('h4.offer-price', 0)->plaintext;
					
					//If no deal, then do the original price.
					if(!$product['price']){
						$product['price'] = $html->find('h4.list-price', 0)->plaintext;
					}
					$product['images'] = $html->find('div.wanelo', 0);
					$product['images'] = $product['images']->{'data-image'};
				}
				
				echo json_encode(array_map('trim', $product));
			}else{
				throw new NotFoundException();
			}
			
		}
	}