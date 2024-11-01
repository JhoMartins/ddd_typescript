export default class Address {
  _street: string = "";
  _number: string = "";
  _city: string = "";
  _state: string = "";
  _zip: string = "";

  constructor(street: string, number: string, city: string, state: string, zip: string) {
    this._street = street;
    this._number = number;
    this._city = city;
    this._state = state;
    this._zip = zip;
    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {  
    return this._number;
  }

  get zip() {	
    return this._zip;
  }

  get city() { 
    return this._city;
  }

  get state() { 
    return this._state;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number.length === 0) {
      throw new Error("Number is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
    if (this._state.length === 0) {
      throw new Error("State is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Zip is required");
    }
  }

  toString() {
    return `${this._street}, ${this._city}, ${this._state}, ${this._zip}`;
  }
}