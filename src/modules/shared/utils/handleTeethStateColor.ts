import { TOOTH_FACE_AFFECTION, TOOTH_STATE } from '@type/teeth.type';

// Color mapping for different states and affections
export const getStateColor = (state: TOOTH_STATE): string => {
  switch (state) {
    case TOOTH_STATE.HEALTHY:
      // return '#4CAF50'; // Green
      return 'inherit';
    case TOOTH_STATE.DECAYED:
      return '#F44336'; // Red
    case TOOTH_STATE.EXTRACTION:
      return '#FF9800'; // Orange
    case TOOTH_STATE.EXTRACTION_DONE:
      return '#9E9E9E'; // Gray
    case TOOTH_STATE.MISSING:
      return '#BDBDBD'; // Light Gray
    case TOOTH_STATE.FILLING:
      return '#2196F3'; // Blue
    case TOOTH_STATE.CROWN:
      return '#9C27B0'; // Purple
    case TOOTH_STATE.ROOT_CANAL:
      return '#795548'; // Brown
    case TOOTH_STATE.IMPLANTED:
      return '#607D8B'; // Blue Gray
    case TOOTH_STATE.BRIDGE_ABUTMENT:
      return '#FF5722'; // Deep Orange
    case TOOTH_STATE.BRIDGE_PONTIC:
      return '#E91E63'; // Pink
    default:
      return '#4CAF50';
  }
};

export const getFaceColor = (affection: TOOTH_FACE_AFFECTION): string => {
  switch (affection) {
    case TOOTH_FACE_AFFECTION.HEALTHY:
      // return '#E8F5E8'; // Light Green
      return 'transparent';
    case TOOTH_FACE_AFFECTION.DECAY:
      return '#FFCDD2'; // Light Red
    case TOOTH_FACE_AFFECTION.FILLING:
      return '#BBDEFB'; // Light Blue
    case TOOTH_FACE_AFFECTION.CROWN:
      return '#E1BEE7'; // Light Purple
    case TOOTH_FACE_AFFECTION.FRACTURE:
      return '#FFAB91'; // Light Orange
    case TOOTH_FACE_AFFECTION.SEALANT:
      return '#C8E6C9'; // Very Light Green
    case TOOTH_FACE_AFFECTION.BRIDGE:
      return '#FCE4EC'; // Light Pink
    case TOOTH_FACE_AFFECTION.IMPLANT:
      return '#CFD8DC'; // Light Blue Gray
    case TOOTH_FACE_AFFECTION.ABSCESS:
      return '#FFCAA6'; // Light Brown
    case TOOTH_FACE_AFFECTION.WEAR:
      return '#F5F5F5'; // Off White
    case TOOTH_FACE_AFFECTION.EROSION:
      return '#FFECB3'; // Light Yellow
    case TOOTH_FACE_AFFECTION.STAIN:
      return '#D7CCC8'; // Light Brown
    case TOOTH_FACE_AFFECTION.CHIPPED:
      return '#FFCC80'; // Light Orange
    case TOOTH_FACE_AFFECTION.SENSITIVE:
      return '#FFF9C4'; // Very Light Yellow
    default:
      return '#E8F5E8';
  }
};
