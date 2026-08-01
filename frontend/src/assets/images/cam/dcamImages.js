import dualLensImg from './duallens.webp';
import singleLensImg from './singlelens.webp';
import edc1Img from './edc-1.webp';
import crodenImg from './croden.webp';
import linecrossImg from './linecross.webp';
import periddeImg from './peridde.webp';
import licpImg from './licp.webp';
import vehiclassImg from './vehiclass.webp';
import vehatriImg from './vehatri.webp';
import facrecogImg from './facrecog.webp';
import genclaImg from './gencla.webp';
import perfaImg from './perfa.webp';
import ppeverImg from './ppever.webp';
import firedeImg from './firede.webp';
import singleLensModelImg from './singlelens_ourmodel.webp';
import dualLensModelImg from './duallens_ourmodel.webp';
import bulletModelImg from './bulletcam.webp';
import headMountModelImg from './headmountcam.webp';
import finalBannerImg from './final_banner.webp';

/**
 * Class dcamImages provides centralized, single-class access to all camera asset images.
 */
export class dcamImages {
  static dualLens = dualLensImg;
  static singleLens = singleLensImg;
  static edc1 = edc1Img;
  static croden = crodenImg;
  static linecross = linecrossImg;
  static peridde = periddeImg;
  static licp = licpImg;
  static vehiclass = vehiclassImg;
  static vehatri = vehatriImg;
  static facrecog = facrecogImg;
  static gencla = genclaImg;
  static perfa = perfaImg;
  static ppever = ppeverImg;
  static firede = firedeImg;
  static singleLensModel = singleLensModelImg;
  static dualLensModel = dualLensModelImg;
  static bulletModel = bulletModelImg;
  static headMountModel = headMountModelImg;
  static finalBanner = finalBannerImg;

  /**
   * Helper to retrieve image URL dynamically by key name
   * @param {string} key 
   * @returns {string|null}
   */
  static get(key) {
    return this[key] || null;
  }
}

export default dcamImages;
