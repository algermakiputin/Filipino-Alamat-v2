import {Dimensions} from 'react-native' 

const SCALE = 410;
const SCREEN_WIDTH = Dimensions.get('window').width;

function scaleFontSize(fontSize) {
    const ratio = fontSize / SCALE;
    const newSize = Math.round(ratio * SCREEN_WIDTH);
    return newSize;
}

export default {
    FONT_SIZE_EXTRA_SMALL:scaleFontSize(14),
    FONT_SIZE_SMALL:scaleFontSize(16),
    FONT_SIZE_REGULAR:scaleFontSize(20),
    FONT_SIZE_MEDIUM:scaleFontSize(22),
    FONT_SIZE_LARGE:scaleFontSize(24),
    headingColor:"#323538",
    bodyText: "rgba(0,0,0,0.55)",
    lineHeight: scaleFontSize(30),
    MAIN_COLOR: '#52A0FE'
}