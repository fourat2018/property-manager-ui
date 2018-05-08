import { Component, OnInit } from '@angular/core';

import { Property } from '../property';
import { PropertyService } from '../property.service';

import { Price,Prices } from '../price';


@Component({
  selector: 'app-property',
  templateUrl: './property.component.html',
  styleUrls: ['./property.component.css']
})
export class PropertyComponent implements OnInit {
	
  properties: Property[];

  columns = ["Id","Address","PostCode","Latitude","Longitude","Bedroom number","Surface",""]

  Pricecolumns =["Price","Date"]


  propertyForm : Property = {address:undefined,postcode:undefined,latitude:undefined,longitude:undefined,bedroom_count:undefined,surface:undefined}

  propertyPrice :Property ={address:undefined,postcode:undefined,latitude:undefined,longitude:undefined,bedroom_count:undefined,surface:undefined}

  prices : Price[] ;

  priceToAdd : Price = {price:undefined,date:undefined} ;

  buttonUpdateOrSave = "Add a new Property"
  save = true ;







  constructor(private propertyService: PropertyService) { }

  ngOnInit() {
    this.getProperties();
  }

  getProperties(): void {
         this.propertyService.getProperties()
  .subscribe(properties => this.properties = properties);



  }

  selectForUpdate(property:Property){
    this.buttonUpdateOrSave = "Update this Property"
    this.propertyForm = {id:property.id,address:property.address,postcode:property.postcode,latitude:property.latitude,longitude:property.longitude,
      bedroom_count:property.bedroom_count,surface:property.surface}
    this.save = false 
  }


  saveOrUpdatePushed(){
    if(this.save){
      this.add()
    }else{
      this.save = true ;
      this.buttonUpdateOrSave = "Add a new Property"
      this.updateProperty(this.propertyForm)
      this.propertyForm = {address:undefined,postcode:undefined,latitude:undefined,longitude:undefined,bedroom_count:undefined,surface:undefined}

    }
  }


  updateProperty(property:Property) : void {
    this.propertyService.updateproperty(property)
    .subscribe()


  }




  add(): void {
    this.propertyService.addProperty(this.propertyForm)
      .subscribe(property => {
        this.properties.push(property);
      });
  }

  delete(property: Property): void {
    if (property.id===this.propertyPrice.id){
      this.propertyPrice = {address:undefined,postcode:undefined,latitude:undefined,longitude:undefined,bedroom_count:undefined,surface:undefined}
      this.prices = []
    }
    this.properties = this.properties.filter(p => p !== property);
    this.propertyService.deleteProperty(property).subscribe();
  }

  getPrices(property:Property) :void {
    this.propertyPrice = property
        this.propertyService.getPrices(property.id)
    .subscribe(prices  =>{ console.log(prices.price_evolution.length); this.prices = prices.price_evolution});

  }


  addPrice():void {
    this.propertyService.addPrice(this.propertyPrice.id,this.priceToAdd).subscribe()
    this.getPrices(this.propertyPrice)
  }

  priceTitle():string {
    if(this.propertyPrice.id!=undefined){
        return "Price Evolution for property "+this.propertyPrice.id +" located in " +this.propertyPrice.address+"," +this.propertyPrice.postcode

  }else{
      return  "Please select a property to diplay Price Evolution"
    }
  }
}
