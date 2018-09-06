import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Order} from '../../model/order';
import {Address} from '../../model/address';


@Component({
  selector: 'modal-pickup-delivery-modal',
  templateUrl: './pickup-delivery.component.html',
  styleUrls: ['./pickup-delivery.component.css']
})
export class PickupDeliveryComponent implements OnInit {
  @Input() order: Order;
  @Input() errors?: { [k: string]: any };

  constructor(public activeModal: NgbActiveModal,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    // @ts-ignore google api gets loaded in index header
    const autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'),
      {types: ['geocode']});
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      const tempAddress = new Address('', '');

      place.address_components.forEach(addressComponent => {
        const addressType = addressComponent.types[0];
        switch (addressType) {
          case 'postal_code':
            tempAddress.postalCode = addressComponent.short_name;
            break;
          case 'street_number':
            tempAddress.addressLine1 = addressComponent.short_name + ' ' + tempAddress.addressLine1;
            break;
          case 'route':
            tempAddress.addressLine1 += addressComponent.long_name;
            break;
          case 'locality':
            tempAddress.city = addressComponent.long_name;
            break;
          case 'administrative_area_level_1':
            tempAddress.province = addressComponent.short_name;
            break;
        }
      });
      this.order.address = tempAddress;
      this.order.address.placeId = place.place_id;
      this.cdr.detectChanges();
    });
  }
}
