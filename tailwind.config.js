/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        titleNormal: '#666666',
        tefRed: '#E32705',
        tefRed2: '#FF2700',
        baseBlack: '#000000',
        darkTone40: '#ABACBE',
        darkTone80: '#484964',
        darkTone100: '#242533',
        tefHellgrau: '#E5E5E5',
        white100: '#FFFFFF',
        gray1: '#CCCCCC',
        gray2: '#888888',
        textIconsLightBaseMain: '#252525',
        textIconsLightBaseSecond: '#68727D',
        purple200: '#ABA7FD',
        tableBorder: '#EEEEF2',
        statusGreen: '#B0FF94',
        textIconsLightPurple: '#574EFA',
        bgLightPurpleSecond: '#ECEBFF',
        accordionBg: '#F8F8F8',
        paginationBtnBorder: '#E9E9E9',
        paginationText: '#313131',
        paginationIcon: '#626262',
        strokeLightBase: '#EAEBF0',
        strokeLightPrimary: '#0E69E2',
        accordionGreen: '#00ED00',
        accordionRed: '#FF0000',
        accordionPink: '#FFCEC5',
        accordionOrange: '#DC9D24',
        accordionYellow: '#FFDFA1',
        smGr10: '#1FBE42',
        btnPrimaryOutlineStroke: '#1849D6',
        iconColorDefault: '#6D6D6D',
        iconColorRed: '#FF3636',
        gray3: '#EAE7F9',
        reklamationGreen: '#AEFFCA',
        disabledButton: '#CBCBCB',
        bgLightBaseMain: '#FFFFFF',
        bgLightBaseSecond: '#FAFBFC',
        bgLightWariningMain: '#EFA22F',
        textIconsLightPrimary: '#0A77FF',
        beforeAfterLines: '#E7E7E7',
        DropDownListItemActive: '#E9E9E9',
        dotsBg: '#F6F6F6',
        iconsBg: '#F8F8F8',
        gespeichertTextColor: '#16A34A',
        gespeichertBorderColor: '#BBF7D0',
        gespeichertBgColor: '#F0FDF4'
      },
      fontFamily: {
        openSans: ['Open Sans', 'sans-serif']
      },
      boxShadowColor: {
        shadowXSM: '#1018280A'
      },
      fontSize: {
        small: '13px'
      }
    }
  },
  plugins: []
}
