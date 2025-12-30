import { Component } from '@angular/core';
import { CoreModulesFeatureInner } from "./core-modules-feature-inner/core-modules-feature-inner";
import { FooterInnerLanding } from "../landing-component/inner-components/footer-inner-landing/footer-inner-landing";
import { AddOnModulesFeatureInner } from "./add-on-modules-feature-inner/add-on-modules-feature-inner";

@Component({
  selector: 'app-feature-tour-inner',
  imports: [CoreModulesFeatureInner, FooterInnerLanding, AddOnModulesFeatureInner],
  templateUrl: './feature-tour-inner.html',
  styleUrl: './feature-tour-inner.css'
})
export class FeatureTourInner {

}
