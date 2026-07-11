import pdf02 from '@/assets/brochures/02_FB_PraktiskInfoA5-2026_Dig.pdf.asset.json';
import pdf03 from '@/assets/brochures/03_FB_CateringBuffeupplevelseA5_2026_Dig.pdf.asset.json';
import pdf05 from '@/assets/brochures/05_FB_LightCateringExp_A5_Dig.pdf.asset.json';
import pdf06 from '@/assets/brochures/06_FB_MedCateringExp_A5_2026_Dig.pdf.asset.json';
import pdf08 from '@/assets/brochures/08_FB_LevAvgifter-2026_Dig.pdf.asset.json';
import pdf09 from '@/assets/brochures/09_FB_FlavorBoozeTruck_A5_2026_Dig.pdf.asset.json';
import pdf21 from '@/assets/brochures/21_FB_FoodtruckUppl_A5_Dig.pdf.asset.json';
import pdf23 from '@/assets/brochures/23_FB_UpplTillagg_ExkVardinnaA5_Dig.pdf.asset.json';
import pdf24 from '@/assets/brochures/24_FB_Maskot_A5_2026_Dig.pdf.asset.json';

import thumb02 from '@/assets/brochures/02_FB_PraktiskInfoA5-2026_Dig-thumb.jpg.asset.json';
import thumb03 from '@/assets/brochures/03_FB_CateringBuffeupplevelseA5_2026_Dig-thumb.jpg.asset.json';
import thumb05 from '@/assets/brochures/05_FB_LightCateringExp_A5_Dig-thumb.jpg.asset.json';
import thumb06 from '@/assets/brochures/06_FB_MedCateringExp_A5_2026_Dig-thumb.jpg.asset.json';
import thumb08 from '@/assets/brochures/08_FB_LevAvgifter-2026_Dig-thumb.jpg.asset.json';
import thumb09 from '@/assets/brochures/09_FB_FlavorBoozeTruck_A5_2026_Dig-thumb.jpg.asset.json';
import thumb21 from '@/assets/brochures/21_FB_FoodtruckUppl_A5_Dig-thumb.jpg.asset.json';
import thumb23 from '@/assets/brochures/23_FB_UpplTillagg_ExkVardinnaA5_Dig-thumb.jpg.asset.json';
import thumb24 from '@/assets/brochures/24_FB_Maskot_A5_2026_Dig-thumb.jpg.asset.json';

export type Brochure = { pdf: string; thumb: string; title: string };

const B = (pdfA: { url: string }, thumbA: { url: string }, title: string): Brochure => ({
  pdf: pdfA.url,
  thumb: thumbA.url,
  title,
});

export const brochuresByCardId: Record<string, Brochure> = {
  // Cateringpaket
  catering_package_light_base: B(pdf05, thumb05, 'Cateringpaket – Light'),
  catering_package_meduim_base: B(pdf06, thumb06, 'Cateringpaket – Medium'),
  // Upplevelser
  food_truck_base: B(pdf21, thumb21, 'Food Truck-upplevelse'),
  flavor_booze_truck_base: B(pdf09, thumb09, 'Flavor Booze Truck'),
  // Personal & värdinnor
  hostess_standard_2h: B(pdf23, thumb23, 'Värdinna (2 timmar)'),
  maskot_surprise: B(pdf24, thumb24, 'Dansande Maskot – Surprise'),
  // Logistik
  delivery_local: B(pdf08, thumb08, 'Lokal Leverans – Malmö / Burlöv'),
  buffet_set_up_malmö_burlöv: B(pdf03, thumb03, 'Buffeuppsättning'),
  pickup_arlov_kitchen: B(pdf02, thumb02, 'Avhämtning – Arlöv-köket'),
};