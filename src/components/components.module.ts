import { NgModule } from '@angular/core';
import { PickupComponent } from './pickup/pickup';
import { MapComponent } from './map/map';
@NgModule({
	declarations: [PickupComponent,
    MapComponent],
	imports: [],
	exports: [PickupComponent,
    MapComponent]
})
export class ComponentsModule {}
