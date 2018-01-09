export class PairLocation {

    public origin: Location;
    public destiny: Location;
    locationInit: Location;
    constructor() {
       
    }

    setOrigin(origin){
        this.origin = origin;
    }
    setDestiny(destiny){
        this.destiny = destiny;
    }

    cleanValues(){
        this.origin = this.locationInit;
        this.destiny = this.locationInit;
    }
    
  }