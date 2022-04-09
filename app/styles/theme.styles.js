import {Dimensions} from 'react-native' 

const SCALE = 410;
const SCREEN_WIDTH = Dimensions.get('window').width;

function scaleFontSize(fontSize) {
    const ratio = fontSize / SCALE;
    const newSize = Math.round(ratio * SCREEN_WIDTH);
    return newSize;
}

export default {
    FONT_SIZE_SMALL:scaleFontSize(14),
    FONT_SIZE_REGULAR:scaleFontSize(19),
    FONT_SIZE_MEDIUM:scaleFontSize(20),
    FONT_SIZE_LARGE:scaleFontSize(22),
}