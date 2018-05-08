export interface Price {

	price: number;	
	date: string;

}


export interface Prices {
	price_evolution: Price[] ,
	property:string
}