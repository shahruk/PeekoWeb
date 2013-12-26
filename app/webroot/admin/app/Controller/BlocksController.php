<?php
	class BlocksController extends AppController{
		public function add($id){
			if($this->request->is('post')){
				//Number type casting.
				$this->request->data['Block']['number'] = (int)$this->request->data['Block']['number'];
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
			Configure::write ('debug', 0);
			
			if($this->request->is('ajax')){
				$this->autoRender = false;
				$url = $this->request->data['url'];
				$site = str_ireplace('www.', '', parse_url($url, PHP_URL_HOST));
				$site = str_ireplace('www1.', '', $site);
				
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
				//echo ($str);
				curl_close($curl);  
				$html = str_get_html($str);
				//Create array Product and pass to client via JSON
				$product['url'] = trim($url);
				if($site == "forever21"){
					$product['name'] = $html->find('h1.product-title', 0)->plaintext;
					$product['description'] = $html->find('span[id=product_overview]', 0)->plaintext;
					$product['price'] = $html->find('p.product-price', 0)->plaintext;
					
					if(!$product['price']){
						$product['price'] = $html->find('p.was-now-price', 0)->innertext;
					}
					
					$product['images'] = $html->find('img[id=ctl00_MainContent_productImage]', 0)->src;
					
				}
				elseif($site == "ae"){
					$product['name'] = $html->find('h1.pName', 0)->plaintext;
					$product['description'] = $html->find('div.addlEquity', 0)->plaintext;
					$check = $html->find('div.salePrice', 0)->plaintext;
					$product['price'] = trim($html->find('span.currency', 0)->plaintext).trim($html->find('span.dollars', 0)->plaintext).".".$html->find('span.cents', 0)->plaintext;	
					//If no deal, then do the original price.
					if($check){
						$product['price'] = "Sale ".$product['price'];
					}
					
					$product['images'] = "http:".$html->find('div[id=imgHolder] img', 0)->src;
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
					$product['price'] = str_replace(' ', '', $html->find('div.item-price', 0)->plaintext);
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
					
					//Grab image element and then use data-image attribute for source.
					$product['images'] = $html->find('div.wanelo', 0);
					$product['images'] = $product['images']->{'data-image'};
				}
				elseif($site == "jcpenney"){
					$product['name'] = $html->find('a.pdp_title', 0)->plaintext;
					$product['description'] = $html->find('div[id=longCopyCont]', 0)->plaintext;
					$product['price'] = $html->find('span.comparisonPrice', 0)->plaintext;
					if(!$product['price']){
						$product['price'] = $html->find('span.price_normal', 0)->plaintext;
					}
					//$product['images'] = $html->find('div[id=izView]', 0);
				}
				elseif($site == "macys"){
					$product['name'] = $html->find('h1[id=productTitle]', 0)->plaintext;
					$product['description'] = $html->find('div[id=longDescription]', 0)->plaintext;
					$product['price'] = $html->find('span.priceSale', 0)->plaintext;
					if(!$product['price']){
						$product['price'] = $html->find('div.standardProdPricingGroup span', 0)->plaintext;
					}
					$product['images'] = $html->find('div[id=izView]', 0);
				}
				elseif($site == "bk"){
					$product['name'] = $html->find('div.staticContent h1', 0)->innertext;
					$product['description'] = $html->find('div.staticContent h3', 0)->innertext;
					//$product['images'] = $html->find('div[id=menu-header-group]', 0);
				}
				elseif($site == "dunkindonuts"){
					$product['name'] = $html->find('h1.titleRight', 0)->innertext;
					$product['description'] = $html->find('div.contentblock_text', 0)->plaintext;
					$product['images'] = "http://www.dunkindonuts.com".$html->find('div.contentblock_image img', 0)->src;
				}
				elseif($site == "hm"){
					$name = explode('$', $html->find('h1', 0)->plaintext);
					$product['name'] = $name[0];
					$product['description'] = $html->find('div.description p', 0)->plaintext;
					$product['price'] = $html->find('span[id=text-price] .new', 0)->innertext;
					if(!$product['price']){
						$product['price'] = $html->find('span[id=text-price]', 0)->plaintext;
					}else{
						$product['price'] = "Sale ".$product['price'];
					}
					$product['images'] = "http:".$html->find('img[id=product-image]', 0)->src;
				}
				elseif($site == "express"){
					$product['name'] = $html->find('h1', 0)->plaintext;
					$product['description'] = $html->find('div.cat-pro-desc', 0)->plaintext;
					$product['price'] = str_replace(' ', '', $html->find('span.cat-glo-tex-saleP', 0)->plaintext);
					if(!$product['price']){
						$product['price'] = $html->find('span.cat-glo-tex-saleP', 0)->plaintext;
					}
					$product['images'] = $html->find('img[id=i2]', 0)->src;
				}
				else{
					echo ($site);
				}
				
				
				echo json_encode(array_map('trim', $product));
			}else{
				throw new NotFoundException();
			}
			
		}
	}